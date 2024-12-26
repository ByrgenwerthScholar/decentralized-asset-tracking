"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const listeners_1 = require("./services/listeners");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// API routes
app.post('/test', (req, res) => {
    console.log(req.body);
    res.json({ message: 'Received' });
});
const org1 = require('./Org1MSP');
const org2 = require('./Org2MSP');
const org3 = require('./Org3MSP');
const plaid = require('./plaid');
app.use('/Org1MSP', org1);
app.use('/Org2MSP', org2);
app.use('/Org3MSP', org3);
app.use('/plaid', plaid);
(0, listeners_1.setupNotificationService1)().catch((error) => {
    console.error('Error setting up notification service 1:', error);
});
(0, listeners_1.setupNotificationService2)().catch((error) => {
    console.error('Error setting up notification service 2:', error);
});
// Determine if in development mode
const isDevelopment = process.env.NODE_ENV !== 'production';
if (isDevelopment) {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../../../frontend/webpack.config.js');
    // Initialize webpack compiler with config
    const compiler = webpack(webpackConfig);
    // Use webpack-dev-middleware
    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true },
    }));
    // Use webpack-hot-middleware
    app.use(webpackHotMiddleware(compiler));
    app.get('*', (req, res, next) => {
        if (res.headersSent) {
            // If headers have already been sent, do not attempt to send another response
            return;
        }
        const filename = path_1.default.join(compiler.outputPath, 'index.html');
        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                console.error('Error reading index.html:', err);
                return next(err);
            }
            res.setHeader('Content-Type', 'text/html');
            res.send(result);
            console.log('Response sent for request to:', req.url);
        });
    });
    console.log('Webpack dev and hot middleware enabled.');
}
else {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../../../frontend/webpack.config.js');
    const compiler = webpack(webpackConfig);
    // Serve frontend static files in production
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../../frontend/dist')));
    // Serve index.html for all unmatched routes
    app.get('*', (req, res, next) => {
        if (res.headersSent) {
            // If headers have already been sent, do not attempt to send another response
            return;
        }
        const filename = path_1.default.join(compiler.outputPath, 'index.html');
        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                console.error('Error reading index.html:', err);
                return next(err);
            }
            res.setHeader('Content-Type', 'text/html');
            res.send(result);
            console.log('Response sent for request to:', req.url);
        });
    });
}
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
exports.default = app;
