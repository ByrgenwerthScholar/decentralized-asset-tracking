package chaincode

import (
    "encoding/json"
    "testing"
    "time"
		"fmt"
    "github.com/golang/protobuf/ptypes/timestamp"
    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/mock"
    "asset_chaincode/chaincode"
    "asset_chaincode/mocks"
)

func TestInitTransaction(t *testing.T) {
	// Create the mocks
	ctx := new(mocks.MockTransactionContext)
	stub := new(mocks.MockStub)
	clientIdentity := new(mocks.MockClientIdentity)
	
	// Set up mock context
	ctx.On("GetStub").Return(stub)
	ctx.On("GetClientIdentity").Return(clientIdentity)
	clientIdentity.On("GetMSPID").Return("Org1MSP", nil)

	// Test data
	asset := chaincode.Asset{
			ID:          "asset1",
			Model:       "ModelX",
			Size:        "100",
			Accumulator: "accumulator1",
	}
	assetJSON, _ := json.Marshal(asset)
	transientMap := map[string][]byte{
			"asset": assetJSON,
			"msp":   []byte("Org2MSP"),
	}

	// Timestamp mock
	timestamp := &timestamp.Timestamp{
			Seconds: time.Now().Unix(),
			Nanos:   0,
	}

	// Set up mock expectations
	stub.On("GetTransient").Return(transientMap, nil)
	stub.On("GetTxTimestamp").Return(timestamp, nil)
	stub.On("GetPrivateDataHash", "_implicit_org_Org1MSP", "asset1").Return([]byte("assetHash"), nil)
	stub.On("PutPrivateData", "_implicit_org_Org1MSP", mock.AnythingOfType("string"), mock.Anything).Return(nil)
	stub.On("PutPrivateData", "_implicit_org_Org2MSP", mock.AnythingOfType("string"), mock.Anything).Return(nil)
	stub.On("SetEvent", "ProposalForOrg2MSP", mock.Anything).Return(nil)  // Use mock.Anything here for the event payload

	contract := new(chaincode.AssetTransferContract)
	err := contract.InitTransaction(ctx)

	assert.NoError(t, err, "InitTransaction should not return an error")
	stub.AssertCalled(t, "PutPrivateData", "_implicit_org_Org1MSP", mock.AnythingOfType("string"), mock.Anything)
	stub.AssertCalled(t, "PutPrivateData", "_implicit_org_Org2MSP", mock.AnythingOfType("string"), mock.Anything)
	stub.AssertCalled(t, "SetEvent", "ProposalForOrg2MSP", mock.Anything)  // Also adjust the assertion
}

func TestInitTransactionFailedClientIdentity(t *testing.T) {
	ctx := new(mocks.MockTransactionContext)
	stub := new(mocks.MockStub)
	clientIdentity := new(mocks.MockClientIdentity)

	ctx.On("GetStub").Return(stub)
	ctx.On("GetClientIdentity").Return(clientIdentity)
	
	// Simulate client identity error
	clientIdentity.On("GetMSPID").Return("", fmt.Errorf("client identity error"))

	contract := new(chaincode.AssetTransferContract)
	err := contract.InitTransaction(ctx)

	assert.Error(t, err, "InitTransaction should return an error if GetMSPID fails")
	assert.Contains(t, err.Error(), "failed to get client identity")
}

func TestInitTransactionFailedGetTransient(t *testing.T) {
	ctx := new(mocks.MockTransactionContext)
	stub := new(mocks.MockStub)
	clientIdentity := new(mocks.MockClientIdentity)
	
	
	ctx.On("GetStub").Return(stub)
	ctx.On("GetClientIdentity").Return(clientIdentity)
	clientIdentity.On("GetMSPID").Return("Org1MSP", nil)
	
	// Simulate transient data error
	stub.On("GetTransient").Return(map[string][]byte{}, fmt.Errorf("transient data error"))

	contract := new(chaincode.AssetTransferContract)
	err := contract.InitTransaction(ctx)

	assert.Error(t, err, "InitTransaction should return an error if GetTransient fails")
	assert.Contains(t, err.Error(), "failed to get transient data")
}

func TestInitTransactionAssetDataNotFound(t *testing.T) {
	ctx := new(mocks.MockTransactionContext)
	stub := new(mocks.MockStub)
	
	ctx.On("GetStub").Return(stub)
	clientIdentity := new(mocks.MockClientIdentity)
	ctx.On("GetClientIdentity").Return(clientIdentity)
	clientIdentity.On("GetMSPID").Return("Org1MSP", nil)
	// Simulate transient data without "asset"
	transientMap := map[string][]byte{
			"msp": []byte("Org2MSP"),
	}
	stub.On("GetTransient").Return(transientMap, nil)

	contract := new(chaincode.AssetTransferContract)
	err := contract.InitTransaction(ctx)

	assert.Error(t, err, "InitTransaction should return an error if asset data is not found in the transient map")
	assert.Contains(t, err.Error(), "asset data not found in the transient map")
}

func TestInitTransactionFailedUnmarshalAsset(t *testing.T) {
	ctx := new(mocks.MockTransactionContext)
	stub := new(mocks.MockStub)
	
	ctx.On("GetStub").Return(stub)
	clientIdentity := new(mocks.MockClientIdentity)
	ctx.On("GetClientIdentity").Return(clientIdentity)
	clientIdentity.On("GetMSPID").Return("Org1MSP", nil)

	// Simulate invalid asset JSON
	transientMap := map[string][]byte{
			"asset": []byte("{invalid json}"),
			"msp":   []byte("Org2MSP"),
	}
	stub.On("GetTransient").Return(transientMap, nil)

	contract := new(chaincode.AssetTransferContract)
	err := contract.InitTransaction(ctx)

	assert.Error(t, err, "InitTransaction should return an error if unmarshal of asset JSON fails")
	assert.Contains(t, err.Error(), "failed to unmarshal asset JSON")
}

func TestInitTransactionBuyerMSPNotFound(t *testing.T) {
	ctx := new(mocks.MockTransactionContext)
	stub := new(mocks.MockStub)
	
	ctx.On("GetStub").Return(stub)
	clientIdentity := new(mocks.MockClientIdentity)
	ctx.On("GetClientIdentity").Return(clientIdentity)
	clientIdentity.On("GetMSPID").Return("Org1MSP", nil)

	// Simulate transient map without "msp"
	transientMap := map[string][]byte{
			"asset": []byte(`{"ID":"asset1","Model":"ModelX","Size":"100","Accumulator":"acc1"}`),
	}
	stub.On("GetTransient").Return(transientMap, nil)

	contract := new(chaincode.AssetTransferContract)
	err := contract.InitTransaction(ctx)

	assert.Error(t, err, "InitTransaction should return an error if buyer MSP is not found in the transient map")
	assert.Contains(t, err.Error(), "buyerMSP not found in the transient map")
}

func TestInitTransactionFailedGetTxTimestamp(t *testing.T) {
	ctx := new(mocks.MockTransactionContext)
	stub := new(mocks.MockStub)

	// Test data
	asset := chaincode.Asset{
		ID:          "asset1",
		Model:       "ModelX",
		Size:        "100",
		Accumulator: "accumulator1",
}
assetJSON, _ := json.Marshal(asset)
transientMap := map[string][]byte{
		"asset": assetJSON,
		"msp":   []byte("Org2MSP"),
}

timestamp := &timestamp.Timestamp{
	Seconds: time.Now().Unix(),
	Nanos:   0,
}

	
	ctx.On("GetStub").Return(stub)
	stub.On("GetTransient").Return(transientMap, nil)
	clientIdentity := new(mocks.MockClientIdentity)
	ctx.On("GetClientIdentity").Return(clientIdentity)
	clientIdentity.On("GetMSPID").Return("Org1MSP", nil)

	// Simulate timestamp error
	stub.On("GetTxTimestamp").Return(timestamp, fmt.Errorf("timestamp error"))

	contract := new(chaincode.AssetTransferContract)
	err := contract.InitTransaction(ctx)

	assert.Error(t, err, "InitTransaction should return an error if GetTxTimestamp fails")
	assert.Contains(t, err.Error(), "failed to get transaction timestamp")
}






