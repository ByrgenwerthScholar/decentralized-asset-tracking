package mocks

import (
	"github.com/stretchr/testify/mock"
	"github.com/hyperledger/fabric-chaincode-go/pkg/cid"
	"crypto/x509"
)

type MockClientIdentity struct {
	mock.Mock
}

var _ cid.ClientIdentity = (*MockClientIdentity)(nil) // This ensures that MockClientIdentity implements cid.ClientIdentity

func (m *MockClientIdentity) GetID() (string, error) {
	args := m.Called()
	return args.String(0), args.Error(1)
}

func (m *MockClientIdentity) GetMSPID() (string, error) {
	args := m.Called()
	return args.String(0), args.Error(1)
}

func (m *MockClientIdentity) GetAttributeValue(attrName string) (value string, found bool, err error) {
	args := m.Called(attrName)
	return args.String(0), args.Bool(1), args.Error(2)
}

func (m *MockClientIdentity) AssertAttributeValue(attrName string, attrValue string) error {
	args := m.Called(attrName, attrValue)
	return args.Error(0)
}

func (m *MockClientIdentity) GetX509Certificate() (*x509.Certificate, error) {
	args := m.Called()
	return args.Get(0).(*x509.Certificate), args.Error(1)
}
