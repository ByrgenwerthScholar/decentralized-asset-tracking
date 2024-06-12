import stringify from 'json-stringify-deterministic';
import * as mcl from 'mcl-wasm';
const shim = require('fabric-shim');


export const CryptoChaincode = class {

  constructor() {
    this.initCryptoSystem();
  } 

  async initCryptoSystem() {
    await mcl.init(mcl.BN254);  // BN254 is commonly used for its efficiency with pairings.
    console.log('Crypto system initialized.');
  }

  createNewAccumulator() {
    const newAccumulator = new mcl.G1();
    const newAccumulatorHex = this.serializeAccumulator(newAccumulator); // This will store your path accumulation
    return newAccumulatorHex;
  }

  addToAccumulator(accumulatorHex: string, data: string) {
    let newEntry = mcl.hashAndMapToG1(stringify(data));
    let accumulator = this.deserializeAccumulator(accumulatorHex);
    accumulator = mcl.add(accumulator, newEntry);
    const newAccumulatorHex = this.serializeAccumulator(accumulator);
    return newAccumulatorHex;
  }

  serializeAccumulator(accumulator: mcl.G1): string {
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
                return shim.success(await this.createNewAccumulator());
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