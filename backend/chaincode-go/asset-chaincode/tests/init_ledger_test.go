package chaincode

import (
	"testing"
	"time"
	"fmt"
	"asset_chaincode/chaincode"
	"asset_chaincode/mocks"
	"github.com/golang/protobuf/ptypes/timestamp"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/hyperledger/fabric-protos-go/peer"
)

// TestInitLedgerSuccess tests successful initialization of the ledger
func TestInitLedger(t *testing.T) {
	// Create the mocks
	ctx := new(mocks.MockTransactionContext)
	stub := new(mocks.MockStub)
	clientIdentity := new(mocks.MockClientIdentity)
	
	// Set up mock context
	ctx.On("GetStub").Return(stub)
	ctx.On("GetClientIdentity").Return(clientIdentity)
	clientIdentity.On("GetMSPID").Return("Org1MSP", nil)

	// Timestamp mock
	timestamp := &timestamp.Timestamp{
		Seconds: time.Now().Unix(),
		Nanos:   0,
}

	// Mock responses for InvokeChaincode
	stub.On("InvokeChaincode", "crypto", mock.Anything, "mychannel").Return(peer.Response{
		Status:  200,
		Payload: []byte("newAccumulator"),
	}, nil)

	stub.On("GetTxTimestamp").Return(timestamp, nil)
	// Mock for general PutPrivateData calls for assets and history
	stub.On("PutPrivateData", "_implicit_org_Org1MSP", mock.AnythingOfType("string"), mock.AnythingOfType("[]uint8")).Return(nil)

	// Specific mock for the final call where "nvt" is used as the key
	stub.On("PutPrivateData", "_implicit_org_Org1MSP", "nvt", []byte("0")).Return(nil)


	contract := new(chaincode.AssetTransferContract)
	err := contract.InitLedger(ctx)

	assert.NoError(t, err, "InitLedger should not return an error")
	stub.AssertNumberOfCalls(t, "InvokeChaincode", 20) // 10 for createNewAccumulator and 10 for addToAccumulator
	stub.AssertCalled(t, "PutPrivateData", "_implicit_org_Org1MSP", "nvt", []byte("0"))
}

// TestInitLedgerChaincodeInvocationFailure tests failure in chaincode invocation
func TestInitLedgerChaincodeInvocationFailure(t *testing.T) {
	// Create the mocks
	ctx := new(mocks.MockTransactionContext)
	stub := new(mocks.MockStub)
	clientIdentity := new(mocks.MockClientIdentity)
	
	// Set up mock context
	ctx.On("GetStub").Return(stub)
	ctx.On("GetClientIdentity").Return(clientIdentity)
	clientIdentity.On("GetMSPID").Return("Org1MSP", nil)

	// Timestamp mock
	timestamp := &timestamp.Timestamp{
		Seconds: time.Now().Unix(),
		Nanos:   0,
	}

	// Simulate failure in InvokeChaincode
	stub.On("InvokeChaincode", "crypto", mock.Anything, "mychannel").Return(peer.Response{
		Status:  500, // Non-success status
		Message: "Chaincode invocation failed",
	}, nil)

	stub.On("GetTxTimestamp").Return(timestamp, nil)

	contract := new(chaincode.AssetTransferContract)
	err := contract.InitLedger(ctx)

	assert.Error(t, err, "InitLedger should return an error if chaincode invocation fails")
	assert.Contains(t, err.Error(), "Chaincode invocation failed", "Error should contain the message from the failed chaincode invocation")
}

// TestInitLedgerPrivateDataStorage tests the correct storage of private data
func TestInitLedgerPrivateDataStorage(t *testing.T) {
	// Create the mocks
	ctx := new(mocks.MockTransactionContext)
	stub := new(mocks.MockStub)
	clientIdentity := new(mocks.MockClientIdentity)
	
	// Set up mock context
	ctx.On("GetStub").Return(stub)
	ctx.On("GetClientIdentity").Return(clientIdentity)
	clientIdentity.On("GetMSPID").Return("Org1MSP", nil)

	// Timestamp mock
	timestamp := &timestamp.Timestamp{
		Seconds: time.Now().Unix(),
		Nanos:   0,
	}

	// Mock responses for InvokeChaincode
	stub.On("InvokeChaincode", "crypto", mock.Anything, "mychannel").Return(peer.Response{
		Status:  200,
		Payload: []byte("newAccumulator"),
	}, nil)

	stub.On("GetTxTimestamp").Return(timestamp, nil)
	stub.On("PutPrivateData", "_implicit_org_Org1MSP", mock.AnythingOfType("string"), mock.AnythingOfType("[]uint8")).Return(nil)
	stub.On("PutPrivateData", "_implicit_org_Org1MSP", "nvt", []byte("0")).Return(nil)

	contract := new(chaincode.AssetTransferContract)
	err := contract.InitLedger(ctx)

	assert.NoError(t, err, "InitLedger should not return an error")

	// Verify that the data was stored correctly
	stub.AssertCalled(t, "PutPrivateData", "_implicit_org_Org1MSP", mock.MatchedBy(func(key string) bool {
		return len(key) > 0
	}), mock.AnythingOfType("[]uint8"))
}

func TestInitLedgerInvokeChaincodeFailure(t *testing.T) {
	// Setup mocks
	ctx := new(mocks.MockTransactionContext)
	stub := new(mocks.MockStub)
	clientIdentity := new(mocks.MockClientIdentity)

	// Set up mock context
	ctx.On("GetStub").Return(stub)
	ctx.On("GetClientIdentity").Return(clientIdentity)
	clientIdentity.On("GetMSPID").Return("Org1MSP", nil)
	timestamp := &timestamp.Timestamp{
		Seconds: time.Now().Unix(),
		Nanos:   0,
}
stub.On("GetTxTimestamp").Return(timestamp, nil)

	// Mock a failure in InvokeChaincode
	stub.On("InvokeChaincode", "crypto", mock.Anything, "mychannel").Return(peer.Response{
			Status:  500, // Simulate an error
			Message: "Chaincode invocation failed",
	}, nil)

	contract := new(chaincode.AssetTransferContract)
	err := contract.InitLedger(ctx)

	// Assert that it returns an error
	assert.Error(t, err, "InitLedger should return an error if InvokeChaincode fails")
	assert.Contains(t, err.Error(), "Chaincode invocation failed")
}

func TestInitLedgerPutPrivateDataFailure(t *testing.T) {
	ctx := new(mocks.MockTransactionContext)
	stub := new(mocks.MockStub)
	clientIdentity := new(mocks.MockClientIdentity)

	ctx.On("GetStub").Return(stub)
	ctx.On("GetClientIdentity").Return(clientIdentity)
	clientIdentity.On("GetMSPID").Return("Org1MSP", nil)
	timestamp := &timestamp.Timestamp{
		Seconds: time.Now().Unix(),
		Nanos:   0,
}
stub.On("GetTxTimestamp").Return(timestamp, nil)
stub.On("InvokeChaincode", "crypto", mock.Anything, "mychannel").Return(peer.Response{
	Status:  200,
	Payload: []byte("newAccumulator"),
}, nil)

	// Mock a failure in PutPrivateData
	stub.On("PutPrivateData", mock.AnythingOfType("string"), mock.AnythingOfType("string"), mock.AnythingOfType("[]uint8")).
			Return(fmt.Errorf("PutPrivateData failed"))

	contract := new(chaincode.AssetTransferContract)
	err := contract.InitLedger(ctx)

	// Assert that it returns an error
	assert.Error(t, err, "InitLedger should return an error if PutPrivateData fails")
	assert.Contains(t, err.Error(), "PutPrivateData failed")
}
