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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupNotificationService2 = exports.setupNotificationService1 = void 0;
// src/services/notificationService.ts
const grpc = __importStar(require("@grpc/grpc-js"));
const fabric_gateway_1 = require("@hyperledger/fabric-gateway");
const ws_1 = __importDefault(require("ws"));
const vars_1 = require("../utils/vars");
const util_1 = require("util");
const utf8Decoder = new util_1.TextDecoder();
let wss1;
let wss2;
const notifyClients = (wss, message) => {
    wss.clients.forEach((client) => {
        if (client.readyState === ws_1.default.OPEN) {
            client.send(message);
        }
    });
};
const setupNotificationService1 = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!wss1) {
        wss1 = new ws_1.default.Server({ port: 3003 });
        console.log('WebSocket server 1 started');
        wss1.on('connection', (ws) => {
            console.log('Client connected to WebSocket server 1');
            ws.on('message', (message) => {
                console.log('Received message on server 1:', message);
            });
            ws.on('close', () => {
                console.log('Client disconnected from WebSocket server 1');
            });
        });
    }
    const client = yield (0, vars_1.newGrpcConnection1)();
    const gateway = (0, fabric_gateway_1.connect)({
        client,
        identity: yield (0, vars_1.newIdentity1)(),
        signer: yield (0, vars_1.newSigner1)(),
        evaluateOptions: () => ({ deadline: Date.now() + 5000 }),
        endorseOptions: () => ({ deadline: Date.now() + 15000 }),
        submitOptions: () => ({ deadline: Date.now() + 5000 }),
        commitStatusOptions: () => ({ deadline: Date.now() + 60000 }),
    });
    const network = gateway.getNetwork(vars_1.channelName);
    yield startEventListening(network, wss1);
});
exports.setupNotificationService1 = setupNotificationService1;
const setupNotificationService2 = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!wss2) {
        wss2 = new ws_1.default.Server({ port: 3004 });
        console.log('WebSocket server 2 started');
        wss2.on('connection', (ws) => {
            console.log('Client connected to WebSocket server 2');
            ws.on('message', (message) => {
                console.log('Received message on server 2:', message);
            });
            ws.on('close', () => {
                console.log('Client disconnected from WebSocket server 2');
            });
        });
    }
    const client = yield (0, vars_1.newGrpcConnection2)();
    const gateway = (0, fabric_gateway_1.connect)({
        client,
        identity: yield (0, vars_1.newIdentity2)(),
        signer: yield (0, vars_1.newSigner2)(),
        evaluateOptions: () => ({ deadline: Date.now() + 5000 }),
        endorseOptions: () => ({ deadline: Date.now() + 15000 }),
        submitOptions: () => ({ deadline: Date.now() + 5000 }),
        commitStatusOptions: () => ({ deadline: Date.now() + 60000 }),
    });
    const network = gateway.getNetwork(vars_1.channelName);
    yield startEventListening(network, wss2);
});
exports.setupNotificationService2 = setupNotificationService2;
function startEventListening(network, wss) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n*** Start chaincode event listening');
        const events = yield network.getChaincodeEvents(vars_1.chaincodeName);
        void readEvents(events, wss); // Run asynchronously
        return events;
    });
}
function readEvents(events, wss) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, events_1, events_1_1;
        var _b, e_1, _c, _d;
        try {
            try {
                for (_a = true, events_1 = __asyncValues(events); events_1_1 = yield events_1.next(), _b = events_1_1.done, !_b; _a = true) {
                    _d = events_1_1.value;
                    _a = false;
                    const event = _d;
                    const payload = utf8Decoder.decode(event.payload);
                    console.log(`\n<-- Chaincode event received: ${event.eventName} -`, payload);
                    notifyClients(wss, `Event: ${event.eventName} - ${JSON.stringify(payload)}`);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_a && !_b && (_c = events_1.return)) yield _c.call(events_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        catch (error) {
            if (!(error instanceof fabric_gateway_1.GatewayError) || error.code !== grpc.status.CANCELLED.valueOf()) {
                throw error;
            }
        }
    });
}
