"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/assets.js
const express_1 = __importDefault(require("express"));
const fabric_gateway_1 = require("@hyperledger/fabric-gateway");
const router = express_1.default.Router();
const vars_1 = require("./utils/vars");
router.get('/getallhistories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, vars_1.displayInputParameters3)();
    // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    const client = yield (0, vars_1.newGrpcConnection3)();
    const gateway = (0, fabric_gateway_1.connect)({
        client,
        identity: yield (0, vars_1.newIdentity3)(),
        signer: yield (0, vars_1.newSigner3)(),
        // Default timeouts for different gRPC calls
        evaluateOptions: () => {
            return { deadline: Date.now() + 5000 }; // 5 seconds
        },
        endorseOptions: () => {
            return { deadline: Date.now() + 15000 }; // 15 seconds
        },
        submitOptions: () => {
            return { deadline: Date.now() + 5000 }; // 5 seconds
        },
        commitStatusOptions: () => {
            return { deadline: Date.now() + 60000 }; // 1 minute
        },
    });
    try {
        // Get a network instance representing the channel where the smart contract is deployed.
        const network = gateway.getNetwork(vars_1.channelName);
        // Get the smart contract from the network.
        const contract = network.getContract(vars_1.chaincodeName);
        // Initialize a set of asset data on the ledger using the chaincode 'InitLedger' function.
        // await contract.submitTransaction('InitLedger');
        const assets = yield contract.submitTransaction('GetAllHistories');
        const resultJson = vars_1.utf8Decoder.decode(assets);
        const result = JSON.parse(resultJson);
        res.send(result);
    }
    catch (error) {
        console.error('******** FAILED to run the application:', error);
    }
    finally {
        gateway.close();
        client.close();
    }
    ;
}));
router.post('/audit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, vars_1.displayInputParameters3)();
    // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    const client = yield (0, vars_1.newGrpcConnection3)();
    const gateway = (0, fabric_gateway_1.connect)({
        client,
        identity: yield (0, vars_1.newIdentity3)(),
        signer: yield (0, vars_1.newSigner3)(),
        // Default timeouts for different gRPC calls 
        evaluateOptions: () => {
            return { deadline: Date.now() + 5000 }; // 5 seconds
        },
        endorseOptions: () => {
            return { deadline: Date.now() + 15000 }; // 15 seconds
        },
        submitOptions: () => {
            return { deadline: Date.now() + 5000 }; // 5 seconds
        },
        commitStatusOptions: () => {
            return { deadline: Date.now() + 60000 }; // 1 minute
        },
    });
    try {
        // Get a network instance representing the channel where the smart contract is deployed.
        const network = gateway.getNetwork(vars_1.channelName);
        // Get the smart contract from the network.
        const contract = network.getContract(vars_1.chaincodeName);
        // Initialize a set of asset data on the ledger using the chaincode 'InitLedger' function.
        // await contract.submitTransaction('InitLedger');
        // await contract.submitTransaction('AddAsset', name, size);
        console.log('Asset added successfully');
        res.send("Asset added successfully");
    }
    catch (error) {
        console.error('******** FAILED to run the application:', error);
    }
    finally {
        gateway.close();
        client.close();
    }
    ;
    router.post('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("body:" + JSON.stringify(req.body)); // Log to debug
        const assets = req.body.assets;
        yield (0, vars_1.displayInputParameters3)();
        // The gRPC client connection should be shared by all Gateway connections to this endpoint.
        const client = yield (0, vars_1.newGrpcConnection3)();
        const gateway = (0, fabric_gateway_1.connect)({
            client,
            identity: yield (0, vars_1.newIdentity3)(),
            signer: yield (0, vars_1.newSigner3)(),
            // Default timeouts for different gRPC calls 
            evaluateOptions: () => {
                return { deadline: Date.now() + 5000 }; // 5 seconds
            },
            endorseOptions: () => {
                return { deadline: Date.now() + 15000 }; // 15 seconds
            },
            submitOptions: () => {
                return { deadline: Date.now() + 5000 }; // 5 seconds
            },
            commitStatusOptions: () => {
                return { deadline: Date.now() + 60000 }; // 1 minute
            },
        });
        try {
            // Get a network instance representing the channel where the smart contract is deployed.
            const network = gateway.getNetwork(vars_1.channelName);
            // Get the smart contract from the network.
            const contract = network.getContract(vars_1.chaincodeName);
            // Initialize a set of asset data on the ledger using the chaincode 'InitLedger' function.
            // await contract.submitTransaction('InitLedger');
            for (const asset of assets) {
                yield contract.submitTransaction('DeleteAsset', asset);
            }
            res.send("Asset deleted successfully");
        }
        catch (error) {
            console.error('******** FAILED to run the application:', error);
        }
        finally {
            gateway.close();
            client.close();
        }
        ;
    }));
}));
module.exports = router;
