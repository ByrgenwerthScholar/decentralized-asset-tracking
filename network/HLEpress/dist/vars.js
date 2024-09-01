"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayInputParameters3 = exports.newSigner3 = exports.newIdentity3 = exports.newGrpcConnection3 = exports.peerHostAlias3 = exports.tlsCertPath3 = exports.certDirectoryPath3 = exports.keyDirectoryPath3 = exports.cryptoPath3 = exports.mspId3 = exports.displayInputParameters2 = exports.newSigner2 = exports.newIdentity2 = exports.newGrpcConnection2 = exports.peerHostAlias2 = exports.tlsCertPath2 = exports.certDirectoryPath2 = exports.keyDirectoryPath2 = exports.cryptoPath2 = exports.mspId2 = exports.displayInputParameters1 = exports.newSigner1 = exports.getFirstDirFileName = exports.newIdentity1 = exports.newGrpcConnection1 = exports.envOrDefault = exports.utf8Decoder = exports.peerHostAlias1 = exports.tlsCertPath1 = exports.certDirectoryPath1 = exports.keyDirectoryPath1 = exports.cryptoPath1 = exports.mspId1 = exports.chaincodeName = exports.channelName = void 0;
const path = __importStar(require("path"));
const grpc = __importStar(require("@grpc/grpc-js"));
const fs_1 = require("fs");
const fabric_gateway_1 = require("@hyperledger/fabric-gateway");
const crypto = __importStar(require("crypto"));
const channelName = envOrDefault('CHANNEL_NAME', 'mychannel');
exports.channelName = channelName;
const chaincodeName = envOrDefault('CHAINCODE_NAME', 'ledger');
exports.chaincodeName = chaincodeName;
const mspId1 = 'Org1MSP';
exports.mspId1 = mspId1;
const mspId2 = 'Org2MSP';
exports.mspId2 = mspId2;
const mspId3 = 'Org3MSP';
exports.mspId3 = mspId3;
// Path to crypto materials.
const cryptoPath1 = envOrDefault('CRYPTO_PATH', path.resolve(__dirname, '../', '../', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com'));
exports.cryptoPath1 = cryptoPath1;
const cryptoPath2 = envOrDefault('CRYPTO_PATH', path.resolve(__dirname, '../', '../', 'test-network', 'organizations', 'peerOrganizations', 'org2.example.com'));
exports.cryptoPath2 = cryptoPath2;
const cryptoPath3 = envOrDefault('CRYPTO_PATH', path.resolve(__dirname, '../', '../', 'test-network', 'organizations', 'peerOrganizations', 'org3.example.com'));
exports.cryptoPath3 = cryptoPath3;
// Path to user private key directory.
const keyDirectoryPath1 = envOrDefault('KEY_DIRECTORY_PATH', path.resolve(cryptoPath1, 'users', 'User1@org1.example.com', 'msp', 'keystore'));
exports.keyDirectoryPath1 = keyDirectoryPath1;
const keyDirectoryPath2 = envOrDefault('KEY_DIRECTORY_PATH', path.resolve(cryptoPath2, 'users', 'User1@org2.example.com', 'msp', 'keystore'));
exports.keyDirectoryPath2 = keyDirectoryPath2;
const keyDirectoryPath3 = envOrDefault('KEY_DIRECTORY_PATH', path.resolve(cryptoPath3, 'users', 'User1@org3.example.com', 'msp', 'keystore'));
exports.keyDirectoryPath3 = keyDirectoryPath3;
// Path to user certificate directory.
const certDirectoryPath1 = envOrDefault('CERT_DIRECTORY_PATH', path.resolve(cryptoPath1, 'users', 'User1@org1.example.com', 'msp', 'signcerts'));
exports.certDirectoryPath1 = certDirectoryPath1;
const certDirectoryPath2 = envOrDefault('CERT_DIRECTORY_PATH', path.resolve(cryptoPath2, 'users', 'User1@org2.example.com', 'msp', 'signcerts'));
exports.certDirectoryPath2 = certDirectoryPath2;
const certDirectoryPath3 = envOrDefault('CERT_DIRECTORY_PATH', path.resolve(cryptoPath3, 'users', 'User1@org3.example.com', 'msp', 'signcerts'));
exports.certDirectoryPath3 = certDirectoryPath3;
// Path to peer tls certificate.
const tlsCertPath1 = envOrDefault('TLS_CERT_PATH', path.resolve(cryptoPath1, 'peers', 'peer0.org1.example.com', 'tls', 'ca.crt'));
exports.tlsCertPath1 = tlsCertPath1;
const tlsCertPath2 = envOrDefault('TLS_CERT_PATH', path.resolve(cryptoPath2, 'peers', 'peer0.org2.example.com', 'tls', 'ca.crt'));
exports.tlsCertPath2 = tlsCertPath2;
const tlsCertPath3 = envOrDefault('TLS_CERT_PATH', path.resolve(cryptoPath3, 'peers', 'peer0.org3.example.com', 'tls', 'ca.crt'));
exports.tlsCertPath3 = tlsCertPath3;
// Gateway peer endpoint.
const peerEndpoint1 = envOrDefault('PEER_ENDPOINT', 'localhost:7051');
const peerEndpoint2 = envOrDefault('PEER_ENDPOINT', 'localhost:9051');
const peerEndpoint3 = envOrDefault('PEER_ENDPOINT', 'localhost:11051');
// Gateway peer SSL host name override.
const peerHostAlias1 = envOrDefault('PEER_HOST_ALIAS', 'peer0.org1.example.com');
exports.peerHostAlias1 = peerHostAlias1;
const peerHostAlias2 = envOrDefault('PEER_HOST_ALIAS', 'peer0.org2.example.com');
exports.peerHostAlias2 = peerHostAlias2;
const peerHostAlias3 = envOrDefault('PEER_HOST_ALIAS', 'peer0.org3.example.com');
exports.peerHostAlias3 = peerHostAlias3;
const utf8Decoder = new TextDecoder();
exports.utf8Decoder = utf8Decoder;
function envOrDefault(key, defaultValue) {
    return process.env[key] || defaultValue;
}
exports.envOrDefault = envOrDefault;
function newGrpcConnection1() {
    return __awaiter(this, void 0, void 0, function* () {
        const tlsRootCert = yield fs_1.promises.readFile(tlsCertPath1);
        const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
        return new grpc.Client(peerEndpoint1, tlsCredentials, {
            'grpc.ssl_target_name_override': peerHostAlias1,
        });
    });
}
exports.newGrpcConnection1 = newGrpcConnection1;
function newGrpcConnection2() {
    return __awaiter(this, void 0, void 0, function* () {
        const tlsRootCert = yield fs_1.promises.readFile(tlsCertPath2);
        const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
        return new grpc.Client(peerEndpoint2, tlsCredentials, {
            'grpc.ssl_target_name_override': peerHostAlias2,
        });
    });
}
exports.newGrpcConnection2 = newGrpcConnection2;
function newGrpcConnection3() {
    return __awaiter(this, void 0, void 0, function* () {
        const tlsRootCert = yield fs_1.promises.readFile(tlsCertPath3);
        const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
        return new grpc.Client(peerEndpoint3, tlsCredentials, {
            'grpc.ssl_target_name_override': peerHostAlias3,
        });
    });
}
exports.newGrpcConnection3 = newGrpcConnection3;
function newIdentity1() {
    return __awaiter(this, void 0, void 0, function* () {
        const certPath = yield getFirstDirFileName(certDirectoryPath1);
        const credentials = yield fs_1.promises.readFile(certPath);
        return { mspId: mspId1, credentials };
    });
}
exports.newIdentity1 = newIdentity1;
function newIdentity2() {
    return __awaiter(this, void 0, void 0, function* () {
        const certPath = yield getFirstDirFileName(certDirectoryPath2);
        const credentials = yield fs_1.promises.readFile(certPath);
        return { mspId: mspId2, credentials };
    });
}
exports.newIdentity2 = newIdentity2;
function newIdentity3() {
    return __awaiter(this, void 0, void 0, function* () {
        const certPath = yield getFirstDirFileName(certDirectoryPath3);
        const credentials = yield fs_1.promises.readFile(certPath);
        return { mspId: mspId3, credentials };
    });
}
exports.newIdentity3 = newIdentity3;
function getFirstDirFileName(dirPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield fs_1.promises.readdir(dirPath);
        return path.join(dirPath, files[0]);
    });
}
exports.getFirstDirFileName = getFirstDirFileName;
function newSigner1() {
    return __awaiter(this, void 0, void 0, function* () {
        const keyPath = yield getFirstDirFileName(keyDirectoryPath1);
        const privateKeyPem = yield fs_1.promises.readFile(keyPath);
        const privateKey = crypto.createPrivateKey(privateKeyPem);
        return fabric_gateway_1.signers.newPrivateKeySigner(privateKey);
    });
}
exports.newSigner1 = newSigner1;
function newSigner2() {
    return __awaiter(this, void 0, void 0, function* () {
        const keyPath = yield getFirstDirFileName(keyDirectoryPath2);
        const privateKeyPem = yield fs_1.promises.readFile(keyPath);
        const privateKey = crypto.createPrivateKey(privateKeyPem);
        return fabric_gateway_1.signers.newPrivateKeySigner(privateKey);
    });
}
exports.newSigner2 = newSigner2;
function newSigner3() {
    return __awaiter(this, void 0, void 0, function* () {
        const keyPath = yield getFirstDirFileName(keyDirectoryPath3);
        const privateKeyPem = yield fs_1.promises.readFile(keyPath);
        const privateKey = crypto.createPrivateKey(privateKeyPem);
        return fabric_gateway_1.signers.newPrivateKeySigner(privateKey);
    });
}
exports.newSigner3 = newSigner3;
function displayInputParameters1() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`channelName:       ${channelName}`);
        console.log(`chaincodeName:     ${chaincodeName}`);
        console.log(`mspId:             ${mspId1}`);
        console.log(`cryptoPath:        ${cryptoPath1}`);
        console.log(`keyDirectoryPath:  ${keyDirectoryPath1}`);
        console.log(`certDirectoryPath: ${certDirectoryPath1}`);
        console.log(`tlsCertPath:       ${tlsCertPath1}`);
        console.log(`peerEndpoint:      ${peerEndpoint1}`);
        console.log(`peerHostAlias:     ${peerHostAlias1}`);
    });
}
exports.displayInputParameters1 = displayInputParameters1;
function displayInputParameters2() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`channelName:       ${channelName}`);
        console.log(`chaincodeName:     ${chaincodeName}`);
        console.log(`mspId:             ${mspId2}`);
        console.log(`cryptoPath:        ${cryptoPath2}`);
        console.log(`keyDirectoryPath:  ${keyDirectoryPath2}`);
        console.log(`certDirectoryPath: ${certDirectoryPath2}`);
        console.log(`tlsCertPath:       ${tlsCertPath2}`);
        console.log(`peerEndpoint:      ${peerEndpoint2}`);
        console.log(`peerHostAlias:     ${peerHostAlias2}`);
    });
}
exports.displayInputParameters2 = displayInputParameters2;
function displayInputParameters3() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`channelName:       ${channelName}`);
        console.log(`chaincodeName:     ${chaincodeName}`);
        console.log(`mspId:             ${mspId3}`);
        console.log(`cryptoPath:        ${cryptoPath3}`);
        console.log(`keyDirectoryPath:  ${keyDirectoryPath3}`);
        console.log(`certDirectoryPath: ${certDirectoryPath3}`);
        console.log(`tlsCertPath:       ${tlsCertPath3}`);
        console.log(`peerEndpoint:      ${peerEndpoint3}`);
        console.log(`peerHostAlias:     ${peerHostAlias3}`);
    });
}
exports.displayInputParameters3 = displayInputParameters3;
