// src/services/fabricService.ts
import axios from 'axios';
import { Asset, Proposal } from '../types/types';

// Function to create an Axios instance with dynamic org
const createApiClient = (org: string) => {
  return axios.create({
    baseURL: `http://localhost:3000`, // Ensure this matches your Express server port
    headers: {
      'Content-Type': 'application/json',
    },
    // If you need to include 'org' in headers or params, adjust accordingly
    // headers: { 'X-Org': org },
    // params: { org },
  });
};

// Define all service functions
const addNewAsset = async (
  org: string,
  assetData: { name: string; size: string }
) => {
  try {
    const apiClient = createApiClient(org);
    const response = await apiClient.post(`/${org}/addnew`, assetData); // Replace with your actual endpoint
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to add asset');
  }
};

const transferInit = async (
  asset: Asset, 
  buyer: string,
  org: string
) => {
  try {
    const apiClient = createApiClient(org);
    const response = await apiClient.post(`/${org}/transferinit`, {asset: asset, msp: buyer}); // Replace with your actual endpoint
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to transfer asset');
  }
};

const acceptProposal = async (org: string, proposalId: string) => {
  try {
    const apiClient = createApiClient(org);
    const response = await apiClient.post(`/${org}/acceptproposal`, { proposalId }); // Replace with your actual endpoint
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to accept proposal');
  }
};

const transferAsset = async (
  org: string, 
  asset: Asset,
  proposal: Proposal
  ) => {
  try {
    const apiClient = createApiClient(org);
    const response = await apiClient.post(`/${org}/transfer`, {asset: asset, proposal: proposal}); // Replace with your actual endpoint
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to transfer asset');
  }
};

const getProposals = async (org: string) => {
  try {
    const apiClient = createApiClient(org);
    const response = await apiClient.get(`/${org}/getallproposals`); 
    const data = response.data;

    if (Array.isArray(data)) {
      // Parse each JSON string into an object
      const proposals: Proposal[] = data.map((item: string) => {
          try {
              return JSON.parse(item) as Proposal;
          } catch (e) {
              console.error('Failed to parse proposal item:', e);
              return null; // Handle parsing errors as needed
          }
      }).filter((item): item is Proposal => item !== null); // Type guard to filter out nulls

      return proposals;
    } else {
      throw new Error('Invalid data format received from the server.');
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch proposals');
  }
}

// Bundle all functions into a fabricService object
const fabricService = {
  addNewAsset,
  transferInit,
  acceptProposal,
  transferAsset,
  getProposals,
};

// Export the fabricService object as the default export
export default fabricService;
