package main

import (
    "log"

    "asset_chaincode/chaincode" // Replace with your module path
    "github.com/hyperledger/fabric-contract-api-go/contractapi"
)

func main() {
    assetTransferContract := chaincode.NewAssetTransferContract()
    chaincode, err := contractapi.NewChaincode(assetTransferContract)
    if err != nil {
        log.Panicf("Error creating asset transfer chaincode: %v", err)
    }

    if err := chaincode.Start(); err != nil {
        log.Panicf("Error starting asset transfer chaincode: %v", err)
    }
}