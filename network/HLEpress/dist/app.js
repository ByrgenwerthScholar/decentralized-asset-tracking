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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AppUtil_1 = require("./utils/AppUtil");
const CAUtil_1 = require("./utils/CAUtil");
const path = __importStar(require("path"));
const app = (0, express_1.default)();
const port = 3001; // or process.env.PORT
const mspOrg1 = 'Org1MSP';
const mspOrg2 = 'Org2MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'typescriptAppUser1';
const org2UserId = 'typescriptAppUser2';
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ccp1 = (0, AppUtil_1.buildCCPOrg1)();
        const ccp2 = (0, AppUtil_1.buildCCPOrg2)();
        const caClient1 = (0, CAUtil_1.buildCAClient)(ccp1, 'ca.org1.example.com');
        const caClient2 = (0, CAUtil_1.buildCAClient)(ccp2, 'ca.org2.example.com');
        const wallet = yield (0, AppUtil_1.buildWallet)(walletPath);
        yield (0, CAUtil_1.enrollAdmin)(caClient1, wallet, mspOrg1);
        yield (0, CAUtil_1.enrollAdmin)(caClient2, wallet, mspOrg2);
        yield (0, CAUtil_1.registerAndEnrollUser)(caClient1, wallet, mspOrg1, org1UserId, 'org1.department1');
        yield (0, CAUtil_1.registerAndEnrollUser)(caClient2, wallet, mspOrg2, org2UserId, 'org2.department1');
        res.send('Hello, Express with TypeScript!');
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        else {
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}));
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
