import * as path from 'path';
import * as grpc from '@grpc/grpc-js';
import { promises as fs } from 'fs';
import { connect, Contract, Identity, Signer, signers } from '@hyperledger/fabric-gateway';
import * as crypto from 'crypto';
const channelName = envOrDefault('CHANNEL_NAME', 'mychannel');
const chaincodeName = envOrDefault('CHAINCODE_NAME', 'ledger');
const mspId1 = 'Org1MSP';
const mspId2 = 'Org2MSP';
const mspId3 = 'Org3MSP';

// Path to crypto materials.
const cryptoPath1 = envOrDefault('CRYPTO_PATH', path.resolve(__dirname, '../', '../', '../', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com'));
const cryptoPath2 = envOrDefault('CRYPTO_PATH', path.resolve(__dirname, '../', '../', '../', 'test-network', 'organizations', 'peerOrganizations', 'org2.example.com'));
const cryptoPath3 = envOrDefault('CRYPTO_PATH', path.resolve(__dirname, '../', '../', '../', 'test-network', 'organizations', 'peerOrganizations', 'org3.example.com'));

// Path to user private key directory.
const keyDirectoryPath1 = envOrDefault('KEY_DIRECTORY_PATH', path.resolve(cryptoPath1, 'users', 'User1@org1.example.com', 'msp', 'keystore'));
const keyDirectoryPath2 = envOrDefault('KEY_DIRECTORY_PATH', path.resolve(cryptoPath2, 'users', 'User1@org2.example.com', 'msp', 'keystore'));
const keyDirectoryPath3 = envOrDefault('KEY_DIRECTORY_PATH', path.resolve(cryptoPath3, 'users', 'User1@org3.example.com', 'msp', 'keystore'));


// Path to user certificate directory.
const certDirectoryPath1 = envOrDefault('CERT_DIRECTORY_PATH', path.resolve(cryptoPath1, 'users', 'User1@org1.example.com', 'msp', 'signcerts'));
const certDirectoryPath2 = envOrDefault('CERT_DIRECTORY_PATH', path.resolve(cryptoPath2, 'users', 'User1@org2.example.com', 'msp', 'signcerts'));
const certDirectoryPath3 = envOrDefault('CERT_DIRECTORY_PATH', path.resolve(cryptoPath3, 'users', 'User1@org3.example.com', 'msp', 'signcerts'));

// Path to peer tls certificate.
const tlsCertPath1 = envOrDefault('TLS_CERT_PATH', path.resolve(cryptoPath1, 'peers', 'peer0.org1.example.com', 'tls', 'ca.crt'));
const tlsCertPath2 = envOrDefault('TLS_CERT_PATH', path.resolve(cryptoPath2, 'peers', 'peer0.org2.example.com', 'tls', 'ca.crt'));
const tlsCertPath3 = envOrDefault('TLS_CERT_PATH', path.resolve(cryptoPath3, 'peers', 'peer0.org3.example.com', 'tls', 'ca.crt'));

// Gateway peer endpoint.
const peerEndpoint1 = envOrDefault('PEER_ENDPOINT', 'localhost:7051');
const peerEndpoint2 = envOrDefault('PEER_ENDPOINT', 'localhost:9051');
const peerEndpoint3 = envOrDefault('PEER_ENDPOINT', 'localhost:11051');


// Gateway peer SSL host name override.
const peerHostAlias1 = envOrDefault('PEER_HOST_ALIAS', 'peer0.org1.example.com');
const peerHostAlias2 = envOrDefault('PEER_HOST_ALIAS', 'peer0.org2.example.com');
const peerHostAlias3 = envOrDefault('PEER_HOST_ALIAS', 'peer0.org3.example.com');

const utf8Decoder = new TextDecoder();


function envOrDefault(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

async function newGrpcConnection1(): Promise<grpc.Client> {
  const tlsRootCert = await fs.readFile(tlsCertPath1);
  const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
  return new grpc.Client(peerEndpoint1, tlsCredentials, {
      'grpc.ssl_target_name_override': peerHostAlias1,
  });
}

async function newGrpcConnection2(): Promise<grpc.Client> {
  const tlsRootCert = await fs.readFile(tlsCertPath2);
  const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
  return new grpc.Client(peerEndpoint2, tlsCredentials, {
      'grpc.ssl_target_name_override': peerHostAlias2,
  });
}

async function newGrpcConnection3(): Promise<grpc.Client> {
  const tlsRootCert = await fs.readFile(tlsCertPath3);
  const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
  return new grpc.Client(peerEndpoint3, tlsCredentials, {
      'grpc.ssl_target_name_override': peerHostAlias3,
  });
}

async function newIdentity1(): Promise<Identity> {
  const certPath = await getFirstDirFileName(certDirectoryPath1);
  const credentials = await fs.readFile(certPath);
  return { mspId: mspId1, credentials };
}

async function newIdentity2(): Promise<Identity> {
  const certPath = await getFirstDirFileName(certDirectoryPath2);
  const credentials = await fs.readFile(certPath);
  return { mspId: mspId2, credentials };
}

async function newIdentity3(): Promise<Identity> {
  const certPath = await getFirstDirFileName(certDirectoryPath3);
  const credentials = await fs.readFile(certPath);
  return { mspId: mspId3, credentials };
}

async function getFirstDirFileName(dirPath: string): Promise<string> {
  const files = await fs.readdir(dirPath);
  return path.join(dirPath, files[0]);
}

async function newSigner1(): Promise<Signer> {
  const keyPath = await getFirstDirFileName(keyDirectoryPath1);
  const privateKeyPem = await fs.readFile(keyPath);
  const privateKey = crypto.createPrivateKey(privateKeyPem);
  return signers.newPrivateKeySigner(privateKey);
}

async function newSigner2(): Promise<Signer> {
  const keyPath = await getFirstDirFileName(keyDirectoryPath2);
  const privateKeyPem = await fs.readFile(keyPath);
  const privateKey = crypto.createPrivateKey(privateKeyPem);
  return signers.newPrivateKeySigner(privateKey);
}

async function newSigner3(): Promise<Signer> {
  const keyPath = await getFirstDirFileName(keyDirectoryPath3);
  const privateKeyPem = await fs.readFile(keyPath);
  const privateKey = crypto.createPrivateKey(privateKeyPem);
  return signers.newPrivateKeySigner(privateKey);
}

async function displayInputParameters1(): Promise<void> {
  console.log(`channelName:       ${channelName}`);
  console.log(`chaincodeName:     ${chaincodeName}`);
  console.log(`mspId:             ${mspId1}`);
  console.log(`cryptoPath:        ${cryptoPath1}`);
  console.log(`keyDirectoryPath:  ${keyDirectoryPath1}`);
  console.log(`certDirectoryPath: ${certDirectoryPath1}`);
  console.log(`tlsCertPath:       ${tlsCertPath1}`);
  console.log(`peerEndpoint:      ${peerEndpoint1}`);
  console.log(`peerHostAlias:     ${peerHostAlias1}`);
}

async function displayInputParameters2(): Promise<void> {
  console.log(`channelName:       ${channelName}`);
  console.log(`chaincodeName:     ${chaincodeName}`);
  console.log(`mspId:             ${mspId2}`);
  console.log(`cryptoPath:        ${cryptoPath2}`);
  console.log(`keyDirectoryPath:  ${keyDirectoryPath2}`);
  console.log(`certDirectoryPath: ${certDirectoryPath2}`);
  console.log(`tlsCertPath:       ${tlsCertPath2}`);
  console.log(`peerEndpoint:      ${peerEndpoint2}`);
  console.log(`peerHostAlias:     ${peerHostAlias2}`);
}

async function displayInputParameters3(): Promise<void> {
  console.log(`channelName:       ${channelName}`);
  console.log(`chaincodeName:     ${chaincodeName}`);
  console.log(`mspId:             ${mspId3}`);
  console.log(`cryptoPath:        ${cryptoPath3}`);
  console.log(`keyDirectoryPath:  ${keyDirectoryPath3}`);
  console.log(`certDirectoryPath: ${certDirectoryPath3}`);
  console.log(`tlsCertPath:       ${tlsCertPath3}`);
  console.log(`peerEndpoint:      ${peerEndpoint3}`);
  console.log(`peerHostAlias:     ${peerHostAlias3}`);
}



export { channelName, chaincodeName, mspId1, cryptoPath1, keyDirectoryPath1, certDirectoryPath1, tlsCertPath1, peerHostAlias1, utf8Decoder, envOrDefault, newGrpcConnection1, newIdentity1, getFirstDirFileName, newSigner1, displayInputParameters1};
export { mspId2, cryptoPath2, keyDirectoryPath2, certDirectoryPath2, tlsCertPath2, peerHostAlias2, newGrpcConnection2, newIdentity2, newSigner2, displayInputParameters2};
export { mspId3, cryptoPath3, keyDirectoryPath3, certDirectoryPath3, tlsCertPath3, peerHostAlias3, newGrpcConnection3, newIdentity3, newSigner3, displayInputParameters3};