package mocks

import (
    "github.com/stretchr/testify/mock"
    "github.com/hyperledger/fabric-protos-go/ledger/queryresult"
)

// MockStateQueryIterator is a mock implementation of the StateQueryIteratorInterface.
type MockStateQueryIterator struct {
    mock.Mock
}

func (m *MockStateQueryIterator) HasNext() bool {
    args := m.Called()
    return args.Bool(0)
}

func (m *MockStateQueryIterator) Next() (*queryresult.KV, error) {
    args := m.Called()
    return args.Get(0).(*queryresult.KV), args.Error(1)
}

func (m *MockStateQueryIterator) Close() error {
    args := m.Called()
    return args.Error(0)
}
