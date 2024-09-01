#!/bin/bash

# Stop the execution if any command fails
set -e

./network.sh down
./network.sh up createChannel -c mychannel

cd addOrg3
./addOrg3.sh up -c mychannel
cd ..

./network.sh deployCC -ccn ledger -ccp ../chaincode-typescript/asset-chaincode -ccl typescript -ccep "OR('Org1MSP.peer','Org2MSP.peer','Org3MSP.peer')"
./network.sh deployCC -ccn crypto -ccp ../chaincode-typescript/crypto-chaincode -ccl typescript -ccep "OR('Org1MSP.peer','Org2MSP.peer','Org3MSP.peer')"
# # InitLedger
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ledger -c '{"function":"InitLedger","Args":[]}' --peerAddresses localhost:11051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt" --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt"
# GetAllAssets
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ledger -c '{"function":"GetAllAssets","Args":[]}'
# GetAllProposals
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ledger -c '{"function":"GetAllProposals","Args":[]}'
# AddAsset
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ledger -c '{"function":"AddAsset","Args":["WOOO","500"]}' --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:11051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt"
#InitTransaction
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ledger -c '{"function":"InitTransaction","Args":["Org2MSP"]}' --transient "{\"asset\":\"$ASSET_DETAILS\"}" --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt"
#AcceptProposal
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ledger -c '{"function":"AcceptProposal","Args":["P67f22e0acff3e579470873cd74c9bd7f686514ba94784a79bf591cb84e44345b"]}' --transient "{\"asset\":\"$ASSET_DETAILS\"}"
# ConfirmTransferDetails
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ledger -c '{"function":"ConfirmTransferDetails","Args":["P67f22e0acff3e579470873cd74c9bd7f686514ba94784a79bf591cb84e44345b"]}'
#TransferAsset
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ledger -c '{"function":"TransferAsset","Args":[]}' --transient "{\"asset\":\"$ASSET_DETAILS\",\"proposal\":\"$PROPOSAL_DETAILS\"}" --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt"

# export ASSET_DETAILS=$(echo -n "{\"id\":\"A283a584c10ede0bc92953f009941f3072ff3dddf5f1aed2c31369b999fe7f23f\",\"model\":\"Intel Atom Z2760\",\"size\":1000}" | base64 | tr -d \\n)
# export PROPOSAL_DETAILS=$(echo -n "{\"accepted\":true,\"assetId\":\"A283a584c10ede0bc92953f009941f3072ff3dddf5f1aed2c31369b999fe7f23f\",\"buyer\":\"Org2MSP\",\"date\":\"2024-05-20T21:55:37.606Z\",\"id\":\"P67f22e0acff3e579470873cd74c9bd7f686514ba94784a79bf591cb84e44345b\",\"model\":\"Intel Atom Z2760\",\"seller\":\"Org1MSP\",\"size\":1000}" | base64 | tr -d \\n)
# export PATH=${PWD}/../bin:$PATH
# export FABRIC_CFG_PATH=$PWD/../config/

# export CORE_PEER_TLS_ENABLED=true
# export CORE_PEER_LOCALMSPID="Org1MSP"
# export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
# export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
# export CORE_PEER_ADDRESS=localhost:7051

# export CORE_PEER_TLS_ENABLED=true
# export CORE_PEER_LOCALMSPID="Org2MSP"
# export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
# export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
# export CORE_PEER_ADDRESS=localhost:9051

echo "All scripts executed successfully."