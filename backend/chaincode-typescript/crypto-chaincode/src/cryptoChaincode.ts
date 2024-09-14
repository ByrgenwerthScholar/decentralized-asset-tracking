import stringify from 'json-stringify-deterministic';
import * as mcl from 'mcl-wasm';
const shim = require('fabric-shim');

const CryptoChaincode = class {

  constructor() {
    this.initCryptoSystem();
  } 

  async initCryptoSystem() {
    await mcl.init(mcl.BN254);  // BN254 is commonly used for its efficiency with pairings.
    console.log('Crypto system initialized.');
  }

  async createNewAccumulator() {
    const g1 = new mcl.G1();
    const g2 = new mcl.G2();
    const g1Hex = this.serializeAccumulator(g1);
    const g2Hex = this.serializeAccumulator(g2);
    try {
      await shim.putState('g2', Buffer.from(g2Hex));
    } catch (err) {
      console.log('Error storing g2 accumulator in cryptoChaincode: ', err);
    }
    console.log('Successfully created new accumulator...');
    return g1Hex;
  }

  addToAccumulator(accumulatorHex: string, data: string) {
    console.log('Adding to accumulator... string: ', accumulatorHex, ' data: ', data);
    let newEntry = mcl.hashAndMapToG1(data);
    let accumulator = this.deserializeAccumulator(accumulatorHex);
    accumulator = mcl.add(accumulator, newEntry);
    const newAccumulatorHex = this.serializeAccumulator(accumulator);
    return newAccumulatorHex;
  }

  serializeAccumulator(accumulator: mcl.G1 | mcl.G2): string {
    const serializedData = accumulator.serializeToHexStr();
    return serializedData;
  }

  deserializeAccumulator(serializedData): mcl.G1 {
    let accumulator = new mcl.G1();
    accumulator.deserializeHexStr(serializedData);
    return accumulator;
  }

	async Init(stub) {
		return shim.success(Buffer.from('Initialized Successfully!'));
	}

  async Invoke(stub) {

    const { fcn, params } = stub.getFunctionAndParameters();
        console.log(`Invoke function: ${fcn} with params: ${params}`);

        switch (fcn) {
            case 'createNewAccumulator':
              const newAccumulator = this.createNewAccumulator();
              return shim.success(Buffer.from(newAccumulator));
            case 'addToAccumulator':
              if (params.length < 2) {
                return shim.error('addToAccumulator expects two arguments: accumulatorHex and data');
              }
            // Correctly extract the accumulatorHex and data from params
              const accumulatorHex = params[0];
              const data = params[1];
              const updatedAccumulatorHex = await this.addToAccumulator(accumulatorHex, data);
              return shim.success(Buffer.from(updatedAccumulatorHex));
            default:
                return shim.error(`No function named ${fcn} in this chaincode.`);
        }
    }
	
}

shim.start(new CryptoChaincode());


  // async generateZKP(locationHash) {
   // // Simplified example: Generate a ZKP for a location
  //   let hash = mcl.hashAndMapToG1(locationHash);
  //   let zkp = mcl.pairing(hash, mcl.G2.base());
  //   return zkp;
  // }
  
  // async verifyZKP(zkp, locationHash) {
  //   // Verify the ZKP against the current accumulator state
  //   let hash = mcl.hashAndMapToG1(locationHash);
  //   let pairing = mcl.pairing(hash, mcl.G2.base());
  //   return zkp.isEqual(pairing);
  // }