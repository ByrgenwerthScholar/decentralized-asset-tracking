import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { setupNotificationService1, setupNotificationService2 } from './services/listeners';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

setupNotificationService1().catch((error) => {
  console.error('Error setting up notification service 1:', error);
});

setupNotificationService2().catch((error) => {
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
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true },
    })
  );

  // Use webpack-hot-middleware
  app.use(webpackHotMiddleware(compiler));

  app.get('*', (req, res, next) => {
    if (res.headersSent) {
      // If headers have already been sent, do not attempt to send another response
      return;
    }
  
    const filename = path.join(compiler.outputPath, 'index.html');
  
    compiler.outputFileSystem.readFile(filename, (err: Error | null, result: Buffer) => {
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
} else {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../../../frontend/webpack.config.js');

  const compiler = webpack(webpackConfig);
  // Serve frontend static files in production
  app.use(express.static(path.join(__dirname, '../../../frontend/dist')));

  // Serve index.html for all unmatched routes
  app.get('*', (req, res, next) => {
    if (res.headersSent) {
      // If headers have already been sent, do not attempt to send another response
      return;
    }
  
    const filename = path.join(compiler.outputPath, 'index.html');
  
    compiler.outputFileSystem.readFile(filename, (err: Error | null, result: Buffer) => {
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

export default app;
