/*
 * SPDX-License-identifier: Apache-2.0
 */

import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import { Asset, History, Proposal } from './asset';
import { createHash } from 'crypto';


@Info({title: 'AssetTransfer', description: 'Smart contract for trading assets'})
export class AssetTransferContract extends Contract {
    
    @Transaction()
    public async InitTransaction(ctx: Context, buyerMSP: string): Promise<void> {
        const user = ctx.clientIdentity.getMSPID();

        const assetMap = await ctx.stub.getTransient();
        const asset = JSON.parse(assetMap.get('asset').toString());
        console.log('Asset: ' + asset.id + ' ' + asset.model + ' ' + asset.size);

        if (!asset || !asset.model || !asset.size) {
            throw new Error('Asset information is required');
        }
        
        const timestamp = ctx.stub.getTxTimestamp();
        const parts = timestamp.toString().split(',');
        const seconds = parseInt(parts[0], 10);
        const nanos = parseInt(parts[1], 10);

        // Create the Date object
        const txDate = new Date((seconds * 1000) + (nanos / 1000000));

        // Converting the date to ISO string format
        const date = txDate.toISOString();

        const newProposal: Proposal = {
            id: "P"+this.generateHash(asset.id),
            date: date,
            assetId: asset.id,
            seller: user,
            buyer: buyerMSP,
            model: asset.model,
            size: asset.size,
            accepted: false,
        };

        const ownerProposal: Proposal = {
            id: "P"+this.generateHash(asset.id),
            date: date,
            assetId: asset.id,
            seller: user,
            buyer: buyerMSP,
            model: asset.model,
            size: asset.size,
            accepted: true,
        };

        console.log('Verifying asset');
        const verified = await this.verifyAssetProperties(ctx, asset.id, user); 
        if (!verified) {
            throw new Error('Asset verification failed');
        }
        await ctx.stub.putPrivateData("_implicit_org_" + user, ownerProposal.id, Buffer.from(stringify(sortKeysRecursive(ownerProposal))));
        await ctx.stub.putPrivateData("_implicit_org_" + buyerMSP, newProposal.id, Buffer.from(stringify(sortKeysRecursive(newProposal))));
        console.log('Proposal Id: ' + newProposal.id + ', user: ' + user);
        const eventPayload: Buffer = Buffer.from(`Trade proposal: ${newProposal.id}, sent from ${user}.`);

        // Emit an event after successfully processing the trade agreement
        try {
            ctx.stub.setEvent(`Proposal For ${buyerMSP}`, eventPayload);
        } catch (err) {
            throw new Error(`Error emitting event: ${err}`);
        }
    }

    @Transaction()
    public async AcceptProposal(ctx: Context, id: string): Promise<void> {
        const user = ctx.clientIdentity.getMSPID();
        const proposal = await this.GetProposal(ctx, id);
        if (proposal.buyer !== user) {
            throw new Error(`Proposal ${id} can only be accepted by ${proposal.buyer}`);
        }

        console.log('Verifying asset');
        const verified = await this.verifyAssetProperties(ctx, proposal.assetId, proposal.seller); 
        if (!verified) {
            throw new Error('Asset verification failed');
        }
        proposal.accepted = true;
        await ctx.stub.putPrivateData("_implicit_org_" + user, proposal.id, Buffer.from(stringify(sortKeysRecursive(proposal))));
        
        const eventPayload: Buffer = Buffer.from(`Trade proposal: ${proposal.id} accepted by ${user}.`);
        try {
            ctx.stub.setEvent(`Proposal ${proposal.id} Accepted`, eventPayload);
        } catch (err) {
            throw new Error(`Error emitting event: ${err}`);
        }
    }

    @Transaction()
    public async RejectProposal(ctx: Context, id: string): Promise<void> {
        const user = ctx.clientIdentity.getMSPID();
        const proposal = await this.GetProposal(ctx, id);
        if (proposal.buyer !== user) {
            throw new Error(`Proposal ${id} can only be rejected by ${proposal.buyer}`);
        }
        
        const eventPayload: Buffer = Buffer.from(`Trade proposal: ${proposal.id} rejected by ${user}.`);
        try {
            ctx.stub.setEvent(`Proposal ${proposal.id} Rejected`, eventPayload);
        } catch (err) {
            throw new Error(`Error emitting event: ${err}`);
        }

        await ctx.stub.deletePrivateData("_implicit_org_" + user, id);
    }

    @Transaction()
    public async ConfirmTransferDetails(ctx: Context, proposalId: string): Promise<boolean> {
        const user = ctx.clientIdentity.getMSPID();
        const proposal = await this.GetProposal(ctx, proposalId);
        if (proposal.seller !== user) {
            throw new Error(`Proposal ${proposalId} can only be confirmed by ${proposal.seller}`);
        }
        proposal.accepted = true;
        ctx.stub.putPrivateData("_implicit_org_" + user, proposal.id, Buffer.from(stringify(sortKeysRecursive(proposal))));
        const eventPayload: Buffer = Buffer.from(`Trade proposal: ${proposal.id} confirmed by ${user}.`);
        try {
            ctx.stub.setEvent(`Proposal ${proposal.id} Confirmed`, eventPayload);
        } catch (err) {
            throw new Error(`Error emitting event: ${err}`);
        }
        return true;
    }

    @Transaction()
    public async TransferAsset(ctx: Context): Promise<void> {
        const user = ctx.clientIdentity.getMSPID();

        const Map = await ctx.stub.getTransient();
        const asset: Asset = JSON.parse(Map.get('asset').toString());
        const proposal: Proposal = JSON.parse(Map.get('proposal').toString());

        const assetVerified = await this.verifyAssetProperties(ctx, asset.id, user);
        if (!assetVerified) {
            throw new Error('Asset was changed or could not be verified');
        }
        
        const proposalVerified = await this.verifyProposalProperties(ctx, proposal.id, proposal.seller, proposal.buyer);
        if (!proposalVerified) {
            throw new Error('Proposals do not match.')
        }

        const timestamp = ctx.stub.getTxTimestamp();
        const parts = timestamp.toString().split(',');
        const seconds = parseInt(parts[0], 10);
        const nanos = parseInt(parts[1], 10);

        // Create the Date object
        const txDate = new Date((seconds * 1000) + (nanos / 1000000));

        // Converting the date to ISO string format
        const date = txDate.toISOString();

        const newHistory: History = {
            id: "H"+this.generateHash(proposal.assetId),
            record: {
                type: 'transaction',
                fromOrg: proposal.seller,
                toOrg: proposal.buyer,
                model: asset.model,
                size: asset.size,
                date: date,
            },
        };

        await ctx.stub.putPrivateData("_implicit_org_" + user, newHistory.id, Buffer.from(stringify(sortKeysRecursive(newHistory))));
        await ctx.stub.putPrivateData("_implicit_org_" + proposal.buyer, newHistory.id, Buffer.from(stringify(sortKeysRecursive(newHistory))));
        await ctx.stub.putPrivateData("_implicit_org_" + proposal.buyer, asset.id, Buffer.from(stringify(sortKeysRecursive(asset))));
    
        await ctx.stub.deletePrivateData("_implicit_org_" + user, proposal.id);
        await ctx.stub.deletePrivateData("_implicit_org_" + proposal.buyer, proposal.id);
        await ctx.stub.deletePrivateData("_implicit_org_" + user, proposal.assetId);
        
        const eventPayload: Buffer = Buffer.from(`Asset: ${asset.id} transferred to ${proposal.buyer}.`);
        try {
            ctx.stub.setEvent(`Transfer ${proposal.id} complete.`, eventPayload);
        } catch (err) {
            throw new Error(`Error emitting event: ${err}`);
        }
    }

    @Transaction()
    public async AddAsset(ctx: Context): Promise<void> {
        const user = ctx.clientIdentity.getMSPID();
        const timestamp = ctx.stub.getTxTimestamp();
        const parts = timestamp.toString().split(',');
        const seconds = parseInt(parts[0], 10);
        const nanos = parseInt(parts[1], 10);

        // Create the Date object
        const txDate = new Date((seconds * 1000) + (nanos / 1000000));

        // Converting the date to ISO string format
        const date = txDate.toISOString();

        const Map = await ctx.stub.getTransient();
        const asset: Asset = JSON.parse(Map.get('asset').toString());
        const model = asset.model;
        const size = asset.size.toString();

        const assetID = "A"+this.generateHash(model+size);

        const sizeNumber = parseInt(size);
        if (isNaN(sizeNumber)) {
            throw new Error(`Size must be a valid number. Received: ${size}`);
        }
        const response = await ctx.stub.invokeChaincode('CryptoChaincode', ['createNewAccumulator', ''], 'mychannel');

        if (response.status === 200) {
            // Process the response payload
            const returnedData = response.payload.toString();  // Convert buffer to string
            console.log("Returned Data:", returnedData);
        } else {
            throw new Error(`Failed to invoke due to error: ${response.message}`);
        }
        const newAccumulator = response.payload.toString();
        const newAsset: Asset = {
            id: assetID,
            model: model,
            size: sizeNumber,
            accumulator: newAccumulator,
        };

        const newHistory: History = {
            id: "H"+this.generateHash(assetID),
            record: {
                type: 'add',
                assetId: newAsset.id,
                org: user,
                date: date,
            },
        };

        await ctx.stub.putPrivateData("_implicit_org_"+user, newAsset.id, Buffer.from(stringify(sortKeysRecursive(newAsset))));
        await ctx.stub.putPrivateData("_implicit_org_"+user, newHistory.id, Buffer.from(stringify(sortKeysRecursive(newHistory))));
    }

    // DeleteAsset deletes an given asset from the world state.
    @Transaction()
    public async DeleteAsset(ctx: Context, id: string): Promise<void> {
        const user = ctx.clientIdentity.getMSPID();
        const timestamp = ctx.stub.getTxTimestamp();
        const parts = timestamp.toString().split(',');
        const seconds = parseInt(parts[0], 10);
        const nanos = parseInt(parts[1], 10);

        // Create the Date object
        const txDate = new Date((seconds * 1000) + (nanos / 1000000));

        // Converting the date to ISO string format
        const date = txDate.toISOString();
        const assetID = "A"+id.slice(1);
        console.log('Deleting ' + assetID + ' from ' + user);
        const newHistory: History = {
            id: "H"+this.generateHash(assetID),
            record: {
                type: 'delete',
                id: assetID,
                org: user,
                date: date,
            },
        };
        await ctx.stub.putPrivateData("_implicit_org_" + user, newHistory.id, Buffer.from(stringify(sortKeysRecursive(newHistory))));
        await ctx.stub.deletePrivateData("_implicit_org_" + user, assetID);
    }

    // GetAllAssets returns all assets found in the world state.
    @Transaction(false)
    @Returns('string')
    public async GetAllAssets(ctx: Context): Promise<string[]> {
        const user = ctx.clientIdentity.getMSPID();
        const iterator = ctx.stub.getPrivateDataByRange("_implicit_org_"+user,'A', 'B');
        let results = await this.getAllResults(iterator) as string[];
        console.info('Results:' + results);
        return results;
    }

    @Transaction(false)
    @Returns('string')
    public async GetAllHistories(ctx: Context): Promise<string[]> {
        const user = ctx.clientIdentity.getMSPID();
        const iterator = ctx.stub.getPrivateDataByRange("_implicit_org_"+user,'H', 'P');
        let results = await this.getAllResults(iterator) as string[];
        console.info('Results:' + results);
        return results;
    }

    @Transaction(false)
    @Returns('string')
    public async GetAllProposals(ctx: Context): Promise<string[]> {
        const user = ctx.clientIdentity.getMSPID();
        const iterator = ctx.stub.getPrivateDataByRange("_implicit_org_"+user,'P', 'Q');
        let results = await this.getAllResults(iterator) as string[];
        console.info('Results:' + results);
        return results;
    }

    @Transaction(false)
    @Returns('string')
    private async GetAsset(ctx: Context, id: string): Promise<Asset> {
        const user = ctx.clientIdentity.getMSPID();
        if (!id.startsWith('A')) {
            throw new Error(`Asset id is invalid.`);
        }
        console.log('Checkpoint GetAsset One');
        let assetAsBytes;
            assetAsBytes = await ctx.stub.getPrivateData("_implicit_org_"+user, id);
        
        console.log('Checkpoint GetAsset Two');
        if (!assetAsBytes || assetAsBytes.length === 0) {
            throw new Error(`Asset ${id} does not exist`);
        }
        return JSON.parse(assetAsBytes.toString()) as Asset;
    }

    @Transaction(false)
    @Returns('string')
    private async GetProposal(ctx: Context, id: string): Promise<Proposal> {
        const user = ctx.clientIdentity.getMSPID();
        if (!id.startsWith('P')) {
            throw new Error(`Proposal id is invalid.`);
        }
        const proposalAsBytes = await ctx.stub.getPrivateData("_implicit_org_"+user, id);
        if (!proposalAsBytes || proposalAsBytes.length === 0) {
            throw new Error(`Proposal ${id} does not exist`);
        }
        return JSON.parse(proposalAsBytes.toString()) as Proposal;
    }

    @Transaction(false)
    @Returns('string')
    private async GetHistory(ctx: Context, id: string): Promise<History> {
        const user = ctx.clientIdentity.getMSPID();
        if (!id.startsWith('H')) {
            throw new Error(`History id is invalid.`);
        }
        const historyAsBytes = await ctx.stub.getPrivateData("_implicit_org_"+user, id);
        if (!historyAsBytes || historyAsBytes.length === 0) {
            throw new Error(`History ${id} does not exist`);
        }
        return JSON.parse(historyAsBytes.toString()) as History;
    }

    @Transaction()
    public async InitLedger(ctx: Context) {
        const user = ctx.clientIdentity.getMSPID();
        const models = [
            'Intel 4004',
            'Intel 8086',
            'Intel 80486',
            'Intel Pentium',
            'Intel Core 2 Duo',
            'Intel Core i5-2500K',
            'Intel Core i7-2600K',
            'Intel Core i9-9900K',
            'Intel Xeon Phi',
            'Intel Atom Z2760'
          ];

        const sizes = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
        const timestamp = ctx.stub.getTxTimestamp();
        const parts = timestamp.toString().split(',');
        const seconds = parseInt(parts[0], 10);
        const nanos = parseInt(parts[1], 10);

        // Create the Date object
        const txDate = new Date((seconds * 1000) + (nanos / 1000000));

        // Converting the date to ISO string format
        const date = txDate.toISOString();


        
        for (let i = 0; i < 10; i++) {
            const model = models[i];
            const sizeNumber = sizes[i];
            const assetID = "A"+this.generateHash(model+sizeNumber.toString());
            
            const response = await ctx.stub.invokeChaincode('CryptoChaincode', ['createNewAccumulator', ''], 'mychannel');

            if (response.status === 200) {
                // Process the response payload
                const returnedData = response.payload.toString();  // Convert buffer to string
                console.log("Returned Data:", returnedData);
            } else {
                throw new Error(`Failed to invoke due to error: ${response.message}`);
            }
            const newAccumulator = response.payload.toString();

            const newAsset: Asset = {
                id: assetID,
                model: model,
                size: sizeNumber,
                accumulator: newAccumulator,
            };

            const newHistory: History = {
                id: "H"+this.generateHash(assetID),
                record: {
                    type: 'add',
                    assetId: assetID,
                    org: user,
                    date: date,
                },
            };

            console.log('Adding asset: ' + newAsset.id + ' ' + newAsset.model + ' ' + newAsset.size);
            // Note: sortKeysRecursive and stringify need to be implemented
            await ctx.stub.putPrivateData("_implicit_org_" + user, newAsset.id, Buffer.from(stringify(sortKeysRecursive(newAsset)))); 
            await ctx.stub.putPrivateData("_implicit_org_" + user, newHistory.id, Buffer.from(stringify(sortKeysRecursive(newHistory))));
        }

        console.info('Initialized ledger with 10 assets.');
    }

    async getAllResults(promiseOfIterator) {
        const allResults = [];
        for await (const res of promiseOfIterator) {
            allResults.push(JSON.parse(res.value.toString('utf8')));
        }
        return allResults;
    }

    public generateHash(input:string): string {
        return createHash('sha256').update(input, 'utf8').digest('hex');
    }

    async verifyProposalProperties(ctx: Context, proposalId: string, seller: string, buyer: string): Promise<boolean> {
        const stub = ctx.stub;

        // Get transient data
        let transMap;
        try {
            transMap = stub.getTransient();
        } catch (err) {
            throw new Error(`error getting transient: ${err}`);
        }

        // Check for asset properties in transient data
        const immutablePropertiesJSON = sortKeysRecursive(transMap.get('proposal'));
        if (!immutablePropertiesJSON) {
            throw new Error('asset_properties key not found in the transient map');
        }

        const collectionSeller = "_implicit_org_" + seller; 
        const collectionBuyer = "_implicit_org_" + buyer; 
        
        let buyerHash;
        let sellerHash;
        try {
            buyerHash = await stub.getPrivateDataHash(collectionBuyer, proposalId);
        } catch (err) {
            throw new Error(`failed to read asset private properties hash from buyer's collection: ${err}`);
        }
        if (!buyerHash) {
            throw new Error(`asset private properties hash does not exist: ${proposalId}`);
        }
        try {
            sellerHash = await stub.getPrivateDataHash(collectionSeller, proposalId);
        } catch (err) {
            throw new Error(`failed to read asset private properties hash from seller's collection: ${err}`);
        }
        if (!sellerHash) {
            throw new Error(`asset private properties hash does not exist: ${proposalId}`);
        }
        
        // Calculate hash of the immutable properties
        const hash = createHash('sha256');
        hash.update(immutablePropertiesJSON);
        const calculatedPropertiesHash = hash.digest();


        if (!calculatedPropertiesHash.equals(sellerHash)) {
            throw new Error(`proposal with hash ${calculatedPropertiesHash.toString('hex')} does not match seller on-chain hash ${sellerHash.toString('hex')}`);
        }
        if (!calculatedPropertiesHash.equals(buyerHash)) {
            throw new Error(`proposal with hash ${calculatedPropertiesHash.toString('hex')} does not match buyer on-chain hash ${buyerHash.toString('hex')}`);
        }
        
        return true;
    }
    
    async verifyAssetProperties(ctx: Context, assetID: string, owner: string): Promise<boolean> {
        const stub = ctx.stub;

        // Get transient data
        let transMap;
        try {
            transMap = stub.getTransient();
        } catch (err) {
            throw new Error(`error getting transient: ${err}`);
        }

        // Check for asset properties in transient data
        const immutablePropertiesJSON = sortKeysRecursive(transMap.get('asset'));
        if (!immutablePropertiesJSON) {
            throw new Error('asset_properties key not found in the transient map');
        }


        const collectionOwner = "_implicit_org_" + owner; // Assuming ownerOrg property and buildCollectionName method exist
        
        let immutablePropertiesOnChainHash;
        try {
            immutablePropertiesOnChainHash = await stub.getPrivateDataHash(collectionOwner, assetID);
        } catch (err) {
            throw new Error(`failed to read asset private properties hash from seller's collection: ${err}`);
        }
        if (!immutablePropertiesOnChainHash) {
            throw new Error(`asset private properties hash does not exist: ${assetID}`);
        }
        
        // Calculate hash of the immutable properties
        const hash = createHash('sha256');
        hash.update(immutablePropertiesJSON);
        const calculatedPropertiesHash = hash.digest();

        // Verify that the calculated hash matches the on-chain hash
        if (!calculatedPropertiesHash.equals(immutablePropertiesOnChainHash)) {
            throw new Error(`transient asset hash ${calculatedPropertiesHash.toString('hex')} does not match on-chain asset hash ${immutablePropertiesOnChainHash.toString('hex')}`);
        }
        
        return true;
    }

}




 