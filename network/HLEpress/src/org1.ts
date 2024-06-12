// routes/assets.js
import express from 'express';
import { connect } from '@hyperledger/fabric-gateway';
const router = express.Router();
import { channelName, chaincodeName, utf8Decoder, newGrpcConnection1, newIdentity1, newSigner1, displayInputParameters1} from './vars';

router.get('/getallassets', async (req, res) => {
  await displayInputParameters1();

  // The gRPC client connection should be shared by all Gateway connections to this endpoint.
  const client = await newGrpcConnection1();

  const gateway = connect({
      client,
      identity: await newIdentity1(),
      signer: await newSigner1(),
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
    const network = gateway.getNetwork(channelName);

    // Get the smart contract from the network.
    const contract = network.getContract(chaincodeName);

    // Initialize a set of asset data on the ledger using the chaincode 'InitLedger' function.
    // await contract.submitTransaction('InitLedger');
    const assets = await contract.submitTransaction('GetAllAssets');
    const resultJson = utf8Decoder.decode(assets);
    const result = JSON.parse(resultJson);
    
    res.send(result);

  } catch(error) {
  console.error('******** FAILED to run the application:', error);
  } finally {
    gateway.close();
    client.close();
  };
});

router.get('/getallhistories', async (req, res) => {
  await displayInputParameters1();

  // The gRPC client connection should be shared by all Gateway connections to this endpoint.
  const client = await newGrpcConnection1();

  const gateway = connect({
      client,
      identity: await newIdentity1(),
      signer: await newSigner1(),
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
    const network = gateway.getNetwork(channelName);

    // Get the smart contract from the network.
    const contract = network.getContract(chaincodeName);

    // Initialize a set of asset data on the ledger using the chaincode 'InitLedger' function.
    // await contract.submitTransaction('InitLedger');
    const assets = await contract.submitTransaction('GetAllHistories');
    const resultJson = utf8Decoder.decode(assets);
    const result = JSON.parse(resultJson);
    
    res.send(result);

  } catch(error) {
  console.error('******** FAILED to run the application:', error);
  } finally {
    gateway.close();
    client.close();
  };
});

router.get('/getallproposals', async (req, res) => {
  await displayInputParameters1();

  // The gRPC client connection should be shared by all Gateway connections to this endpoint.
  const client = await newGrpcConnection1();

  const gateway = connect({
      client,
      identity: await newIdentity1(),
      signer: await newSigner1(),
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
    const network = gateway.getNetwork(channelName);

    // Get the smart contract from the network.
    const contract = network.getContract(chaincodeName);

    // Initialize a set of asset data on the ledger using the chaincode 'InitLedger' function.
    // await contract.submitTransaction('InitLedger');
    const assets = await contract.submitTransaction('GetAllProposals');
    const resultJson = utf8Decoder.decode(assets);
    const result = JSON.parse(resultJson);
    
    res.send(result);

  } catch(error) {
  console.error('******** FAILED to run the application:', error);
  } finally {
    gateway.close();
    client.close();
  };
});

router.post('/addnew', async (req, res) => {
  const data = req.body;
  const name = data.name;
  const size = data.size;

  await displayInputParameters1();

  // The gRPC client connection should be shared by all Gateway connections to this endpoint.
  const client = await newGrpcConnection1();

  const gateway = connect({
      client,
      identity: await newIdentity1(),
      signer: await newSigner1(),
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
      const network = gateway.getNetwork(channelName);

      // Get the smart contract from the network.
      const contract = network.getContract(chaincodeName);

      // Initialize a set of asset data on the ledger using the chaincode 'InitLedger' function.
      // await contract.submitTransaction('InitLedger');
      await contract.submitTransaction('AddAsset', name, size);
      
      
      res.send("Asset added successfully");

    } catch(error) {
    console.error('******** FAILED to run the application:', error);
    } finally {
      gateway.close();
      client.close();
    };

    router.post('/delete', async (req, res) => {
      console.log("body:" + JSON.stringify(req.body)) // Log to debug
      const assets = req.body.assets as string[];
    
      await displayInputParameters1();
    
      // The gRPC client connection should be shared by all Gateway connections to this endpoint.
      const client = await newGrpcConnection1();
    
      const gateway = connect({
          client,
          identity: await newIdentity1(),
          signer: await newSigner1(),
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
          const network = gateway.getNetwork(channelName);
    
          // Get the smart contract from the network.
          const contract = network.getContract(chaincodeName);
    
          // Initialize a set of asset data on the ledger using the chaincode 'InitLedger' function.
          // await contract.submitTransaction('InitLedger');
          for (const asset of assets) {
          await contract.submitTransaction('DeleteAsset', asset);
          }
          
          res.send("Asset deleted successfully");
    
        } catch(error) {
        console.error('******** FAILED to run the application:', error);
        } finally {
          gateway.close();
          client.close();
        };
    });
});

module.exports = router;