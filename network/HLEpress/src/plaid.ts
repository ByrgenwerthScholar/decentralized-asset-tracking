import express, { Request, Response, NextFunction } from 'express';
require('dotenv').config();

const { Configuration, PlaidApi, Products, PlaidEnvironments} = require('plaid');
const util = require('util');
const moment = require('moment');

const APP_PORT = process.env.APP_PORT || 8000;
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || Products.Transactions).split(',');
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(','); 
const PLAID_REDIRECT_URI = 'http://localhost:3000/';
const PLAID_ANDROID_PACKAGE_NAME = '';

// We store the access_token in memory - in production, store it in a secure
// persistent data store
let ACCESS_TOKEN: string | null = null;
let PUBLIC_TOKEN: string | null = null;
let ITEM_ID = null;
let ACCOUNT_ID = null;
// The payment_id is only relevant for the UK/EU Payment Initiation product.
// We store the payment_id in memory - in production, store it in a secure
// persistent data store along with the Payment metadata, such as userId .
let PAYMENT_ID = null;
// The transfer_id and authorization_id are only relevant for Transfer ACH product.
// We store the transfer_id in memory - in production, store it in a secure
// persistent data store
let AUTHORIZATION_ID = null;
let TRANSFER_ID = null;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const prettyPrintResponse = (response: any) => {
  console.log(util.inspect(response.data, { colors: true, depth: 4 }));
};

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

const client = new PlaidApi(configuration);
const router = express.Router();  

router.get('/test', function (req: Request, res: Response, next: NextFunction) {
  console.log(ACCESS_TOKEN);
  res.json({ message: 'Received' });
});

router.get('/api/create_link_token', async function (request: Request, response: Response, next: NextFunction) {
  console.log('creating link token ' + moment().format('YYYY-MM-DD-HH:mm:ss')); 
  try {
    const configs: any = {
      user: {
        client_user_id: 'user-id',
      },
      client_name: 'Plaid',
      products: PLAID_PRODUCTS,
      country_codes: PLAID_COUNTRY_CODES,
      language: 'en',
      redirect_uri: PLAID_REDIRECT_URI, // Directly set the redirect URI
      android_package_name: PLAID_ANDROID_PACKAGE_NAME || undefined, // Directly set the Android package name
    };

    if (PLAID_PRODUCTS.includes('statements')) {
      const statementConfig = {
        end_date: moment().format('YYYY-MM-DD'),
        start_date: moment().subtract(30, 'days').format('YYYY-MM-DD'),
      };
      configs.statements = statementConfig;
    }

    const createTokenResponse = await client.linkTokenCreate(configs);
    console.log(createTokenResponse.data);
    response.json(createTokenResponse.data);
  } catch (error: any) {
    console.error('Error creating link token:', error.response ? error.response.data : error.message);
    response.status(500).send('Error creating link token');
  }
});

router.post('/api/set_access_token', function (request, response, next) {
  console.log('Setting access token ' + moment().format('YYYY-MM-DD-HH:mm:ss'));
  PUBLIC_TOKEN = request.body.public_token;
  try {
    Promise.resolve()
      .then(async function () {
        const tokenResponse = await client.itemPublicTokenExchange({
          public_token: PUBLIC_TOKEN,
        });
        prettyPrintResponse(tokenResponse);
        ACCESS_TOKEN = tokenResponse.data.access_token;
        ITEM_ID = tokenResponse.data.item_id;
        response.json({
          // the 'access_token' is a private token, DO NOT pass this token to the frontend in your production environment
          access_token: ACCESS_TOKEN,
          item_id: ITEM_ID,
          error: null,
        });
      })
      console.log('Success! Access token ' + ACCESS_TOKEN + ' set at: ' + moment().format('YYYY-MM-DD-HH:mm:ss'));
  } catch (error: any) {
    console.error('Error setting access token:', error.response ? error.response.data : error.message);
    response.status(500).send('Error setting access token');
  }
});


router.post('/api/transactions', async function (request: Request, response: Response, next: NextFunction) {
  console.log('Fetching transactions...');
  try {
    // Set cursor to empty to receive all historical updates
    let cursor: string | null = null;

    // New transaction updates since "cursor"
    let added: any[] = [];
    let modified: any[] = [];
    // Removed transaction ids
    let removed: any[] = [];
    let hasMore = true;

    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const requestPayload: any = {
        access_token: ACCESS_TOKEN,
        cursor: cursor,
      };

      const transactionResponse = await client.transactionsSync(requestPayload);
      const data = transactionResponse.data;

      // If no transactions are available yet, wait and poll the endpoint.
      // Normally, we would listen for a webhook, but the Quickstart doesn't
      // support webhooks. For a webhook example, see
      // https://github.com/plaid/tutorial-resources or
      // https://github.com/plaid/pattern
      cursor = data.next_cursor;
      if (cursor === "") {
        await sleep(2000);
        continue;
      }

      // Add this page of results
      added = added.concat(data.added);
      modified = modified.concat(data.modified);
      removed = removed.concat(data.removed);
      hasMore = data.has_more;

      prettyPrintResponse(transactionResponse);
    }

    const compareTxnsByDateAscending = (a: { date: string }, b: { date: string }) => (a.date > b.date) ? 1 : -1;
    // Return the 8 most recent transactions
    const recently_added = [...added].sort(compareTxnsByDateAscending).slice(-8);
    response.json({ latest_transactions: recently_added });
    console.log('Transactions fetched at: ' + moment().format('YYYY-MM-DD-HH:mm:ss'));
  } catch (error: any) {
    console.error('Error fetching transactions:', error.response ? error.response.data : error.message);
    response.status(500).send('Error fetching transactions');
  }
});


module.exports = router;