// src/store/slices/demoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Asset, Org, Proposal } from '../../types/types';

export interface DemoContext {
  asset?: Asset;
  proposal?: Proposal;
  orgs: Org[];
}

interface DemoState {
  selectedDemo: string;
  status: 'idle' | 'running' | 'paused' | 'stopped';
  currentStep: number;
  context: DemoContext;
  error: string | null;
  success: string | null;
}

const initialState: DemoState = {
  selectedDemo: '',
  status: 'idle',
  currentStep: 0,
  context: {orgs: []},
  error: null,
  success: null,
};

const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    selectDemo(state, action: PayloadAction<string>) {
      state.selectedDemo = action.payload;
      state.status = 'idle'; // Reset status when a new demo is selected
    },
    startDemo(state) {
      state.status = 'running';
      state.currentStep = 0;
      state.error = null;
      state.success = null;
    },
    pauseDemo(state) {
      if (state.status === 'running') {
        state.status = 'paused';
      }
    },
    resumeDemo(state) {
      if (state.status === 'paused') {
        state.status = 'running';
      }
    },
    stopDemo(state) {
      state.status = 'stopped';
      state.currentStep = 0;
      state.context = {orgs: []};
      state.error = null;
      state.success = null;
    },
    demoError(state, action: PayloadAction<string>) {
      state.status = 'stopped';
      state.error = action.payload;
      state.currentStep = 0;
      state.context = {orgs: []};
    },
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    setContextAsset(state, action: PayloadAction<Asset>) {
      state.context.asset = action.payload;
    },
    setContextProposal(state, action: PayloadAction<Proposal>) {
      state.context.proposal = action.payload;
    },
    addOrg(state, action: PayloadAction<Org>) {
      if (state.context.orgs.find((org) => org.MSP === action.payload.MSP)) {
        throw new Error('Organization already exists.');
      }
      state.context.orgs.push(action.payload);
    },
    addAssetToOrg(state, action: PayloadAction<{ orgMSP: string; asset: Asset }>) {
      const org = state.context.orgs.find((org) => org.MSP === action.payload.orgMSP);
      if (org) {
        org.assets.push(action.payload.asset);
      }
    },
    updateAssetsInOrg(state, action: PayloadAction<{ orgMSP: string; assets: Asset[] }>) {
      const org = state.context.orgs.find((org) => org.MSP === action.payload.orgMSP);
      if (org) {
        org.assets = action.payload.assets;
      }
    },
    addProposalToOrg(state, action: PayloadAction<{ orgMSP: string; proposal: Proposal }>) {
      const org = state.context.orgs.find((org) => org.MSP === action.payload.orgMSP);
      if (org) {
        org.proposals.push(action.payload.proposal);
      }
    },
    updateProposalsInOrg(state, action: PayloadAction<{ orgMSP: string; proposals: Proposal[] }>) {
      const org = state.context.orgs.find((org) => org.MSP === action.payload.orgMSP);
      if (org) {
        org.proposals = action.payload.proposals;
      }
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.success = null;
    },
    setSuccess(state, action: PayloadAction<string>) {
      state.success = action.payload;
      state.error = null;
    },
    clearMessages(state) {
      state.error = null;
      state.success = null;
    },
  },
});

export const { 
  selectDemo,
  startDemo,
  pauseDemo,
  resumeDemo,
  stopDemo,
  demoError,
  setCurrentStep,
  setContextAsset,
  setContextProposal,
  addOrg,
  addAssetToOrg,
  updateAssetsInOrg,
  addProposalToOrg,
  updateProposalsInOrg,
  setError,
  setSuccess,
  clearMessages,
} = demoSlice.actions;

export default demoSlice.reducer;
