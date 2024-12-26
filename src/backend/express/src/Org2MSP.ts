// routes/assets.js
import express from 'express';
import { Buffer } from 'buffer';
import stringify from 'json-stringify-deterministic';
import { connect, Contract } from '@hyperledger/fabric-gateway';
const router = express.Router();
const userMSP = 'Org2MSP';
import { channelName, chaincodeName, utf8Decoder, newGrpcConnection2, newIdentity2, newSigner2, displayInputParameters2} from './utils/vars';

router.get('/getallassets', async (req, res) => {
  await displayInputParameters2();


  // The gRPC client connection should be shared by all Gateway connections to this endpoint.
  const client = await newGrpcConnection2();

  const gateway = connect({
      client,
      identity: await newIdentity2(),
      signer: await newSigner2(),
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

    const assets = await contract.submitTransaction('GetAllAssets')
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
  await displayInputParameters2();

  // The gRPC client connection should be shared by all Gateway connections to this endpoint.
  const client = await newGrpcConnection2();

  const gateway = connect({
      client,
      identity: await newIdentity2(),
      signer: await newSigner2(),
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
  await displayInputParameters2();

  // The gRPC client connection should be shared by all Gateway connections to this endpoint.
  const client = await newGrpcConnection2();

  const gateway = connect({
      client,
      identity: await newIdentity2(),
      signer: await newSigner2(),
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
  console.log("GETTING PROPPOSALS");
  try {
    // Get a network instance representing the channel where the smart contract is deployed.
    const network = gateway.getNetwork(channelName);

    // Get the smart contract from the network.
    const contract = network.getContract(chaincodeName);

    const proposals = await contract.submitTransaction('GetAllProposals')
    const resultJson = utf8Decoder.decode(proposals);
    let result = JSON.parse(resultJson);

    if (!Array.isArray(result)) {
        result = [result];
    }
    res.status(200).json(result);

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

  await displayInputParameters2();

  // The gRPC client connection should be shared by all Gateway connections to this endpoint.
  const client = await newGrpcConnection2();

  const gateway = connect({
      client,
      identity: await newIdentity2(),
      signer: await newSigner2(),
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
      const contract: Contract = network.getContract(chaincodeName);
      

      // Initialize a set of asset data on the ledger using the chaincode 'InitLedger' function.
      // await contract.submitTransaction('InitLedger');
      const transientData = {
        asset: Buffer.from(JSON.stringify({
            model: name,
            size: size
        }))
        };

    const asset = await contract.submit('AddAsset', {transientData: transientData});
    const resultJson = utf8Decoder.decode(asset);


    // Parse the JSON string
    const result = JSON.parse(resultJson);

    res.status(200).send(result);
    
    } catch(error) {
    console.error('******** FAILED to run the application:', error);
    } finally {
      gateway.close();
      client.close();
    };
});

router.post('/delete', async (req, res) => {
    console.log("body:" + JSON.stringify(req.body)) // Log to debug
    const assets = req.body.assets as string[];

    await displayInputParameters2();

    // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    const client = await newGrpcConnection2();

    const gateway = connect({
        client,
        identity: await newIdentity2(),
        signer: await newSigner2(),
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


router.post('/transferinit', async (req, res) => {
    const data = req.body;
    const asset = data.asset;
    const msp = data.msp
    console.log("asset: " + asset.id + asset.model + asset.size + typeof(asset.size));
    // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    const client = await newGrpcConnection2();

    const gateway = connect({
        client,
        identity: await newIdentity2(),
        signer: await newSigner2(),
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
        const contract: Contract = network.getContract(chaincodeName);

        // Prepare the transient data
        const transientData = {
            asset: Buffer.from(stringify({
                id: asset.id,
                model: asset.model,
                size: asset.size,
                accumulator: asset.accumulator,
            })),
            msp: Buffer.from(msp),
        };
        // Submit the InitTransaction transaction
        const proposal = await contract.submit('InitTransaction', {
            transientData: transientData,
            endorsingOrganizations: [msp, userMSP]
        });

        // Convert Uint8Array to Buffer, then to string
        const resultJson = utf8Decoder.decode(proposal);
    

        // Parse the JSON string
        const result = JSON.parse(resultJson);

        res.status(200).send(result);


    } catch (error) {
        console.error('******** FAILED to run the application:', error);
        res.status(500).send('Failed to initialize transaction');
    } finally {
        gateway.close();
        client.close();
    };
});

router.post('/acceptproposal', async (req, res) => {
    const data = req.body;
    const proposalId = data.proposalId;
    console.log("proposal: " + proposalId);
    // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    const client = await newGrpcConnection2();

    const gateway = connect({
        client,
        identity: await newIdentity2(),
        signer: await newSigner2(),
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
        const network = gateway.getNetwork(channelName);

        // Get the smart contract from the network.
        const contract: Contract = network.getContract(chaincodeName);
 
        await contract.submitTransaction('AcceptProposal', proposalId);

        res.send("Transaction initialized successfully");

    } catch (error) {
        console.error('******** FAILED to run the application:', error);
        res.status(500).send('Failed to initialize transaction');
    } finally {
        gateway.close();
        client.close();
    };
});

router.post('/checkproposals', async (req, res) => {
    const data = req.body;
    const proposals = data.proposals;
    console.log('Received proposalIds:', proposals);
    // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    const client = await newGrpcConnection2();

    const gateway = connect({
        client,
        identity: await newIdentity2(),
        signer: await newSigner2(),
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
        const contract: Contract = network.getContract(chaincodeName);
 
        // Submit the InitTransaction transaction
        const data = await contract.evaluate('CheckProposalAccepted', { arguments: [ stringify(proposals) ] });
        
        const resultJson = utf8Decoder.decode(data);
        const result = JSON.parse(resultJson);
        console.log("CheckProposal result: " + result);
        res.send(result);

    } catch (error) {
        console.error('******** FAILED to run the application:', error);
        res.status(500).send('Failed to initialize transaction');
    } finally {
        gateway.close();
        client.close();
    };

});

router.post('/transfer', async (req, res) => {
    const { asset, proposal } = req.body;

    // Basic input validation
    if (!asset || !proposal) {
        return res.status(400).json({ message: 'Asset and Proposal data are required.' });
    }

    // Optional: Display input parameters for debugging
    await displayInputParameters2();

    // Establish a new gRPC connection
    const client = await newGrpcConnection2();

    // Create a new Gateway instance and connect
    const gateway = connect({
        client,
        identity: await newIdentity2(),
        signer: await newSigner2(),
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
        const network = gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(chaincodeName);

        // Prepare transient data
        const transientData = {
            asset: Buffer.from(JSON.stringify(asset)),
            proposal: Buffer.from(JSON.stringify(proposal)),
        };

        await contract.submit('TransferAsset', {transientData: transientData});

        res.status(200).json({ message: 'Asset transfer initiated successfully.' });
    } catch (error: any) {
        console.error('Transaction failed:', error);
        res.status(500).json({ message: 'Asset transfer failed.', error: error.message });
    } finally {
        gateway.close();
        client.close();
    }
});

module.exports = router;