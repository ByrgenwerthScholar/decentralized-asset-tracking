package mocks

import (
	"github.com/hyperledger/fabric-chaincode-go/shim"
	"github.com/stretchr/testify/mock"
	"github.com/hyperledger/fabric-chaincode-go/pkg/cid"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type MockTransactionContext struct {
	mock.Mock
}

func (m *MockTransactionContext) GetStub() shim.ChaincodeStubInterface {
	args := m.Called()
	return args.Get(0).(shim.ChaincodeStubInterface)
}

func (m *MockTransactionContext) GetClientIdentity() cid.ClientIdentity {
	args := m.Called()
	return args.Get(0).(cid.ClientIdentity)
}

func (m *MockTransactionContext) GetData(key string) (string, bool) {
	args := m.Called(key)
	return args.String(0), args.Bool(1)
}

func (m *MockTransactionContext) SetData(key string, value string) {
	m.Called(key, value)
}

var _ contractapi.TransactionContextInterface = (*MockTransactionContext)(nil)