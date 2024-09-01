"use client"

import React from 'react';
import { Proposal } from '@/types/assets';

interface ProposalsSectionProps {
  proposals: Proposal[];
  selectedProposals: Proposal[];
  isSelecting: boolean;
  handleSelectProposal: (proposal: Proposal) => void;
}

const ProposalsSection: React.FC<ProposalsSectionProps> = ({ proposals, selectedProposals, isSelecting, handleSelectProposal }) => {
  return (
    <div className="relative w-full h-full">
      <div className="flex overflow-x-auto space-x-4 py-2 relative animate-fade-up mt-3 no-scrollbar min-h-[160px]">
        {proposals?.length > 0 ? (
          proposals.map((proposal: Proposal) => (
            <div
            key={proposal.id}
            className={`flex-none w-64 h-64 p-4 ${
              isSelecting ? 'hover:border-green-400 hover:border-2' : ''
            } ${
              proposal.response ? 'bg-green-400 text-white' : 'bg-white text-black'
            } ${
              selectedProposals.some(selectedProposal => selectedProposal.id === proposal.id)
                ? 'border-red-400'
                : 'border-gray-300'
            } border rounded-lg flex flex-col justify-between shadow-md`}
            onClick={() => handleSelectProposal(proposal)}
            >
              <div>
                <p className="font-bold text-lg">Model: {proposal.model}</p>
                <p className="text-md mt-2">Size: {proposal.size}</p>
                <p className="text-md mt-2">Seller: {proposal.seller}</p>
                <p className="text-md mt-2">Buyer: {proposal.buyer}</p>
                <p className="text-xs mt-2 text-gray-500">Accepted: {proposal.accepted ? 'Yes' : 'No'}</p>
                <p className="text-xs text-gray-500text-xs mt-4 text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">Hash: {proposal.assetHash}</p>
                <p className="text-xs mt-2 text-gray-500">Buyer Accepted: {proposal.response ? 'Yes' : 'No'}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No proposals found.</p>
        )}
      </div>
      <div className="absolute inset-y-0 right-0 w-20 z-30 gradient-blur backdrop-blur-sm"></div>
    </div>
  );
};

export default ProposalsSection;
