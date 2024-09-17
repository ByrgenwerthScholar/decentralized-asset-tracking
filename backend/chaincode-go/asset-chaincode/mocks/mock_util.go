package mocks

import (
	"asset_chaincode/chaincode"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
	"github.com/stretchr/testify/mock"
)

type MockProposalGetter struct {
	mock.Mock
}

func (m *MockProposalGetter) GetProposal(ctx contractapi.TransactionContextInterface, id string) (*chaincode.Proposal, error) {
	args := m.Called(ctx, id)
	if args.Get(0) != nil {
			proposal := args.Get(0).(*chaincode.Proposal)
			return proposal, args.Error(1)
	}
	return nil, args.Error(1)
}

type MockProposalMatcher struct {
	mock.Mock
}

func (m *MockProposalMatcher) ProposalsMatch(ctx contractapi.TransactionContextInterface, id, seller, buyer string) (bool, error) {
	args := m.Called(ctx, id, seller, buyer)
	return args.Bool(0), args.Error(1)
}

type MockAssetVerifier struct {
	mock.Mock
}

func (m *MockAssetVerifier) VerifyAssetProperties(ctx contractapi.TransactionContextInterface, assetID, owner, assetHash string) (bool, error) {
	args := m.Called(ctx, assetID, owner, assetHash)
	return args.Bool(0), args.Error(1)
}

type MockProposalVerifier struct {
	mock.Mock
}

func (m *MockProposalVerifier) VerifyProposalProperties(ctx contractapi.TransactionContextInterface, proposalID, seller, buyer string) (bool, error) {
	args := m.Called(ctx, proposalID, seller, buyer)
	return args.Bool(0), args.Error(1)
}

type MockPrivateDataWriter struct {
	mock.Mock
}

func (m *MockPrivateDataWriter) PutPrivateData(ctx contractapi.TransactionContextInterface, collection, key string, data interface{}) error {
	args := m.Called(ctx, collection, key, data)
	return args.Error(0)
}


