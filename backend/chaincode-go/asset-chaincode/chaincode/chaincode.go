// SPDX-License-Identifier: Apache-2.0
package chaincode

import (
    "encoding/json"
    "fmt"
		"log"
    "time"
		"strconv"
		"strings"
    "github.com/hyperledger/fabric-contract-api-go/contractapi"
		"github.com/hyperledger/fabric-chaincode-go/shim"
)

type AssetTransferContract struct {
	contractapi.Contract
	PrivateDataWriter
	ProposalGetter
	ProposalMatcher
	AssetVerifier
  ProposalVerifier
}

func NewAssetTransferContract() *AssetTransferContract {
	contract := new(AssetTransferContract)
	contract.PrivateDataWriter = contract
	contract.ProposalGetter = contract
	contract.ProposalMatcher = contract
	contract.AssetVerifier = contract
	contract.ProposalVerifier = contract
	return contract
}

// InitLedger initializes the ledger with predefined assets
func (c *AssetTransferContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	// Get the MSP ID of the invoking organization
	user, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
		return fmt.Errorf("failed to get client MSP ID: %v", err)
	}

	// Define models and sizes
	models := []string{
		"Intel 4004",
		"Intel 8086",
		"Intel 80486",
		"Intel Pentium",
		"Intel Core 2 Duo",
		"Intel Core i5-2500K",
		"Intel Core i7-2600K",
		"Intel Core i9-9900K",
		"Intel Xeon Phi",
		"Intel Atom Z2760",
	}

	sizes := []int{100, 200, 300, 400, 500, 600, 700, 800, 900, 1000}

	// Get transaction timestamp
	timestamp, err := ctx.GetStub().GetTxTimestamp()
	if err != nil {
		return fmt.Errorf("failed to get transaction timestamp: %v", err)
	}

	// Convert timestamp to ISO8601 format
	txTime := time.Unix(timestamp.Seconds, int64(timestamp.Nanos)).UTC()
	date := txTime.Format(time.RFC3339)

	// Iterate and create assets
	for i := 0; i < 10; i++ {
		model := models[i]
		sizeNumber := sizes[i]
		assetID := "A" + GenerateHash(model+fmt.Sprintf("%d", sizeNumber))

		// Invoke 'createNewAccumulator' on 'crypto' chaincode
		response := ctx.GetStub().InvokeChaincode("crypto", [][]byte{
			[]byte("createNewAccumulator"),
			[]byte(""),
		}, "mychannel")

		if response.Status != shim.OK {
			return fmt.Errorf("failed to invoke createNewAccumulator: %s", response.Message)
		}

		if response.Payload == nil {
			return fmt.Errorf("failed to create new accumulator")
		}

		if len(response.Payload) == 0 {
			return fmt.Errorf("failed to create new accumulator")
		}

		newAccumulator := string(response.Payload)
		fmt.Print("New Accumulator: "+newAccumulator)

		// Create new history record
		newHistory := History{
			ID: "H" + GenerateHash(assetID),
			Type:    "add",
			Record: AddRecord {
				AssetID: assetID,
				Org:     user,
				Date:    date,
			},
		}

		// Prepare history JSON
		newHistoryJSON, err := SortedMarshal(newHistory)
		if err != nil {
			return fmt.Errorf("failed to marshal new history: %v", err)
		}

		// Invoke 'addToAccumulator' on 'crypto' chaincode
		response = ctx.GetStub().InvokeChaincode("crypto", [][]byte{
			[]byte("addToAccumulator"),
			[]byte(newAccumulator),
			newHistoryJSON,
		}, "mychannel")

		if response.Status != shim.OK {
			return fmt.Errorf("failed to invoke createNewAccumulator: %s", response.Message)
		}



		updatedAccumulator := string(response.Payload)
		fmt.Print("Updated Accumulator: "+updatedAccumulator)

		// Create new asset
		newAsset := Asset{
			ID:          assetID,
			Model:       model,
			Size:        strconv.Itoa(sizeNumber),
			Accumulator: updatedAccumulator,
		}

		// Prepare asset JSON
		newAssetJSON, err := SortedMarshal(newAsset)
		if err != nil {
			return fmt.Errorf("failed to marshal new asset: %v", err)
		}

		// Store asset and history in private data collection
		err = ctx.GetStub().PutPrivateData("_implicit_org_"+user, newAsset.ID, newAssetJSON)
		if err != nil {
			return fmt.Errorf("failed to put private data for asset: %v", err)
		}

		err = ctx.GetStub().PutPrivateData("_implicit_org_"+user, newHistory.ID, newHistoryJSON)
		if err != nil {
			return fmt.Errorf("failed to put private data for history: %v", err)
		}

		fmt.Printf("Added asset: %s %s %s\n", newAsset.ID, newAsset.Model, newAsset.Size)
	}

	// Initialize 'nvt' value
	err = ctx.GetStub().PutPrivateData("_implicit_org_"+user, "nvt", []byte("0"))
	if err != nil {
		return fmt.Errorf("failed to initialize 'nvt' value: %v", err)
	}

	fmt.Println("Initialized ledger with 10 assets.")
	return nil
}

func (c *AssetTransferContract) InitTransaction(ctx contractapi.TransactionContextInterface) error {
    user, err := ctx.GetClientIdentity().GetMSPID()
    if err != nil {
        return fmt.Errorf("failed to get client identity: %v", err)
    }

    assetMap, err := ctx.GetStub().GetTransient()
    if err != nil {
        return fmt.Errorf("failed to get transient data: %v", err)
    }

    assetJSON, ok := assetMap["asset"]
    if !ok {
        return fmt.Errorf("asset data not found in the transient map")
    }
    var asset Asset
    err = json.Unmarshal(assetJSON, &asset)
    if err != nil {
        return fmt.Errorf("failed to unmarshal asset JSON: %v", err)
    }

    buyerMSP := string(assetMap["msp"])
    if buyerMSP == "" {
        return fmt.Errorf("buyerMSP not found in the transient map")
    }

    timestamp, err := ctx.GetStub().GetTxTimestamp()
    if err != nil {
        return fmt.Errorf("failed to get transaction timestamp: %v", err)
    }
    txDate := time.Unix(timestamp.Seconds, int64(timestamp.Nanos)).UTC().Format(time.RFC3339)

    assetHash, err := ctx.GetStub().GetPrivateDataHash("_implicit_org_"+user, asset.ID)
    if err != nil {
        return fmt.Errorf("failed to get asset hash: %v", err)
    }

    newProposal := Proposal{
        ID:        "P" + GenerateHash(asset.ID),
        Date:      txDate,
        AssetID:   asset.ID,
        Seller:    user,
        Buyer:     buyerMSP,
        Model:     asset.Model,
        Size:      asset.Size,
        Accepted:  false,
        AssetHash: fmt.Sprintf("%x", assetHash),
    }

    ownerProposal := Proposal{
        ID:        "P" + GenerateHash(asset.ID),
        Date:      txDate,
        AssetID:   asset.ID,
        Seller:    user,
        Buyer:     buyerMSP,
        Model:     asset.Model,
        Size:      asset.Size,
        Accepted:  true,
        AssetHash: fmt.Sprintf("%x", assetHash),
    }

		ownerProposalJSON, err := json.Marshal(SortKeys(ownerProposal))
		if err != nil {
			return fmt.Errorf("failed to marshal owner proposal: %v", err)
		}

		newProposalJSON, err := json.Marshal(SortKeys(newProposal))
		if err != nil {
			return fmt.Errorf("failed to marshal new proposal: %v", err)
		}

    err = c.PutPrivateData(ctx, "_implicit_org_"+user, ownerProposal.ID, ownerProposalJSON)
    if err != nil {
        return err
    }
    err = c.PutPrivateData(ctx, "_implicit_org_"+buyerMSP, newProposal.ID, newProposalJSON)
    if err != nil {
        return err
    }

    eventPayload := fmt.Sprintf("Trade proposal: %s, sent from %s.", newProposal.ID, user)
    ctx.GetStub().SetEvent("ProposalFor"+buyerMSP, []byte(eventPayload))

    return nil
}

func (c *AssetTransferContract) AcceptProposal(ctx contractapi.TransactionContextInterface, id string) error {
    user, err := ctx.GetClientIdentity().GetMSPID()
    if err != nil {
        return fmt.Errorf("failed to get client identity: %v", err)
    }

    proposal, err := c.GetProposal(ctx, id)
    if err != nil {
        return err
    }
    if proposal.Buyer != user {
        return fmt.Errorf("proposal %s can only be accepted by %s", id, proposal.Buyer)
    }

		// Checking that the asset was not changed since the proposal was created
    verified, err := c.VerifyAssetProperties(ctx, proposal.AssetID, proposal.Seller, proposal.AssetHash)
    if err != nil || !verified {
        return fmt.Errorf("asset verification failed")
    }

    proposal.Accepted = true
    err = c.PutPrivateData(ctx, "_implicit_org_"+user, proposal.ID, proposal)
    if err != nil {
        return err
    }

    eventPayload := fmt.Sprintf("Trade proposal: %s accepted by %s.", proposal.ID, user)
    ctx.GetStub().SetEvent("Proposal"+proposal.ID+"Accepted", []byte(eventPayload))

    return nil
}

func (c *AssetTransferContract) CheckProposalAccepted(ctx contractapi.TransactionContextInterface, proposalIdsJSON string) ([]string, error) {
	var proposalIds []string
	err := json.Unmarshal([]byte(proposalIdsJSON), &proposalIds)
	if err != nil {
			return nil, fmt.Errorf("failed to unmarshal proposal IDs: %v", err)
	}

	user, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
			return nil, fmt.Errorf("failed to get client identity: %v", err)
	}

	// Initialize the slice to an empty slice
	acceptedProposals := []string{}

	for _, id := range proposalIds {
			proposal, err := c.ProposalGetter.GetProposal(ctx, id)
			if err != nil {
					return nil, err
			}
			if proposal.Seller != user {
					return nil, fmt.Errorf("proposal %s can only be checked by %s", id, proposal.Seller)
			}
			if match, _ := c.ProposalMatcher.ProposalsMatch(ctx, proposal.ID, proposal.Seller, proposal.Buyer); match {
					acceptedProposals = append(acceptedProposals, proposal.ID)
			}
	}

	return acceptedProposals, nil
}


// TransferAsset transfers an asset based on a verified proposal.
func (c *AssetTransferContract) TransferAsset(ctx contractapi.TransactionContextInterface) error {
	user, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
			return fmt.Errorf("failed to get client identity: %v", err)
	}

	assetMap, err := ctx.GetStub().GetTransient()
	if err != nil {
			return fmt.Errorf("failed to get transient data: %v", err)
	}

	assetJSON := assetMap["asset"]
	var asset Asset
	err = json.Unmarshal(assetJSON, &asset)
	if err != nil {
			return fmt.Errorf("failed to unmarshal asset JSON: %v", err)
	}

	proposalJSON := assetMap["proposal"]
	var proposal Proposal
	err = json.Unmarshal(proposalJSON, &proposal)
	if err != nil {
			return fmt.Errorf("failed to unmarshal proposal JSON: %v", err)
	}

	assetVerified, err := c.AssetVerifier.VerifyAssetProperties(ctx, asset.ID, user, proposal.AssetHash)
	if err != nil || !assetVerified {
			return fmt.Errorf("asset verification failed: %v", err)
	}

	proposalVerified, err := c.ProposalVerifier.VerifyProposalProperties(ctx, proposal.ID, proposal.Seller, proposal.Buyer)
	if err != nil || !proposalVerified {
			return fmt.Errorf("proposal verification failed: %v", err)
	}

	timestamp, err := ctx.GetStub().GetTxTimestamp()
	if err != nil {
			return fmt.Errorf("failed to get transaction timestamp: %v", err)
	}
	txDate := time.Unix(timestamp.Seconds, int64(timestamp.Nanos)).UTC().Format(time.RFC3339)

	newHistory := History{
			ID: "H" + GenerateHash(proposal.AssetID),
			Type:    "transaction",
			Record: TransactionRecord{
					FromOrg: proposal.Seller,
					ToOrg:   proposal.Buyer,
					Model:   asset.Model,
					Size:    asset.Size,
					Date:    txDate,
					Verified: false,
			},
	}

	nonVerifiedTransactions, err := ctx.GetStub().GetPrivateData("_implicit_org_"+user, "nvt")
	if err != nil {
			return fmt.Errorf("failed to get non-verified transactions: %v", err)
	}

	nonVerifiedCount, err := strconv.Atoi(string(nonVerifiedTransactions))
	if err != nil {
			return fmt.Errorf("failed to convert non-verified transactions count: %v", err)
	}

	err = ctx.GetStub().PutPrivateData("_implicit_org_"+user, "Verified_Transactions", []byte(strconv.Itoa(nonVerifiedCount+1)))
	if err != nil {
			return fmt.Errorf("failed to update verified transactions: %v", err)
	}

	err = c.PrivateDataWriter.PutPrivateData(ctx, "_implicit_org_"+user, newHistory.ID, newHistory)
	if err != nil {
		return fmt.Errorf("failed to put private data: %v", err)
	}

	err = c.PrivateDataWriter.PutPrivateData(ctx, "_implicit_org_"+proposal.Buyer, newHistory.ID, newHistory)
	if err != nil {
		return fmt.Errorf("failed to put private data: %v", err)
	}

	err = c.PrivateDataWriter.PutPrivateData(ctx, "_implicit_org_"+proposal.Buyer, asset.ID, asset)
	if err != nil {
		return fmt.Errorf("failed to put private data: %v", err)
	}

	err = ctx.GetStub().DelPrivateData("_implicit_org_"+user, proposal.ID)
	if err != nil {
			return fmt.Errorf("failed to delete proposal from seller: %v", err)
	}

	err = ctx.GetStub().DelPrivateData("_implicit_org_"+proposal.Buyer, proposal.ID)
	if err != nil {
			return fmt.Errorf("failed to delete proposal from buyer: %v", err)
	}

	err = ctx.GetStub().DelPrivateData("_implicit_org_"+user, proposal.AssetID)
	if err != nil {
			return fmt.Errorf("failed to delete asset from seller: %v", err)
	}

	eventPayload := fmt.Sprintf("Asset: %s transferred to %s.", asset.ID, proposal.Buyer)
	ctx.GetStub().SetEvent("Transfer"+proposal.ID+"complete", []byte(eventPayload))

	return nil
}

// AddAsset adds a new asset to the ledger.
func (c *AssetTransferContract) AddAsset(ctx contractapi.TransactionContextInterface) error {
	user, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
			return fmt.Errorf("failed to get client identity: %v", err)
	}

	timestamp, err := ctx.GetStub().GetTxTimestamp()
	if err != nil {
			return fmt.Errorf("failed to get transaction timestamp: %v", err)
	}
	txDate := time.Unix(timestamp.Seconds, int64(timestamp.Nanos)).UTC().Format(time.RFC3339)

	assetMap, err := ctx.GetStub().GetTransient()
	if err != nil {
			return fmt.Errorf("failed to get transient data: %v", err)
	}

	assetJSON := assetMap["asset"]
	var asset Asset
	err = json.Unmarshal(assetJSON, &asset)
	if err != nil {
			return fmt.Errorf("failed to unmarshal asset JSON: %v", err)
	}

	assetID := "A" + GenerateHash(asset.Model+asset.Size)

	response := ctx.GetStub().InvokeChaincode("crypto", [][]byte{[]byte("createNewAccumulator"), []byte("")}, "mychannel")
	if response.Status != 200 {
			return fmt.Errorf("failed to invoke chaincode: %v", response.Message)
	}
	newAccumulator := string(response.Payload)

	newHistory := History{
			ID: "H" + GenerateHash(assetID),
			Type:   "add",
			Record: AddRecord{
					AssetID: assetID,
					Org:    user,
					Date:   txDate,
			},
	}
	jsonBytes, err := json.Marshal(newHistory)
    if err != nil {
        log.Fatalf("Error marshalling history: %v", err)
    }

	response = ctx.GetStub().InvokeChaincode("crypto", [][]byte{[]byte("addToAccumulator"), []byte(newAccumulator), []byte(jsonBytes)}, "mychannel")
	if response.Status != 200 {
			return fmt.Errorf("failed to invoke chaincode: %v", response.Message)
	}
	updatedAccumulator := string(response.Payload)

	newAsset := Asset{
			ID:          assetID,
			Model:       asset.Model,
			Size:        asset.Size,
			Accumulator: updatedAccumulator,
	}

	err = c.PutPrivateData(ctx, "_implicit_org_"+user, newAsset.ID, newAsset)
	if err != nil {
			return err
	}

	err = c.PutPrivateData(ctx, "_implicit_org_"+user, newHistory.ID, newHistory)
	if err != nil {
			return err
	}

	return nil
}

// DeleteAsset deletes an asset from the ledger.
func (c *AssetTransferContract) DeleteAsset(ctx contractapi.TransactionContextInterface, id string) error {
	user, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
			return fmt.Errorf("failed to get client identity: %v", err)
	}

	timestamp, err := ctx.GetStub().GetTxTimestamp()
	if err != nil {
			return fmt.Errorf("failed to get transaction timestamp: %v", err)
	}
	txDate := time.Unix(timestamp.Seconds, int64(timestamp.Nanos)).UTC().Format(time.RFC3339)

	assetID := "A" + id[1:]
	newHistory := History {
    ID: "H" + GenerateHash(assetID),
		Type: "delete",
			Record: DeleteRecord {
					ID:   assetID,
					Org:  user,
					Date: txDate,
    	},
}

	err = c.PutPrivateData(ctx, "_implicit_org_"+user, newHistory.ID, newHistory)
	if err != nil {
			return err
	}

	err = ctx.GetStub().DelPrivateData("_implicit_org_"+user, assetID)
	if err != nil {
			return fmt.Errorf("failed to delete asset: %v", err)
	}

	return nil
}

// GetAllAssets returns all assets stored in the ledger.
func (c *AssetTransferContract) GetAllAssets(ctx contractapi.TransactionContextInterface) ([]string, error) {
	user, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
			return nil, fmt.Errorf("failed to get client identity: %v", err)
	}

	iterator, err := ctx.GetStub().GetPrivateDataByRange("_implicit_org_"+user, "A", "B")
	if err != nil {
			return nil, fmt.Errorf("failed to get private data by range: %v", err)
	}

	results, err := GetAllResults(iterator)
	if err != nil {
			return nil, err
	}

	return results, nil
}

// GetAllHistories returns all transaction histories stored in the ledger.
func (c *AssetTransferContract) GetAllHistories(ctx contractapi.TransactionContextInterface) ([]string, error) {
	user, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
			return nil, fmt.Errorf("failed to get client identity: %v", err)
	}

	iterator, err := ctx.GetStub().GetPrivateDataByRange("_implicit_org_"+user, "H", "P")
	if err != nil {
			return nil, fmt.Errorf("failed to get private data by range: %v", err)
	}

	results, err := GetAllResults(iterator)
	if err != nil {
			return nil, err
	}

	return results, nil
}

// GetAllProposals returns all proposals stored in the ledger.
func (c *AssetTransferContract) GetAllProposals(ctx contractapi.TransactionContextInterface) ([]string, error) {
	user, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
			return nil, fmt.Errorf("failed to get client identity: %v", err)
	}

	iterator, err := ctx.GetStub().GetPrivateDataByRange("_implicit_org_"+user, "P", "Q")
	if err != nil {
			return nil, fmt.Errorf("failed to get private data by range: %v", err)
	}

	results, err := GetAllResults(iterator)
	if err != nil {
			return nil, err
	}

	return results, nil
}

// VerifyTransaction verifies a transaction history entry.
func (c *AssetTransferContract) VerifyTransaction(ctx contractapi.TransactionContextInterface, id string) (bool, error) {
	user, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
			return false, fmt.Errorf("failed to get client identity: %v", err)
	}

	history, err := c.GetHistory(ctx, id)
	if err != nil {
			return false, err
	}

	if tr, ok := history.Record.(TransactionRecord); ok {
			if tr.FromOrg != user {
					return false, fmt.Errorf("transaction %s can only be verified by %s", id, tr.FromOrg)
			}
			tr.Verified = true
			history.Record = tr
			err = c.PutPrivateData(ctx, "_implicit_org_"+user, history.ID, history)
			if err != nil {
					return false, err
			}
			return true, nil
	}

	return false, fmt.Errorf("history %s is not a transaction", id)
}

// GetAsset retrieves an asset from the ledger by its ID.
func (c *AssetTransferContract) GetAsset(ctx contractapi.TransactionContextInterface, id string) (*Asset, error) {
	user, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
			return nil, fmt.Errorf("failed to get client identity: %v", err)
	}

	if !strings.HasPrefix(id, "A") {
			return nil, fmt.Errorf("invalid asset ID: %s", id)
	}

	assetAsBytes, err := ctx.GetStub().GetPrivateData("_implicit_org_"+user, id)
	if err != nil {
			return nil, fmt.Errorf("failed to get asset %s: %v", id, err)
	}
	if assetAsBytes == nil {
			return nil, fmt.Errorf("asset %s does not exist", id)
	}

	var asset Asset
	err = json.Unmarshal(assetAsBytes, &asset)
	if err != nil {
			return nil, fmt.Errorf("failed to unmarshal asset %s: %v", id, err)
	}

	return &asset, nil
}

// GetProposal retrieves a proposal from the ledger by its ID.
func (c *AssetTransferContract) GetProposal(ctx contractapi.TransactionContextInterface, id string) (*Proposal, error) {
	user, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
			return nil, fmt.Errorf("failed to get client identity: %v", err)
	}

	if !strings.HasPrefix(id, "P") {
			return nil, fmt.Errorf("invalid proposal ID: %s", id)
	}

	proposalAsBytes, err := ctx.GetStub().GetPrivateData("_implicit_org_"+user, id)
	if err != nil {
			return nil, fmt.Errorf("failed to get proposal %s: %v", id, err)
	}
	if proposalAsBytes == nil {
			return nil, fmt.Errorf("proposal %s does not exist", id)
	}

	var proposal Proposal
	err = json.Unmarshal(proposalAsBytes, &proposal)
	if err != nil {
			return nil, fmt.Errorf("failed to unmarshal proposal %s: %v", id, err)
	}

	return &proposal, nil
}

// GetHistory retrieves a transaction history from the ledger by its ID.
func (c *AssetTransferContract) GetHistory(ctx contractapi.TransactionContextInterface, id string) (*History, error) {
	user, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
			return nil, fmt.Errorf("failed to get client identity: %v", err)
	}

	if !strings.HasPrefix(id, "H") {
			return nil, fmt.Errorf("invalid history ID: %s", id)
	}

	historyAsBytes, err := ctx.GetStub().GetPrivateData("_implicit_org_"+user, id)
	if err != nil {
			return nil, fmt.Errorf("failed to get history %s: %v", id, err)
	}
	if historyAsBytes == nil {
			return nil, fmt.Errorf("history %s does not exist", id)
	}

	var history History
	err = json.Unmarshal(historyAsBytes, &history)
	if err != nil {
			return nil, fmt.Errorf("failed to unmarshal history %s: %v", id, err)
	}

	return &history, nil
}

// func (c *AssetTransferContract) RejectProposal(ctx contractapi.TransactionContextInterface, id string) error {
//     user, err := ctx.GetClientIdentity().GetMSPID()
//     if err != nil {
//         return fmt.Errorf("failed to get client identity: %v", err)
//     }

//     proposal, err := c.GetProposal(ctx, id)
//     if err != nil {
//         return err
//     }
//     if proposal.Buyer != user {
//         return fmt.Errorf("proposal %s can only be rejected by %s", id, proposal.Buyer)
//     }

//     eventPayload := fmt.Sprintf("Trade proposal: %s rejected by %s.", proposal.ID, user)
//     ctx.GetStub().SetEvent("Proposal"+proposal.ID+"Rejected", []byte(eventPayload))

//     err = ctx.GetStub().DelPrivateData("_implicit_org_"+user, id)
//     if err != nil {
//         return fmt.Errorf("failed to delete proposal: %v", err)
//     }

//     return nil
// }
