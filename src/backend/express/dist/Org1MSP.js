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
const buffer_1 = require("buffer");
const json_stringify_deterministic_1 = __importDefault(require("json-stringify-deterministic"));
const fabric_gateway_1 = require("@hyperledger/fabric-gateway");
const router = express_1.default.Router();
const userMSP = 'Org1MSP';
const vars_1 = require("./utils/vars");
// Assuming this is around line 143 in Org1MSP.js (originally written in TypeScript)
router.get('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, vars_1.displayInputParameters1)();
    // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    const client = yield (0, vars_1.newGrpcConnection1)();
    const gateway = (0, fabric_gateway_1.connect)({
        client,
        identity: yield (0, vars_1.newIdentity1)(),
        signer: yield (0, vars_1.newSigner1)(),
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
        const proposalsBytes = yield contract.submitTransaction('GetAllProposals');
        let proposalsJsonString;
        if (buffer_1.Buffer.isBuffer(proposalsBytes)) {
            proposalsJsonString = proposalsBytes.toString('utf8');
        }
        else if (proposalsBytes instanceof Uint8Array) {
            proposalsJsonString = buffer_1.Buffer.from(proposalsBytes).toString('utf8');
        }
        else {
            throw new Error('Unsupported proposalsBytes type');
        }
        // Log the JSON string to inspect its content
        console.log('proposalsJsonString:', proposalsJsonString);
        const proposalsData = JSON.parse(proposalsJsonString);
        const proposalsArray = Array.isArray(proposalsData) ? proposalsData : [proposalsData];
        res.status(200).json(proposalsArray);
    }
    catch (error) {
        console.error('Error handling /test:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.get('/getallassets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, vars_1.displayInputParameters1)();
    // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    const client = yield (0, vars_1.newGrpcConnection1)();
    const gateway = (0, fabric_gateway_1.connect)({
        client,
        identity: yield (0, vars_1.newIdentity1)(),
        signer: yield (0, vars_1.newSigner1)(),
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
        const assets = yield contract.submitTransaction('GetAllAssets');
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
router.get('/getallhistories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, vars_1.displayInputParameters1)();
    // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    const client = yield (0, vars_1.newGrpcConnection1)();
    const gateway = (0, fabric_gateway_1.connect)({
        client,
        identity: yield (0, vars_1.newIdentity1)(),
        signer: yield (0, vars_1.newSigner1)(),
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
router.get('/getallproposals', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Display input parameters (for logging or debugging purposes)
    yield (0, vars_1.displayInputParameters1)();
    // Establish a gRPC client connection
    const client = yield (0, vars_1.newGrpcConnection1)();
    // Connect to the Fabric network gateway
    const gateway = (0, fabric_gateway_1.connect)({
        client,
        identity: yield (0, vars_1.newIdentity1)(),
        signer: yield (0, vars_1.newSigner1)(),
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
        const proposals = yield contract.submitTransaction('GetAllProposals');
        const resultJson = vars_1.utf8Decoder.decode(proposals);
        let result = JSON.parse(resultJson);
        if (!Array.isArray(result)) {
            result = [result];
        }
        res.status(200).json(result);
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
router.post('/addnew', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const name = data.name;
    const size = data.size;
    yield (0, vars_1.displayInputParameters1)();
    // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    const client = yield (0, vars_1.newGrpcConnection1)();
    const gateway = (0, fabric_gateway_1.connect)({
        client,
        identity: yield (0, vars_1.newIdentity1)(),
        signer: yield (0, vars_1.newSigner1)(),
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
        const transientData = {
            asset: buffer_1.Buffer.from(JSON.stringify({
                model: name,
                size: size
            }))
        };
        const asset = yield contract.submit('AddAsset', { transientData: transientData });
        const resultJson = vars_1.utf8Decoder.decode(asset);
        // Parse the JSON string
        const result = JSON.parse(resultJson);
        res.status(200).send(result);
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
router.post('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body:" + JSON.stringify(req.body)); // Log to debug
    const assets = req.body.assets;
    yield (0, vars_1.displayInputParameters1)();
    // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    const client = yield (0, vars_1.newGrpcConnection1)();
    const gateway = (0, fabric_gateway_1.connect)({
        client,
        identity: yield (0, vars_1.newIdentity1)(),
        signer: yield (0, vars_1.newSigner1)(),
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
router.post('/transferinit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const asset = data.asset;
    const msp = data.msp;
    console.log("asset: " + asset.id + asset.model + asset.size + typeof (asset.size));
    // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    const client = yield (0, vars_1.newGrpcConnection1)();
    const gateway = (0, fabric_gateway_1.connect)({
        client,
        identity: yield (0, vars_1.newIdentity1)(),
        signer: yield (0, vars_1.newSigner1)(),
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
        // Prepare the transient data
        const transientData = {
            asset: buffer_1.Buffer.from((0, json_stringify_deterministic_1.default)({
                id: asset.id,
                model: asset.model,
                size: asset.size,
                accumulator: asset.accumulator,
            })),
            msp: buffer_1.Buffer.from(msp),
        };
        // Submit the InitTransaction transaction
        const proposal = yield contract.submit('InitTransaction', {
            transientData: transientData,
            endorsingOrganizations: [msp, userMSP]
        });
        // Convert Uint8Array to Buffer, then to string
        const resultJson = vars_1.utf8Decoder.decode(proposal);
        // Parse the JSON string
        const result = JSON.parse(resultJson);
        res.status(200).send(result);
    }
    catch (error) {
        console.error('******** FAILED to run the application:', error);
        res.status(500).send('Failed to initialize transaction');
    }
    finally {
        gateway.close();
        client.close();
    }
    ;
}));
router.post('/acceptproposal', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const proposalId = data.proposalId;
    console.log("proposal: " + proposalId);
    // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    const client = yield (0, vars_1.newGrpcConnection1)();
    const gateway = (0, fabric_gateway_1.connect)({
        client,
        identity: yield (0, vars_1.newIdentity1)(),
        signer: yield (0, vars_1.newSigner1)(),
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
    console.log("ACCEPTING PROPOSAL");
    try {
        // Get a network instance representing the channel where the smart contract is deployed.
        const network = gateway.getNetwork(vars_1.channelName);
        // Get the smart contract from the network.
        const contract = network.getContract(vars_1.chaincodeName);
        yield contract.submitTransaction('AcceptProposal', proposalId);
        res.send("Transaction initialized successfully");
    }
    catch (error) {
        console.error('******** FAILED to run the application:', error);
        res.status(500).send('Failed to initialize transaction');
    }
    finally {
        gateway.close();
        client.close();
    }
    ;
}));
router.post('/checkproposals', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const proposals = data.proposals;
    console.log('Received proposalIds:', proposals);
    // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    const client = yield (0, vars_1.newGrpcConnection1)();
    const gateway = (0, fabric_gateway_1.connect)({
        client,
        identity: yield (0, vars_1.newIdentity1)(),
        signer: yield (0, vars_1.newSigner1)(),
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
        // Submit the InitTransaction transaction
        const data = yield contract.evaluate('CheckProposalAccepted', { arguments: [(0, json_stringify_deterministic_1.default)(proposals)] });
        const resultJson = vars_1.utf8Decoder.decode(data);
        const result = JSON.parse(resultJson);
        console.log("CheckProposal result: " + result);
        res.send(result);
    }
    catch (error) {
        console.error('******** FAILED to run the application:', error);
        res.status(500).send('Failed to initialize transaction');
    }
    finally {
        gateway.close();
        client.close();
    }
    ;
}));
router.post('/transfer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { asset, proposal } = req.body;
    // Basic input validation
    if (!asset || !proposal) {
        return res.status(400).json({ message: 'Asset and Proposal data are required.' });
    }
    // Optional: Display input parameters for debugging
    yield (0, vars_1.displayInputParameters1)();
    // Establish a new gRPC connection
    const client = yield (0, vars_1.newGrpcConnection1)();
    // Create a new Gateway instance and connect
    const gateway = (0, fabric_gateway_1.connect)({
        client,
        identity: yield (0, vars_1.newIdentity1)(),
        signer: yield (0, vars_1.newSigner1)(),
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
        // Get the network (channel) your contract is deployed to.
        const network = gateway.getNetwork(vars_1.channelName);
        // Get the contract from the network.
        const contract = network.getContract(vars_1.chaincodeName);
        const newProposal = contract.newProposal('TransferAsset', {
            transientData: {
                asset: buffer_1.Buffer.from(JSON.stringify(asset)),
                proposal: buffer_1.Buffer.from(JSON.stringify(proposal)),
            },
            endorsingOrganizations: ['Org1MSP', 'Org2MSP']
        });
        const endorsedTx = yield newProposal.endorse();
        // Submit
        const commit = yield endorsedTx.submit();
        const resultBytes = commit.getResult();
        res.status(200).json({ message: 'Asset transfer initiated successfully.' });
    }
    catch (error) {
        console.error('Transaction failed:', error);
        res.status(500).json({ message: 'Asset transfer failed.', error: error.message });
    }
    finally {
        gateway.close();
        client.close();
    }
}));
module.exports = router;
