package chaincode

import (
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// Proposal represents a proposal in the blockchain
type Proposal struct {
	ID        string `json:"id"`
	Date      string `json:"date"`
	AssetID   string `json:"assetId"`
	Seller    string `json:"seller"`
	Buyer     string `json:"buyer"`
	Model     string `json:"model"`
	Size      string `json:"size"`
	Accepted  bool   `json:"accepted"`
	AssetHash string `json:"assetHash"`
}

// Asset represents an asset in the blockchain
type Asset struct {
	ID          string `json:"id"`
	Model       string `json:"model"`
	Size        string   `json:"size"`
	Accumulator string `json:"accumulator"`
}

// History represents the history of an asset
type History struct {
	ID     string `json:"id"`
	Type  string `json:"type"`
	Record interface{} `json:"record"`
}

// AddRecord represents a record of an asset addition
type AddRecord struct {
	AssetID string `json:"assetId"`
	Org    string `json:"org"`
	Date   string `json:"date"`
}

// TransactionRecord represents a record of an asset transaction
type TransactionRecord struct {
	FromOrg string `json:"fromOrg"`
	ToOrg   string `json:"toOrg"`
	Model   string `json:"model"`
	Size    string    `json:"size"`
	Date    string `json:"date"`
	Verified bool  `json:"verified"`
}

// DeleteRecord represents a record of an asset deletion
type DeleteRecord struct {
	ID   string `json:"id"`
	Org  string `json:"org"`
	Date string `json:"date"`
}

// In your chaincode package
type ProposalGetter interface {
	GetProposal(ctx contractapi.TransactionContextInterface, id string) (*Proposal, error)
}

type ProposalMatcher interface {
	ProposalsMatch(ctx contractapi.TransactionContextInterface, id, seller, buyer string) (bool, error)
}


