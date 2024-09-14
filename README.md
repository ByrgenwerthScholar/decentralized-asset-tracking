# Asset Transfer Chaincode for Hyperledger Fabric

## Overview

This project is a **Hyperledger Fabric chaincode** designed for managing asset transfers between organizations. The chaincode enables secure proposals, acceptance, and verification of asset transfers while utilizing **private data collections** for maintaining asset details and ownership.

The main features include:
- Creation of proposals for asset transfers between organizations.
- Secure verification of asset properties using cryptographic hashing.
- Storing asset details and transfer history in private collections to ensure privacy between organizations.
- Event-driven notifications on successful transactions.
  
This project is still **a work in progress** and is not yet ready for easy installation.

## Features

- **Chaincode Functions**:
    - **InitLedger**: Initializes the ledger with sample assets and sets up the private collections.
    - **AcceptProposal**: Allows the buyer to accept a proposal after verifying asset details.
    - **CheckProposalAccepted**: Checks if a proposal has been accepted by verifying transaction details.
    - **VerifyAssetProperties**: Ensures that the asset data is valid using a cryptographic hash.
  
- **Private Data Handling**: The chaincode stores sensitive information such as asset details and ownership in **private data collections**, ensuring that only the involved parties can access specific data.

- **Event Management**: Emission of chaincode events upon successful transactions, allowing external applications to listen and react to asset transfers.

## Usage

The chaincode is primarily designed to be deployed on a **Hyperledger Fabric** network. It allows organizations to securely propose and accept asset transfers while ensuring that only the concerned organizations have access to sensitive information about the assets.

**Key Chaincode Methods**:
- **InitLedger**: Initializes the ledger and creates sample assets.
- **AcceptProposal**: Buyers can accept proposals made by sellers.
- **CheckProposalAccepted**: Check the status of a proposal to ensure it has been accepted.

## Testing

The project includes comprehensive unit tests using the **Go testing framework** and **Testify** for mocking Fabric interactions.

The tests cover:
- Success scenarios for chaincode functions.
- Handling of errors in private data interactions.
- Proper event emission on successful transactions.

**Note**: The current test coverage is a work in progress and will be improved as the project evolves.

## Future Work

- **Installation**: The project is not yet ready for easy installation, but it is under active development.
- **Integration Testing**: We plan to add full integration tests with a Hyperledger Fabric network.
- **Improved Documentation**: Further documentation on deploying and using the chaincode will be added in the near future.

## Contact

For any questions or inquiries regarding this project, feel free to reach out.

