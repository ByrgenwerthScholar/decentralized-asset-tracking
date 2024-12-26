package chaincode

import (
	"sort"
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"bytes"
	"encoding/hex"
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

	proposalBytes := transMap["proposal"]
	if proposalBytes == nil {
			return false, fmt.Errorf("properties key not found in the transient map")
	}

	var proposalData interface{}
    err = json.Unmarshal(proposalBytes, &proposalData)
    if err != nil {
        return false, fmt.Errorf("failed to unmarshal proposal data: %v", err)
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
	fmt.Printf("[DEBUG] VerifyProposalProperties: Buyer's on-chain hash: %x\n", buyerHash)
	sellerHash, err := stub.GetPrivateDataHash(collectionSeller, proposalId)
	if err != nil {
			return false, fmt.Errorf("failed to read private data hash from seller's collection: %v", err)
	}
	if sellerHash == nil {
			return false, fmt.Errorf("private data hash does not exist in seller's collection: %s", proposalId)
	}
	fmt.Printf("[DEBUG] VerifyProposalProperties: Seller's on-chain hash: %x\n", sellerHash)
	sortedProposalData := SortKeys(proposalData)
	jsonData, err := json.Marshal(sortedProposalData)
	if err != nil {
			return false, fmt.Errorf("failed to marshal JSON: %v", err)
	}
	fmt.Printf("[DEBUG] VerifyProposalProperties: Sorted proposal JSON: %s\n", string(jsonData))

	calculatedHash := sha256.Sum256([]byte(jsonData))
	fmt.Printf("[DEBUG] VerifyProposalProperties: Calculated hash: %x\n", calculatedHash)
	if !bytes.Equal(calculatedHash[:], sellerHash) {
			return false, fmt.Errorf("proposal hash %x does not match seller's on-chain hash %x", calculatedHash, sellerHash)
	}
	if !bytes.Equal(calculatedHash[:], buyerHash) {
			return false, fmt.Errorf("proposal hash %x does not match buyer's on-chain hash %x", calculatedHash, buyerHash)
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

	assetHashBytes, err := hex.DecodeString(assetHash)
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
	case []interface{}:
		for i, item := range v {
			v[i] = SortKeys(item)
		}
		return v
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