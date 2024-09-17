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
  
- **Private Data Handling**: The chaincode stores sensitive information such as asset details and ownership in **private data collections**, ensuring that only the involved parties can access specific data.

- **Event Management**: Emission of chaincode events upon successful transactions, allowing external applications to listen and react to asset transfers.

## Usage

The chaincode is primarily designed to be deployed on a **Hyperledger Fabric** network. It allows organizations to securely propose and accept asset transfers while ensuring that only the concerned organizations have access to sensitive information about the assets.

## Testing

The project includes comprehensive unit tests using the **Go testing framework** and **Testify** for mocking Fabric interactions.

The tests cover:
- Success scenarios for chaincode functions.
- Handling of errors in private data interactions.
- Proper event emission on successful transactions.

**Note**: The current test coverage is a work in progress and will be improved as the project evolves.

## Future Work

- **Installation**: The project is not yet ready for easy installation, but it is under active development.
- **Electron Front-End**: Moving from Next.js web based front end
to Electron multi-platform application.
- **Chaincode functions to track illegal and under-the-table trade patterns**: Chaincode functions to automatically detect suspicious 
trade patterns. This will involve ZKPs and accumulators for persistent but private data.

## Contact

For any questions or inquiries regarding this project, feel free to reach out.

