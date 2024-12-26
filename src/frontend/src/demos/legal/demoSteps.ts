// src/demos/legal/demoSteps.ts

import fabricService from '../../services/fabricService';
import { Asset, Proposal, Org } from '../../types/types';
import { AppDispatch, RootState } from '../../store/store';
import {
  setContextAsset,
  setContextProposal,
  addOrg,
  addAssetToOrg,
  addProposalToOrg,
  updateProposalsInOrg,
  setError,
} from '../../store/slices/demoSlice';

// Update the DemoStep type to accept dispatch and getState
export type DemoStep = (dispatch: AppDispatch, getState: () => RootState) => Promise<void>;

export const demoSteps: DemoStep[] = [

  // Step 1: Add Organization
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const org: Org = { MSP: 'Org1MSP', assets: [], proposals: [], history: [] };
    dispatch(addOrg(org));
    console.log('Organization Org1MSP added.');
  },

  // Step 2: Add Asset
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const assetData = { name: 'Asset1', size: '400' };
      const asset: Asset = await fabricService.addNewAsset('Org1MSP', assetData);
      console.log('Asset added successfully.', asset);

      // Update context and org with the new asset
      dispatch(setContextAsset(asset));
      dispatch(addAssetToOrg({ orgMSP: 'Org1MSP', asset: asset }));
    } catch (error: any) {
      console.error('Error adding asset:', error);
      dispatch(setError(error.message || 'Failed to add asset'));
      throw error; // Re-throw to halt execution
    }
  },

  // Step 3: Init Transfer Asset
  async (dispatch: AppDispatch, getState: () => RootState) => {  
    try {
      const { demo: { context } } = getState();
      if (!context.asset) {
        throw new Error('Asset data is missing. Cannot transfer.');
      }

      const buyerMSP = 'Org2MSP';
      const sellerMSP = 'Org1MSP';

      const proposal: Proposal = await fabricService.transferInit(context.asset, buyerMSP, sellerMSP);
      console.log('Proposal sent successfully.', proposal);

      // Update context and org with the new proposal
      dispatch(setContextProposal(proposal));
      dispatch(addProposalToOrg({ orgMSP: sellerMSP, proposal }));
    } catch (error: any) {
      console.error('Error initializing transfer:', error);
      dispatch(setError(error.message || 'Failed to initialize transfer'));
      throw error; // Re-throw to halt execution
    }
  },

  // Step 4: Add Org2 and updateProposalsInOrg
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const org: Org = { MSP: 'Org2MSP', assets: [], proposals: [], history: [] };
      dispatch(addOrg(org));
      console.log('Organization Org2MSP added.');

      const proposals: Proposal[] = await fabricService.getProposals('Org2MSP');
      console.log('Proposals received successfully.', proposals);
      console.log('Proposal assetId', proposals[0].assetId);

      dispatch(updateProposalsInOrg({ orgMSP: 'Org2MSP', proposals }));
      dispatch(setContextProposal(proposals[0]));
    } catch (error: any) {
      console.error('Error updating proposals:', error);
      dispatch(setError(error.message || 'Failed to update proposals'));
      throw error;
    }
  },

  // Step 5: Accept Proposal
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { demo: { context } } = getState();
      if (!context.proposal) {
        throw new Error('Proposal data is missing. Cannot accept.');
      }
      console.log('Proposal Being Sent:', context.proposal);
      console.log('Proposal ID Being Sent:', context.proposal.id);
      await fabricService.acceptProposal('Org2MSP', context.proposal.id);
      console.log('Proposal accepted successfully.');
    } catch (error: any) {
      console.error('Error accepting proposal:', error); 
      dispatch(setError(error.message || 'Failed to accept proposal'));
      throw error;
    }
  },

  //Step 6: Update Proposal Again
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {

      let proposals: Proposal[] = await fabricService.getProposals('Org2MSP');
      dispatch(updateProposalsInOrg({ orgMSP: 'Org2MSP', proposals }));
      dispatch(setContextProposal(proposals[0]));
      console.log("Org2: ", proposals[0]);

      proposals = await fabricService.getProposals('Org1MSP');
      console.log("Org1: ", proposals[0]);
      
    } catch (error: any) {
      console.error('Error updating proposals:', error);
      dispatch(setError(error.message || 'Failed to update proposals'));
      throw error;
    }
  },

  // Step 7: Transfer Asset
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { demo: { context } } = getState();
      if (!context.asset || !context.proposal) {
        throw new Error('Asset or Proposal data is missing. Cannot transfer.');
      }

      const transferredAsset: Asset = await fabricService.transferAsset('Org1MSP', context.asset, context.proposal);
      console.log('Asset transferred successfully.', transferredAsset);

      // Update context and org with the transferred asset
      dispatch(setContextAsset(transferredAsset));
      dispatch(addAssetToOrg({ orgMSP: 'Org2MSP', asset: transferredAsset }));
    } catch (error: any) {
      console.error('Error transferring asset:', error);
      dispatch(setError(error.message || 'Failed to transfer asset'));
      throw error; // Re-throw to halt execution
    }
  }
];
