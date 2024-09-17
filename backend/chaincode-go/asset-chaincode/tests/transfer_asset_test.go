package chaincode

import (
	"fmt"
	"encoding/json"
	"testing"
	"asset_chaincode/mocks"
	"asset_chaincode/chaincode"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/golang/protobuf/ptypes/timestamp"
	"time"
)

func TestTransferAsset(t *testing.T) {
    testCases := []struct {
        name                string
        setupMocks          func(ctx *mocks.MockTransactionContext, clientIdentity *mocks.MockClientIdentity, stub *mocks.MockStub, contract *chaincode.AssetTransferContract)
        expectError         bool
        expectedErrorString string
    }{
		{
				name: "Success - Asset transferred successfully",
				setupMocks: func(
					ctx *mocks.MockTransactionContext,
					clientIdentity *mocks.MockClientIdentity,
					stub *mocks.MockStub,
					contract *chaincode.AssetTransferContract,
				) {
					// Mock GetClientIdentity and GetMSPID
					ctx.On("GetClientIdentity").Return(clientIdentity)
					clientIdentity.On("GetMSPID").Return("Org1MSP", nil)
		
					// Mock GetStub
					ctx.On("GetStub").Return(stub)
		
					// Mock GetTransient
					asset := chaincode.Asset{
						ID:    "asset1",
						Model: "ModelX",
						Size:  "Large",
					}
					proposal := chaincode.Proposal{
						ID:        "proposal1",
						Seller:    "Org1MSP",
						Buyer:     "Org2MSP",
						AssetID:   "asset1",
						AssetHash: "somehash",
					}
					assetJSON, _ := json.Marshal(asset)
					proposalJSON, _ := json.Marshal(proposal)
					transientMap := map[string][]byte{
						"asset":    assetJSON,
						"proposal": proposalJSON,
					}
					stub.On("GetTransient").Return(transientMap, nil)
		
					// Mock VerifyAssetProperties and VerifyProposalProperties
					assetVerifier := new(mocks.MockAssetVerifier)
					proposalVerifier := new(mocks.MockProposalVerifier)
					contract.AssetVerifier = assetVerifier
					contract.ProposalVerifier = proposalVerifier
		
					assetVerifier.On(
						"VerifyAssetProperties",
						ctx,
						"asset1",
						"Org1MSP",
						"somehash",
					).Return(true, nil)
		
					proposalVerifier.On(
						"VerifyProposalProperties",
						ctx,
						"proposal1",
						"Org1MSP",
						"Org2MSP",
					).Return(true, nil)
		
					// Mock GetTxTimestamp
					txTime := &timestamp.Timestamp{Seconds: time.Now().Unix(), Nanos: 0}
					stub.On("GetTxTimestamp").Return(txTime, nil)
		
					// Mock GetPrivateData for non-verified transactions count
					stub.On("GetPrivateData", "_implicit_org_Org1MSP", "nvt").Return([]byte("0"), nil)
		
					// Mock PutPrivateData for updating verified transactions
					stub.On("PutPrivateData", "_implicit_org_Org1MSP", "Verified_Transactions", []byte("1")).Return(nil)
		
					// Mock PrivateDataWriter
					privateDataWriter := new(mocks.MockPrivateDataWriter)
					contract.PrivateDataWriter = privateDataWriter
		
					// Mock PutPrivateData calls
					privateDataWriter.On(
						"PutPrivateData",
						ctx,
						"_implicit_org_Org1MSP",
						mock.AnythingOfType("string"), // newHistory.ID
						mock.Anything,
					).Return(nil).Once()
		
					privateDataWriter.On(
						"PutPrivateData",
						ctx,
						"_implicit_org_Org2MSP",
						mock.AnythingOfType("string"), // newHistory.ID
						mock.Anything,
					).Return(nil).Once()
		
					privateDataWriter.On(
						"PutPrivateData",
						ctx,
						"_implicit_org_Org2MSP",
						"asset1",
						asset,
					).Return(nil).Once()
		
					// Mock DelPrivateData
					stub.On("DelPrivateData", "_implicit_org_Org1MSP", "proposal1").Return(nil)
					stub.On("DelPrivateData", "_implicit_org_Org2MSP", "proposal1").Return(nil)
					stub.On("DelPrivateData", "_implicit_org_Org1MSP", "asset1").Return(nil)
		
					// Mock SetEvent
					stub.On("SetEvent", "Transferproposal1complete", mock.Anything).Return(nil)
				},
				expectError: false,
			},
			{
				name: "Failure - GetClientIdentity error",
				setupMocks: func(
					ctx *mocks.MockTransactionContext,
					clientIdentity *mocks.MockClientIdentity,
					stub *mocks.MockStub,
					contract *chaincode.AssetTransferContract,
				) {
					ctx.On("GetClientIdentity").Return(clientIdentity)
					clientIdentity.On("GetMSPID").Return("", fmt.Errorf("GetMSPID error"))
				},
				expectError:         true,
				expectedErrorString: "failed to get client identity",
			},
			{
				name: "Failure - GetTransient error",
				setupMocks: func(
					ctx *mocks.MockTransactionContext,
					clientIdentity *mocks.MockClientIdentity,
					stub *mocks.MockStub,
					contract *chaincode.AssetTransferContract,
				) {
					ctx.On("GetClientIdentity").Return(clientIdentity)
					clientIdentity.On("GetMSPID").Return("Org1MSP", nil)
		
					ctx.On("GetStub").Return(stub)
					stub.On("GetTransient").Return(nil, fmt.Errorf("GetTransient error"))
				},
				expectError:         true,
				expectedErrorString: "failed to get transient data",
			},
			{
				name: "Failure - Unmarshal asset JSON error",
				setupMocks: func(
					ctx *mocks.MockTransactionContext,
					clientIdentity *mocks.MockClientIdentity,
					stub *mocks.MockStub,
					contract *chaincode.AssetTransferContract,
				) {
					ctx.On("GetClientIdentity").Return(clientIdentity)
					clientIdentity.On("GetMSPID").Return("Org1MSP", nil)
		
					ctx.On("GetStub").Return(stub)
		
					// Provide invalid JSON for asset
					transientMap := map[string][]byte{
						"asset":    []byte("invalid_json"),
						"proposal": []byte(`{}`),
					}
					stub.On("GetTransient").Return(transientMap, nil)
				},
				expectError:         true,
				expectedErrorString: "failed to unmarshal asset JSON",
			},
			{
				name: "Failure - Unmarshal proposal JSON error",
				setupMocks: func(
					ctx *mocks.MockTransactionContext,
					clientIdentity *mocks.MockClientIdentity,
					stub *mocks.MockStub,
					contract *chaincode.AssetTransferContract,
				) {
					ctx.On("GetClientIdentity").Return(clientIdentity)
					clientIdentity.On("GetMSPID").Return("Org1MSP", nil)
		
					ctx.On("GetStub").Return(stub)
		
					// Provide invalid JSON for proposal
					transientMap := map[string][]byte{
						"asset":    []byte(`{}`),
						"proposal": []byte("invalid_json"),
					}
					stub.On("GetTransient").Return(transientMap, nil)
				},
				expectError:         true,
				expectedErrorString: "failed to unmarshal proposal JSON",
			},
			{
				name: "Failure - Asset verification failed",
				setupMocks: func(
					ctx *mocks.MockTransactionContext,
					clientIdentity *mocks.MockClientIdentity,
					stub *mocks.MockStub,
					contract *chaincode.AssetTransferContract,
				) {
					ctx.On("GetClientIdentity").Return(clientIdentity)
					clientIdentity.On("GetMSPID").Return("Org1MSP", nil)
		
					ctx.On("GetStub").Return(stub)
		
					asset := chaincode.Asset{ID: "asset1"}
					proposal := chaincode.Proposal{
						ID:        "proposal1",
						Seller:    "Org1MSP",
						Buyer:     "Org2MSP",
						AssetID:   "asset1",
						AssetHash: "somehash",
					}
					assetJSON, _ := json.Marshal(asset)
					proposalJSON, _ := json.Marshal(proposal)
					transientMap := map[string][]byte{
						"asset":    assetJSON,
						"proposal": proposalJSON,
					}
					stub.On("GetTransient").Return(transientMap, nil)
		
					// Mock VerifyAssetProperties to return false
					assetVerifier := new(mocks.MockAssetVerifier)
					contract.AssetVerifier = assetVerifier
					assetVerifier.On(
						"VerifyAssetProperties",
						ctx,
						"asset1",
						"Org1MSP",
						"somehash",
					).Return(false, nil)
				},
				expectError:         true,
				expectedErrorString: "asset verification failed",
			},
			{
				name: "Failure - Proposal verification failed",
				setupMocks: func(
					ctx *mocks.MockTransactionContext,
					clientIdentity *mocks.MockClientIdentity,
					stub *mocks.MockStub,
					contract *chaincode.AssetTransferContract,
				) {
					ctx.On("GetClientIdentity").Return(clientIdentity)
					clientIdentity.On("GetMSPID").Return("Org1MSP", nil)
		
					ctx.On("GetStub").Return(stub)
		
					asset := chaincode.Asset{ID: "asset1"}
					proposal := chaincode.Proposal{
						ID:        "proposal1",
						Seller:    "Org1MSP",
						Buyer:     "Org2MSP",
						AssetID:   "asset1",
						AssetHash: "somehash",
					}
					assetJSON, _ := json.Marshal(asset)
					proposalJSON, _ := json.Marshal(proposal)
					transientMap := map[string][]byte{
						"asset":    assetJSON,
						"proposal": proposalJSON,
					}
					stub.On("GetTransient").Return(transientMap, nil)
		
					// Mock VerifyAssetProperties to return true
					assetVerifier := new(mocks.MockAssetVerifier)
					contract.AssetVerifier = assetVerifier
					assetVerifier.On(
						"VerifyAssetProperties",
						ctx,
						"asset1",
						"Org1MSP",
						"somehash",
					).Return(true, nil)
		
					// Mock VerifyProposalProperties to return false
					proposalVerifier := new(mocks.MockProposalVerifier)
					contract.ProposalVerifier = proposalVerifier
					proposalVerifier.On(
						"VerifyProposalProperties",
						ctx,
						"proposal1",
						"Org1MSP",
						"Org2MSP",
					).Return(false, nil)
				},
				expectError:         true,
				expectedErrorString: "proposal verification failed",
			},
			{
				name: "Failure - GetTxTimestamp error",
				setupMocks: func(
					ctx *mocks.MockTransactionContext,
					clientIdentity *mocks.MockClientIdentity,
					stub *mocks.MockStub,
					contract *chaincode.AssetTransferContract,
				) {
					ctx.On("GetClientIdentity").Return(clientIdentity)
					clientIdentity.On("GetMSPID").Return("Org1MSP", nil)
		
					ctx.On("GetStub").Return(stub)
		
					asset := chaincode.Asset{ID: "asset1"}
					proposal := chaincode.Proposal{
						ID:        "proposal1",
						Seller:    "Org1MSP",
						Buyer:     "Org2MSP",
						AssetID:   "asset1",
						AssetHash: "somehash",
					}
					assetJSON, _ := json.Marshal(asset)
					proposalJSON, _ := json.Marshal(proposal)
					transientMap := map[string][]byte{
						"asset":    assetJSON,
						"proposal": proposalJSON,
					}
					stub.On("GetTransient").Return(transientMap, nil)
		
					// Mock VerifyAssetProperties and VerifyProposalProperties to return true
					assetVerifier := new(mocks.MockAssetVerifier)
					proposalVerifier := new(mocks.MockProposalVerifier)
					contract.AssetVerifier = assetVerifier
					contract.ProposalVerifier = proposalVerifier
		
					assetVerifier.On(
						"VerifyAssetProperties",
						ctx,
						"asset1",
						"Org1MSP",
						"somehash",
					).Return(true, nil)
		
					proposalVerifier.On(
						"VerifyProposalProperties",
						ctx,
						"proposal1",
						"Org1MSP",
						"Org2MSP",
					).Return(true, nil)
		
					// Mock GetTxTimestamp to return an error
					stub.On("GetTxTimestamp").Return(nil, fmt.Errorf("GetTxTimestamp error"))
				},
				expectError:         true,
				expectedErrorString: "failed to get transaction timestamp",
			},
			{
				name: "Failure - GetPrivateData error",
				setupMocks: func(
					ctx *mocks.MockTransactionContext,
					clientIdentity *mocks.MockClientIdentity,
					stub *mocks.MockStub,
					contract *chaincode.AssetTransferContract,
				) {
					ctx.On("GetClientIdentity").Return(clientIdentity)
					clientIdentity.On("GetMSPID").Return("Org1MSP", nil)
		
					ctx.On("GetStub").Return(stub)
		
					asset := chaincode.Asset{ID: "asset1"}
					proposal := chaincode.Proposal{
						ID:        "proposal1",
						Seller:    "Org1MSP",
						Buyer:     "Org2MSP",
						AssetID:   "asset1",
						AssetHash: "somehash",
					}
					assetJSON, _ := json.Marshal(asset)
					proposalJSON, _ := json.Marshal(proposal)
					transientMap := map[string][]byte{
						"asset":    assetJSON,
						"proposal": proposalJSON,
					}
					stub.On("GetTransient").Return(transientMap, nil)
		
					// Mock VerifyAssetProperties and VerifyProposalProperties to return true
					assetVerifier := new(mocks.MockAssetVerifier)
					proposalVerifier := new(mocks.MockProposalVerifier)
					contract.AssetVerifier = assetVerifier
					contract.ProposalVerifier = proposalVerifier
		
					assetVerifier.On(
						"VerifyAssetProperties",
						ctx,
						"asset1",
						"Org1MSP",
						"somehash",
					).Return(true, nil)
		
					proposalVerifier.On(
						"VerifyProposalProperties",
						ctx,
						"proposal1",
						"Org1MSP",
						"Org2MSP",
					).Return(true, nil)
		
					// Mock GetTxTimestamp
					txTime := &timestamp.Timestamp{Seconds: time.Now().Unix(), Nanos: 0}
					stub.On("GetTxTimestamp").Return(txTime, nil)
		
					// Mock GetPrivateData to return an error
					stub.On("GetPrivateData", "_implicit_org_Org1MSP", "nvt").Return(nil, fmt.Errorf("GetPrivateData error"))
				},
				expectError:         true,
				expectedErrorString: "failed to get non-verified transactions",
			},
			{
				name: "Failure - Non-verified transactions count invalid",
				setupMocks: func(
					ctx *mocks.MockTransactionContext,
					clientIdentity *mocks.MockClientIdentity,
					stub *mocks.MockStub,
					contract *chaincode.AssetTransferContract,
				) {
					ctx.On("GetClientIdentity").Return(clientIdentity)
					clientIdentity.On("GetMSPID").Return("Org1MSP", nil)
		
					ctx.On("GetStub").Return(stub)
		
					asset := chaincode.Asset{ID: "asset1"}
					proposal := chaincode.Proposal{
						ID:        "proposal1",
						Seller:    "Org1MSP",
						Buyer:     "Org2MSP",
						AssetID:   "asset1",
						AssetHash: "somehash",
					}
					assetJSON, _ := json.Marshal(asset)
					proposalJSON, _ := json.Marshal(proposal)
					transientMap := map[string][]byte{
						"asset":    assetJSON,
						"proposal": proposalJSON,
					}
					stub.On("GetTransient").Return(transientMap, nil)
		
					// Mock VerifyAssetProperties and VerifyProposalProperties to return true
					assetVerifier := new(mocks.MockAssetVerifier)
					proposalVerifier := new(mocks.MockProposalVerifier)
					contract.AssetVerifier = assetVerifier
					contract.ProposalVerifier = proposalVerifier
		
					assetVerifier.On(
						"VerifyAssetProperties",
						ctx,
						"asset1",
						"Org1MSP",
						"somehash",
					).Return(true, nil)
		
					proposalVerifier.On(
						"VerifyProposalProperties",
						ctx,
						"proposal1",
						"Org1MSP",
						"Org2MSP",
					).Return(true, nil)
		
					// Mock GetTxTimestamp
					txTime := &timestamp.Timestamp{Seconds: time.Now().Unix(), Nanos: 0}
					stub.On("GetTxTimestamp").Return(txTime, nil)
		
					// Mock GetPrivateData with invalid count
					stub.On("GetPrivateData", "_implicit_org_Org1MSP", "nvt").Return([]byte("invalid_count"), nil)
				},
				expectError:         true,
				expectedErrorString: "failed to convert non-verified transactions count",
			},
			{
				name: "Failure - PutPrivateData error",
				setupMocks: func(
					ctx *mocks.MockTransactionContext,
					clientIdentity *mocks.MockClientIdentity,
					stub *mocks.MockStub,
					contract *chaincode.AssetTransferContract,
				) {
					ctx.On("GetClientIdentity").Return(clientIdentity)
					clientIdentity.On("GetMSPID").Return("Org1MSP", nil)
		
					ctx.On("GetStub").Return(stub)
		
					asset := chaincode.Asset{ID: "asset1"}
					proposal := chaincode.Proposal{
						ID:        "proposal1",
						Seller:    "Org1MSP",
						Buyer:     "Org2MSP",
						AssetID:   "asset1",
						AssetHash: "somehash",
					}
					assetJSON, _ := json.Marshal(asset)
					proposalJSON, _ := json.Marshal(proposal)
					transientMap := map[string][]byte{
						"asset":    assetJSON,
						"proposal": proposalJSON,
					}
					stub.On("GetTransient").Return(transientMap, nil)
		
					// Mock VerifyAssetProperties and VerifyProposalProperties to return true
					assetVerifier := new(mocks.MockAssetVerifier)
					proposalVerifier := new(mocks.MockProposalVerifier)
					contract.AssetVerifier = assetVerifier
					contract.ProposalVerifier = proposalVerifier
		
					assetVerifier.On(
						"VerifyAssetProperties",
						ctx,
						"asset1",
						"Org1MSP",
						"somehash",
					).Return(true, nil)
		
					proposalVerifier.On(
						"VerifyProposalProperties",
						ctx,
						"proposal1",
						"Org1MSP",
						"Org2MSP",
					).Return(true, nil)
		
					// Mock GetTxTimestamp
					txTime := &timestamp.Timestamp{Seconds: time.Now().Unix(), Nanos: 0}
					stub.On("GetTxTimestamp").Return(txTime, nil)
		
					// Mock GetPrivateData
					stub.On("GetPrivateData", "_implicit_org_Org1MSP", "nvt").Return([]byte("0"), nil)
		
					// Mock PutPrivateData for updating verified transactions
					stub.On("PutPrivateData", "_implicit_org_Org1MSP", "Verified_Transactions", []byte("1")).Return(nil)
		
					// Mock PrivateDataWriter
					privateDataWriter := new(mocks.MockPrivateDataWriter)
					contract.PrivateDataWriter = privateDataWriter
		
					// Mock PutPrivateData to return an error
					privateDataWriter.On(
						"PutPrivateData",
						ctx,
						"_implicit_org_Org1MSP",
						mock.AnythingOfType("string"),
						mock.Anything,
					).Return(fmt.Errorf("PutPrivateData error")).Once()
				},
				expectError:         true,
				expectedErrorString: "failed to put private data",
			},
		}
		
    

    for _, tc := range testCases {
        t.Run(tc.name, func(t *testing.T) {
            // Create mocks
            ctx := new(mocks.MockTransactionContext)
            clientIdentity := new(mocks.MockClientIdentity)
            stub := new(mocks.MockStub)
            getter := new(mocks.MockProposalGetter)
            matcher := new(mocks.MockProposalMatcher)
            assetVerifier := new(mocks.MockAssetVerifier)
            proposalVerifier := new(mocks.MockProposalVerifier)

            // Create an instance of your contract with the mocks injected
            contract := &chaincode.AssetTransferContract{
                ProposalGetter:    getter,
                ProposalMatcher:   matcher,
                AssetVerifier:     assetVerifier,
                ProposalVerifier:  proposalVerifier,
            }

            // Set up mocks
            tc.setupMocks(ctx, clientIdentity, stub, contract)

            // Call the method under test
            err := contract.TransferAsset(ctx)

            // Assertions
            if tc.expectError {
                assert.Error(t, err)
                assert.Contains(t, err.Error(), tc.expectedErrorString)
            } else {
                assert.NoError(t, err)
            }

            // Assert expectations
            ctx.AssertExpectations(t)
            clientIdentity.AssertExpectations(t)
            stub.AssertExpectations(t)
            getter.AssertExpectations(t)
            matcher.AssertExpectations(t)
            assetVerifier.AssertExpectations(t)
            proposalVerifier.AssertExpectations(t)
        })
    }
}
