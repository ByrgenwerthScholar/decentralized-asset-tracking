package chaincode

import (
    "crypto/sha256"
    "encoding/hex"
    "fmt"
    "math/big"

    "github.com/ethereum/go-ethereum/crypto/bn256"
    "github.com/hyperledger/fabric-chaincode-go/shim"
    pb "github.com/hyperledger/fabric-protos-go/peer"
)

// Init is called during chaincode instantiation to initialize any data
func (c *CryptoChaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {
    fmt.Println("Chaincode instantiated successfully.")
    return shim.Success([]byte("Initialized Successfully!"))
}

// Invoke routes to the appropriate function based on the function name
func (c *CryptoChaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
    function, args := stub.GetFunctionAndParameters()
    fmt.Printf("Invoke function: %s with args: %v\n", function, args)

    switch function {
    case "createNewAccumulator":
        g1Hex, err := c.CreateNewAccumulator(stub)
        if err != nil {
            return shim.Error(err.Error())
        }
        return shim.Success([]byte(g1Hex))

    case "addToAccumulator":
        if len(args) < 2 {
            return shim.Error("addToAccumulator expects two arguments: accumulatorHex and data")
        }

        accumulatorHex := args[0]
        data := args[1]
        updatedAccumulatorHex, err := c.AddToAccumulator(stub, accumulatorHex, data)
        if err != nil {
            return shim.Error(err.Error())
        }
        return shim.Success([]byte(updatedAccumulatorHex))

    default:
        return shim.Error(fmt.Sprintf("No function named %s in this chaincode.", function))
    }
}

// CreateNewAccumulator initializes a new accumulator and stores g2 in the ledger
func (c *CryptoChaincode) CreateNewAccumulator(stub shim.ChaincodeStubInterface) (string, error) {
    // Initialize g1 and g2 to zero (identity elements)
    g1 := new(bn256.G1)
    g2 := new(bn256.G2)

    g1Hex := serializeAccumulatorG1(g1)
    g2Hex := serializeAccumulatorG2(g2)

    // Store g2Hex in the ledger under key 'g2'
    err := stub.PutState("g2", []byte(g2Hex))
    if err != nil {
        return "", fmt.Errorf("error storing g2 accumulator in cryptoChaincode: %v", err)
    }
    fmt.Println("Successfully created new accumulator.")
    return g1Hex, nil
}

// AddToAccumulator adds data to the accumulator and returns the updated accumulator
func (c *CryptoChaincode) AddToAccumulator(stub shim.ChaincodeStubInterface, accumulatorHex string, data string) (string, error) {
    fmt.Printf("Adding to accumulator... accumulatorHex: %s, data: %s\n", accumulatorHex, data)

    newEntry, err := hashToG1(data)
    if err != nil {
        return "", fmt.Errorf("failed to hash data to G1: %v", err)
    }

    accumulator, err := deserializeAccumulatorG1(accumulatorHex)
    if err != nil {
        return "", fmt.Errorf("failed to deserialize accumulator: %v", err)
    }

    newAccumulator := new(bn256.G1).Add(accumulator, newEntry)

    newAccumulatorHex := serializeAccumulatorG1(newAccumulator)
    return newAccumulatorHex, nil
}

// serializeAccumulatorG1 serializes a G1 accumulator to a hex string
func serializeAccumulatorG1(accumulator *bn256.G1) string {
    bytes := accumulator.Marshal()
    return hex.EncodeToString(bytes)
}

// serializeAccumulatorG2 serializes a G2 accumulator to a hex string
func serializeAccumulatorG2(accumulator *bn256.G2) string {
    bytes := accumulator.Marshal()
    return hex.EncodeToString(bytes)
}

// deserializeAccumulatorG1 deserializes a hex string into a G1 accumulator
func deserializeAccumulatorG1(serializedData string) (*bn256.G1, error) {
    bytes, err := hex.DecodeString(serializedData)
    if err != nil {
        return nil, err
    }
    accumulator := new(bn256.G1)
    _, err = accumulator.Unmarshal(bytes)
    if err != nil {
        return nil, err
    }
    return accumulator, nil
}

// hashToG1 hashes data into a G1 element
func hashToG1(data string) (*bn256.G1, error) {
    // Hash the data to an integer scalar
    hash := sha256.Sum256([]byte(data))
    scalar := new(big.Int).SetBytes(hash[:])

    // Multiply the base point by the scalar
    point := new(bn256.G1).ScalarBaseMult(scalar)
    return point, nil
}

// main starts up the chaincode in the container during instantiate
func main() {
    err := shim.Start(new(CryptoChaincode))
    if err != nil {
        fmt.Printf("Error starting CryptoChaincode: %s", err)
    }
}
