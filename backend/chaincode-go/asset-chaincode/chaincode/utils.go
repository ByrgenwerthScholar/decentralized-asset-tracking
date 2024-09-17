package chaincode

import (
	"sort"
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"bytes"
	"encoding/hex"
	"strconv"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
	"github.com/hyperledger/fabric-chaincode-go/shim"
)

// verifyProposalProperties verifies the properties of a proposal.
func (c *AssetTransferContract) VerifyProposalProperties(ctx contractapi.TransactionContextInterface, proposalId, seller, buyer string) (bool, error) {
	stub := ctx.GetStub()

	transMap, err := stub.GetTransient()
	if err != nil {
			return false, fmt.Errorf("error getting transient data: %v", err)
	}

	immutablePropertiesJSON := SortKeys(transMap["proposal"])
	if immutablePropertiesJSON == nil {
			return false, fmt.Errorf("properties key not found in the transient map")
	}

	collectionSeller := "_implicit_org_" + seller
	collectionBuyer := "_implicit_org_" + buyer

	buyerHash, err := stub.GetPrivateDataHash(collectionBuyer, proposalId)
	if err != nil {
			return false, fmt.Errorf("failed to read private data hash from buyer's collection: %v", err)
	}
	if buyerHash == nil {
			return false, fmt.Errorf("private data hash does not exist in buyer's collection: %s", proposalId)
	}

	sellerHash, err := stub.GetPrivateDataHash(collectionSeller, proposalId)
	if err != nil {
			return false, fmt.Errorf("failed to read private data hash from seller's collection: %v", err)
	}
	if sellerHash == nil {
			return false, fmt.Errorf("private data hash does not exist in seller's collection: %s", proposalId)
	}

	jsonData, err := json.Marshal(SortKeys(immutablePropertiesJSON))
	if err != nil {
			return false, fmt.Errorf("failed to marshal JSON: %v", err)
	}

	calculatedHash := sha256.Sum256([]byte(jsonData))

	if !bytes.Equal(calculatedHash[:], sellerHash) {
			return false, fmt.Errorf("proposal hash %x does not match seller's on-chain hash %x", calculatedHash, sellerHash)
	}
	if !bytes.Equal(calculatedHash[:], buyerHash) {
			return false, fmt.Errorf("proposal hash %x does not match buyer's on-chain hash %x", calculatedHash, buyerHash)
	}

	nvtAsBytes, err := stub.GetPrivateData(collectionSeller, "nvt")
	if err != nil {
			return false, fmt.Errorf("failed to read nvt from seller's collection: %v", err)
	}

	nvt, err := strconv.Atoi(string(nvtAsBytes))
	if err != nil {
			return false, fmt.Errorf("failed to convert nvt to integer: %v", err)
	}

	if nvt > 2 {
			return false, fmt.Errorf("3 or more non-verified transactions for seller %s. Please verify past transactions before proceeding", seller)
	}

	return true, nil
}


// proposalsMatch checks if the buyer's and seller's hashes of a proposal match.
func (c *AssetTransferContract) ProposalsMatch(ctx contractapi.TransactionContextInterface, proposalId, seller, buyer string) (bool, error) {
	stub := ctx.GetStub()
	collectionSeller := "_implicit_org_" + seller
	collectionBuyer := "_implicit_org_" + buyer

	buyerHash, err := stub.GetPrivateDataHash(collectionBuyer, proposalId)
	if err != nil {
			return false, fmt.Errorf("failed to read private data hash from buyer's collection: %v", err)
	}
	if buyerHash == nil {
			return false, fmt.Errorf("private data hash does not exist in buyer's collection: %s", proposalId)
	}

	sellerHash, err := stub.GetPrivateDataHash(collectionSeller, proposalId)
	if err != nil {
			return false, fmt.Errorf("failed to read private data hash from seller's collection: %v", err)
	}
	if sellerHash == nil {
			return false, fmt.Errorf("private data hash does not exist in seller's collection: %s", proposalId)
	}

	if !bytes.Equal(sellerHash, buyerHash) {
			return false, fmt.Errorf("proposal hash %x does not match buyer's hash %x", sellerHash, buyerHash)
	}

	return true, nil
}

// verifyAssetProperties verifies the properties of an asset.
func (c *AssetTransferContract) VerifyAssetProperties(ctx contractapi.TransactionContextInterface, assetID, owner, assetHash string) (bool, error) {
	stub := ctx.GetStub()
	collectionOwner := "_implicit_org_" + owner

	immutablePropertiesOnChainHash, err := stub.GetPrivateDataHash(collectionOwner, assetID)
	if err != nil {
			return false, fmt.Errorf("failed to read asset private properties hash from owner's collection: %v", err)
	}
	if immutablePropertiesOnChainHash == nil {
			return false, fmt.Errorf("asset private properties hash does not exist: %s", assetID)
	}

	assetHashBytes, _ := hex.DecodeString(assetHash)
	if err != nil {
			return false, fmt.Errorf("failed to decode proposal hash: %v", err)
	}

	if !bytes.Equal(assetHashBytes, immutablePropertiesOnChainHash) {
			return false, fmt.Errorf("transient asset hash %x does not match on-chain asset hash %x", assetHashBytes, immutablePropertiesOnChainHash)
	}

	return true, nil
}

func GenerateHash(input string) string {
	h := sha256.New()
	h.Write([]byte(input))
	return fmt.Sprintf("%x", h.Sum(nil))
}

func (c *AssetTransferContract) PutPrivateData(ctx contractapi.TransactionContextInterface, collection, key string, data interface{}) error {
	jsonData, err := json.Marshal(SortKeys(data))
	if err != nil {
			return fmt.Errorf("failed to marshal data: %v", err)
	}

	err = ctx.GetStub().PutPrivateData(collection, key, jsonData)
	if err != nil {
			return fmt.Errorf("failed to put private data: %v", err)
	}

	return nil
}

func SortKeys(data interface{}) interface{} {
	switch v := data.(type) {
	case map[string]interface{}:
		sortedData := make(map[string]interface{})
		keys := make([]string, 0, len(v))

		// Collect and sort keys
		for key := range v {
			keys = append(keys, key)
		}
		sort.Strings(keys)

		// Add sorted keys to the new map
		for _, key := range keys {
			sortedData[key] = SortKeys(v[key]) // Recursive sort for nested maps
		}
		return sortedData

	default:
		// If the value is not a map, return it as is
		return v
	}
}

func GetAllResults(iterator shim.StateQueryIteratorInterface) ([]string, error) {
	var results []string

	for iterator.HasNext() {
			queryResponse, err := iterator.Next()
			if err != nil {
					return nil, err
			}

			results = append(results, string(queryResponse.Value))
	}

	return results, nil
}

func SortedMarshal(data interface{}) ([]byte, error) {
	sortedData := SortKeys(data)
	return json.Marshal(sortedData)
}