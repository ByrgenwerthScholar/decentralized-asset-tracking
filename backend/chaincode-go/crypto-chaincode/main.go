package main

import (
    "fmt"

    "github.com/hyperledger/fabric-chaincode-go/shim"
    "crypto-chaincode/chaincode" 
)

func main() {
    err := shim.Start(new(chaincode.CryptoChaincode))
    if err != nil {
        fmt.Printf("Error starting CryptoChaincode: %s", err)
    }
}
