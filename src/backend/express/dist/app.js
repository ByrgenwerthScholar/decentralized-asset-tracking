"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const bodyParser = require('body-parser');
const listeners_1 = require("./services/listeners");
const app = (0, express_1.default)();
const port = 3002; // or process.env.PORT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(cors());
app.post('/test', (req, res) => {
    console.log(req.body); // Should log the JSON body sent from Postman
    res.json({ message: 'Received' });
});
const org1 = require('./org1');
const org2 = require('./org2');
const org3 = require('./org3');
const plaid = require('./plaid');
app.use('/org1', org1);
app.use('/org2', org2);
app.use('/org3', org3);
app.use('/plaid', plaid);
(0, listeners_1.setupNotificationService1)().catch((error) => {
    console.error('Error setting up notification service 1:', error);
});
(0, listeners_1.setupNotificationService2)().catch((error) => {
    console.error('Error setting up notification service 2:', error);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
