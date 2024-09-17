package mocks

import (
    "github.com/stretchr/testify/mock"
    "github.com/hyperledger/fabric-protos-go/peer"
		"github.com/hyperledger/fabric-chaincode-go/shim"
    "github.com/golang/protobuf/ptypes/timestamp"
)

// MockStub is a mock implementation of the StubInterface.
type MockStub struct {
    mock.Mock
}

func (m *MockStub) GetTransient() (map[string][]byte, error) {
	args := m.Called()
	var transientMap map[string][]byte
	if args.Get(0) != nil {
			transientMap = args.Get(0).(map[string][]byte)
	}
	return transientMap, args.Error(1)
}


func (m *MockStub) GetTxTimestamp() (*timestamp.Timestamp, error) {
	args := m.Called()
	var ts *timestamp.Timestamp
	if args.Get(0) != nil {
			ts = args.Get(0).(*timestamp.Timestamp)
	}
	return ts, args.Error(1)
}

func (m *MockStub) GetPrivateData(collection string, key string) ([]byte, error) {
	args := m.Called(collection, key)
	var data []byte
	if args.Get(0) != nil {
			data = args.Get(0).([]byte)
	}
	return data, args.Error(1)
}

func (m *MockStub) GetPrivateDataHash(collection string, key string) ([]byte, error) {
    args := m.Called(collection, key)
    return args.Get(0).([]byte), args.Error(1)
}

func (m *MockStub) PutPrivateData(collection string, key string, value []byte) error {
    args := m.Called(collection, key, value)
    return args.Error(0)
}

func (m *MockStub) DelPrivateData(collection string, key string) error {
    args := m.Called(collection, key)
    return args.Error(0)
}

func (m *MockStub) SetEvent(name string, payload []byte) error {
    args := m.Called(name, payload)
    return args.Error(0)
}

func (m *MockStub) InvokeChaincode(chaincodeName string, args [][]byte, channel string) peer.Response {
    result := m.Called(chaincodeName, args, channel)
    return result.Get(0).(peer.Response)
}

func (m *MockStub) GetStateByRange(startKey, endKey string) (shim.StateQueryIteratorInterface, error) {
    args := m.Called(startKey, endKey)
    return args.Get(0).(shim.StateQueryIteratorInterface), args.Error(1)
}

func (m *MockStub) CreateCompositeKey(objectType string, attributes []string) (string, error) {
	args := m.Called(objectType, attributes)
	return args.String(0), args.Error(1)
}

func (m *MockStub) GetState(key string) ([]byte, error) {
	args := m.Called(key)
	return args.Get(0).([]byte), args.Error(1)
}

func (m *MockStub) PutState(key string, value []byte) error {
	args := m.Called(key, value)
	return args.Error(0)
}

func (m *MockStub) DelState(key string) error {
	args := m.Called(key)
	return args.Error(0)
}

func (m *MockStub) GetArgs() [][]byte {
	args := m.Called()
	return args.Get(0).([][]byte)
}

func (m *MockStub) GetArgsSlice() ([]byte, error) {
	args := m.Called()
	return args.Get(0).([]byte), args.Error(1)
}

func (m *MockStub) GetBinding() ([]byte, error) {
	args := m.Called()
	return args.Get(0).([]byte), args.Error(1)
}

func (m *MockStub) GetChannelID() string {
	args := m.Called()
	return args.String(0)
}

func (m *MockStub) GetCreator() ([]byte, error) {
	args := m.Called()
	return args.Get(0).([]byte), args.Error(1)
}

func (m *MockStub) GetDecorations() map[string][]byte {
	args := m.Called()
	return args.Get(0).(map[string][]byte)
}

func (m *MockStub) GetFunctionAndParameters() (string, []string) {
	args := m.Called()
	return args.String(0), args.Get(1).([]string)
}

func (m *MockStub) GetHistoryForKey(key string) (shim.HistoryQueryIteratorInterface, error) {
	args := m.Called(key)
	return args.Get(0).(shim.HistoryQueryIteratorInterface), args.Error(1)
}

func (m *MockStub) GetPrivateDataQueryResult(collection, query string) (shim.StateQueryIteratorInterface, error) {
	args := m.Called(collection, query)
	return args.Get(0).(shim.StateQueryIteratorInterface), args.Error(1)
}

func (m *MockStub) GetStateByPartialCompositeKey(objectType string, keys []string) (shim.StateQueryIteratorInterface, error) {
	args := m.Called(objectType, keys)
	return args.Get(0).(shim.StateQueryIteratorInterface), args.Error(1)
}

func (m *MockStub) GetPrivateDataByRange(collection, startKey, endKey string) (shim.StateQueryIteratorInterface, error) {
	args := m.Called(collection, startKey, endKey)
	return args.Get(0).(shim.StateQueryIteratorInterface), args.Error(1)
}

func (m *MockStub) GetPrivateDataByPartialCompositeKey(collection, objectType string, keys []string) (shim.StateQueryIteratorInterface, error) {
	args := m.Called(collection, objectType, keys)
	return args.Get(0).(shim.StateQueryIteratorInterface), args.Error(1)
}

func (m *MockStub) GetPrivateDataQueryResultWithPagination(collection, query string, pageSize int32, bookmark string) (shim.StateQueryIteratorInterface, *peer.QueryResponseMetadata, error) {
	args := m.Called(collection, query, pageSize, bookmark)
	return args.Get(0).(shim.StateQueryIteratorInterface), args.Get(1).(*peer.QueryResponseMetadata), args.Error(2)
}

func (m *MockStub) GetStateByRangeWithPagination(startKey, endKey string, pageSize int32, bookmark string) (shim.StateQueryIteratorInterface, *peer.QueryResponseMetadata, error) {
	args := m.Called(startKey, endKey, pageSize, bookmark)
	return args.Get(0).(shim.StateQueryIteratorInterface), args.Get(1).(*peer.QueryResponseMetadata), args.Error(2)
}

func (m *MockStub) GetStateByPartialCompositeKeyWithPagination(objectType string, keys []string, pageSize int32, bookmark string) (shim.StateQueryIteratorInterface, *peer.QueryResponseMetadata, error) {
	args := m.Called(objectType, keys, pageSize, bookmark)
	return args.Get(0).(shim.StateQueryIteratorInterface), args.Get(1).(*peer.QueryResponseMetadata), args.Error(2)
}

func (m *MockStub) GetPrivateDataValidationParameter(collection string, key string) ([]byte, error) {
	args := m.Called(collection, key)
	return args.Get(0).([]byte), args.Error(1)
}

func (m *MockStub) GetQueryResult(query string) (shim.StateQueryIteratorInterface, error) {
	args := m.Called(query)
	return args.Get(0).(shim.StateQueryIteratorInterface), args.Error(1)
}

func (m *MockStub) GetQueryResultWithPagination(query string, pageSize int32, bookmark string) (shim.StateQueryIteratorInterface, *peer.QueryResponseMetadata, error) {
	args := m.Called(query, pageSize, bookmark)
	return args.Get(0).(shim.StateQueryIteratorInterface), args.Get(1).(*peer.QueryResponseMetadata), args.Error(2)
}

func (m *MockStub) GetSignedProposal() (*peer.SignedProposal, error) {
	args := m.Called()
	return args.Get(0).(*peer.SignedProposal), args.Error(1)
}	

func (m *MockStub) GetStateValidationParameter(key string) ([]byte, error) {
	args := m.Called(key)
	return args.Get(0).([]byte), args.Error(1)
}

func (m *MockStub) GetStringArgs() []string {
	args := m.Called()
	return args.Get(0).([]string)
}	

func (m *MockStub) GetTxID() string {
	args := m.Called()
	return args.String(0)
}

func (m *MockStub) PurgePrivateData(collection string, key string) error {
	args := m.Called(collection, key)
	return args.Error(0)
}

func (m *MockStub) SetStateValidationParameter(key string, ep []byte) error {
	args := m.Called(key, ep)
	return args.Error(0)
}

func (m *MockStub) SetPrivateDataValidationParameter(collection string, key string, ep []byte) error {
	args := m.Called(collection, key, ep)
	return args.Error(0)
}

func (m *MockStub) SplitCompositeKey(compositeKey string) (string, []string, error) {
	args := m.Called(compositeKey)
	return args.String(0), args.Get(1).([]string), args.Error(2)
}

var _ shim.ChaincodeStubInterface = (*MockStub)(nil)
// And so on...

