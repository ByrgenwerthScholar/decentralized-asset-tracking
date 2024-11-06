package chaincode

import (

    "testing"
		"encoding/json"
		"fmt"
		"encoding/hex"
    "github.com/stretchr/testify/assert"
    "asset_chaincode/chaincode"
    "asset_chaincode/mocks"
		
)

func TestAcceptProposalSuccess(t *testing.T) {
	ctx := new(mocks.MockTransactionContext)
	stub := new(mocks.MockStub)
	clientIdentity := new(mocks.MockClientIdentity)

	ctx.On("GetStub").Return(stub)
	ctx.On("GetClientIdentity").Return(clientIdentity)
	clientIdentity.On("GetMSPID").Return("Org1MSP", nil)

	// Mock a valid proposal
	proposal := &chaincode.Proposal{
			ID:        "P123",
			Buyer:     "Org1MSP",
			AssetID:   "A123",
			Seller:    "Org2MSP",
			AssetHash: "assetHash",
			Accepted:  true,
	}
	proposalBytes, _ := json.Marshal(proposal)
	expectedHash, _ := hex.DecodeString(proposal.AssetHash)

	// Mock GetPrivateData to return the proposal
	stub.On("GetPrivateData", "_implicit_org_Org1MSP", "P123").Return(proposalBytes, nil)

	// Mock PutPrivateData with the marshaled proposal bytes
	stub.On("PutPrivateData", "_implicit_org_Org1MSP", "P123", proposalBytes).Return(nil)

	// Mock the successful verification of asset properties
	stub.On("GetPrivateDataHash", "_implicit_org_Org2MSP", "A123").Return(expectedHash, nil)

	// Mock SetEvent with the expected event payload
	eventPayload := []byte(fmt.Sprintf("Trade proposal: %s accepted by %s.", proposal.ID, "Org1MSP"))
	stub.On("SetEvent", "ProposalP123Accepted", eventPayload).Return(nil)

	// Create the contract instance
	contract := new(chaincode.AssetTransferContract)

	// Call the AcceptProposal function
	err := contract.AcceptProposal(ctx, "P123")

	// Assert that no error occurred
	assert.NoError(t, err, "AcceptProposal should succeed without errors")

	// Assert that PutPrivateData was called with the expected arguments
	stub.AssertCalled(t, "PutPrivateData", "_implicit_org_Org1MSP", "P123", proposalBytes)

	// Assert that SetEvent was called with the expected event
	stub.AssertCalled(t, "SetEvent", "ProposalP123Accepted", eventPayload)
}


func TestAcceptProposalFailedGetClientIdentity(t *testing.T) {
	ctx := new(mocks.MockTransactionContext)
	clientIdentity := new(mocks.MockClientIdentity)

	ctx.On("GetClientIdentity").Return(clientIdentity)
	clientIdentity.On("GetMSPID").Return("", fmt.Errorf("client identity error"))

	contract := new(chaincode.AssetTransferContract)
	err := contract.AcceptProposal(ctx, "P123")

	assert.Error(t, err, "AcceptProposal should return an error if GetMSPID fails")
	assert.Contains(t, err.Error(), "failed to get client identity")
}


