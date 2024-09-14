package chaincode

import (
    "fmt"
    "testing"

    "asset_chaincode/chaincode"
    "asset_chaincode/mocks"

    "github.com/stretchr/testify/assert"
)

func TestCheckProposalAccepted(t *testing.T) {
    testCases := []struct {
        name                string
        proposalIdsJSON     string
        setupMocks          func(ctx *mocks.MockTransactionContext, clientIdentity *mocks.MockClientIdentity, getter *mocks.MockProposalGetter, matcher *mocks.MockProposalMatcher)
        expectedResult      []string
        expectError         bool
        expectedErrorString string
    }{
        {
            name:            "Success - proposals accepted",
            proposalIdsJSON: `["proposal1", "proposal2"]`,
            setupMocks: func(ctx *mocks.MockTransactionContext, clientIdentity *mocks.MockClientIdentity, getter *mocks.MockProposalGetter, matcher *mocks.MockProposalMatcher) {
                // Add this line to set up the expectation
                ctx.On("GetClientIdentity").Return(clientIdentity)
                clientIdentity.On("GetMSPID").Return("Org1MSP", nil)
        
                proposal1 := &chaincode.Proposal{ID: "proposal1", Seller: "Org1MSP", Buyer: "Buyer1"}
                proposal2 := &chaincode.Proposal{ID: "proposal2", Seller: "Org1MSP", Buyer: "Buyer2"}
        
                getter.On("GetProposal", ctx, "proposal1").Return(proposal1, nil)
                getter.On("GetProposal", ctx, "proposal2").Return(proposal2, nil)
        
                matcher.On("ProposalsMatch", ctx, "proposal1", "Org1MSP", "Buyer1").Return(true, nil)
                matcher.On("ProposalsMatch", ctx, "proposal2", "Org1MSP", "Buyer2").Return(true, nil)
            },
            expectedResult: []string{"proposal1", "proposal2"},
            expectError:    false,
        },
        {
            name:            "Failure - invalid JSON",
            proposalIdsJSON: `invalid_json`,
            setupMocks: func(ctx *mocks.MockTransactionContext, clientIdentity *mocks.MockClientIdentity, getter *mocks.MockProposalGetter, matcher *mocks.MockProposalMatcher) {
                // Do not set any expectations, as the chaincode returns early
            },
            expectedResult:      nil,
            expectError:         true,
            expectedErrorString: "failed to unmarshal proposal IDs",
        },
        {
            name:            "Failure - GetMSPID error",
            proposalIdsJSON: `["proposal1"]`,
            setupMocks: func(ctx *mocks.MockTransactionContext, clientIdentity *mocks.MockClientIdentity, getter *mocks.MockProposalGetter, matcher *mocks.MockProposalMatcher) {
                ctx.On("GetClientIdentity").Return(clientIdentity)
                clientIdentity.On("GetMSPID").Return("", fmt.Errorf("GetMSPID error"))
            },
            expectedResult:      nil,
            expectError:         true,
            expectedErrorString: "failed to get client identity",
        },

        {
            name:            "Failure - GetProposal error",
            proposalIdsJSON: `["proposal1"]`,
            setupMocks: func(ctx *mocks.MockTransactionContext, clientIdentity *mocks.MockClientIdentity, getter *mocks.MockProposalGetter, matcher *mocks.MockProposalMatcher) {
                ctx.On("GetClientIdentity").Return(clientIdentity)
                clientIdentity.On("GetMSPID").Return("Org1MSP", nil)
                getter.On("GetProposal", ctx, "proposal1").Return(nil, fmt.Errorf("failed to get proposal"))
            },
            expectedResult:      nil,
            expectError:         true,
            expectedErrorString: "failed to get proposal",
        },
        
        {
            name:            "Failure - proposal seller mismatch",
            proposalIdsJSON: `["proposal1"]`,
            setupMocks: func(ctx *mocks.MockTransactionContext, clientIdentity *mocks.MockClientIdentity, getter *mocks.MockProposalGetter, matcher *mocks.MockProposalMatcher) {
                ctx.On("GetClientIdentity").Return(clientIdentity)
                clientIdentity.On("GetMSPID").Return("Org1MSP", nil)

                proposal := &chaincode.Proposal{ID: "proposal1", Seller: "Org2MSP", Buyer: "Buyer1"}
                getter.On("GetProposal", ctx, "proposal1").Return(proposal, nil)
            },
            expectedResult:      nil,
            expectError:         true,
            expectedErrorString: "proposal proposal1 can only be checked by Org2MSP",
        },

        {
            name:            "Success - ProposalsMatch returns false",
            proposalIdsJSON: `["proposal1"]`,
            setupMocks: func(ctx *mocks.MockTransactionContext, clientIdentity *mocks.MockClientIdentity, getter *mocks.MockProposalGetter, matcher *mocks.MockProposalMatcher) {
                ctx.On("GetClientIdentity").Return(clientIdentity)
                clientIdentity.On("GetMSPID").Return("Org1MSP", nil)
        
                proposal := &chaincode.Proposal{ID: "proposal1", Seller: "Org1MSP", Buyer: "Buyer1"}
                getter.On("GetProposal", ctx, "proposal1").Return(proposal, nil)
        
                matcher.On("ProposalsMatch", ctx, "proposal1", "Org1MSP", "Buyer1").Return(false, nil)
            },
            expectedResult: []string{},
            expectError:    false,
        },
        
    }

    for _, tc := range testCases {
        t.Run(tc.name, func(t *testing.T) {
            // Create mocks
            ctx := new(mocks.MockTransactionContext)
            clientIdentity := new(mocks.MockClientIdentity)
            getter := new(mocks.MockProposalGetter)
            matcher := new(mocks.MockProposalMatcher)

            // Do not set up ctx.On("GetClientIdentity") here

            // Run the setupMocks function for this test case
            tc.setupMocks(ctx, clientIdentity, getter, matcher)

            // Create an instance of your contract with the mocks injected
            contract := &chaincode.AssetTransferContract{
                ProposalGetter:  getter,
                ProposalMatcher: matcher,
            }

            // Call the method under test
            result, err := contract.CheckProposalAccepted(ctx, tc.proposalIdsJSON)

            // Assertions
            if tc.expectError {
                assert.Error(t, err)
                assert.Contains(t, err.Error(), tc.expectedErrorString)
                assert.Nil(t, result)
            } else {
                assert.NoError(t, err)
                assert.Equal(t, tc.expectedResult, result)
            }

            // Assert expectations only on mocks that had expectations set
            ctx.AssertExpectations(t)
            clientIdentity.AssertExpectations(t)
            getter.AssertExpectations(t)
            matcher.AssertExpectations(t)
        })
    }
}