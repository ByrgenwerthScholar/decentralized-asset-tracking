// components/Hyperledger.tsx
'use client'

import React, { useState, useEffect } from 'react';
import Popover from '../shared/popover';
import { ChevronDown } from 'lucide-react';
import { useAddAssetModal } from '@/components/home/add-asset-modal';
import { useTransferModal } from '@/components/home/transfer-modal';
import { Asset, Proposal } from '@/types/assets';
import AssetsSection from '../home/asset-section';
import ProposalsSection from '../home/proposal-section';
import TransactionsSection from '../home/transfer-section';
import NotificationBell from '../shared/notification';

export default function Hyperledger() {
  const [organization, setOrganization] = useState('Organization');
  const [triggerEffect, setTriggerEffect] = useState(0);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);
  const [selectedProposals, setSelectedProposals] = useState<Proposal[]>([]);
  const { DemoModal: AddAssetModal } = useAddAssetModal({
    setShowDemoModal: setShowAddAssetModal,
    showDemoModal: showAddAssetModal,
    setTriggerEffect,
    organization,
  });
  const { DemoModal: TransferModal } = useTransferModal({
    setShowDemoModal: setShowTransferModal,
    showDemoModal: showTransferModal,
    setTriggerEffect,
    selectedAssets,
    organization,
  });
  const [openPopover, setOpenPopover] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [orgData, setOrgData] = useState<Asset[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const transactions = [
    'Transaction 1',
    'Transaction 2',
    'Transaction 3',
    'Transaction 4',
    'Transaction 5',
    'Transaction 6',
    'Transaction 7',
    'Transaction 8',
    'Transaction 9',
    'Transaction 10',
  ];

  const handleSelectAsset = (asset: Asset) => {
    if (isSelecting) {
      setSelectedAssets((prevAssets) => {
        const assetIndex = prevAssets.findIndex(
          (element) => element.id === asset.id
        );
        if (assetIndex > -1) {
          return prevAssets.filter((_, index) => index !== assetIndex);
        } else {
          return [...prevAssets, asset];
        }
      });
    }
  };

  const handleSelectProposal = (proposal: Proposal) => {
    if (isSelecting) {
      setSelectedProposals((prevProposals) => {
        const proposalIndex = prevProposals.findIndex(
          (element) => element.id === proposal.id
        );
        if (proposalIndex > -1) {
          return prevProposals.filter((_, index) => index !== proposalIndex);
        } else {
          return [...prevProposals, proposal];
        }
      });
    }
  };

  const handleAcceptSelectedProposals = async () => {
    if (selectedProposals.length === 0) {
      console.error('No proposal selected');
      return;
    }

    try {
      const proposalIds = selectedProposals.map((proposal) => proposal.id);

      if (organization === 'Seller') {
        const response = await fetch(
          `http://localhost:3001/org1/acceptproposal`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ proposal: proposalIds[0] }),
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
      } else if (organization === 'Buyer') {
        const response = await fetch(
          `http://localhost:3001/org2/acceptproposal`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ proposal: proposalIds[0] }),
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
      }

      // Update proposal state locally to mark them as accepted
      setProposals((prevProposals) =>
        (prevProposals || []).map((proposal) =>
          proposalIds.includes(proposal.id)
            ? { ...proposal, accepted: true }
            : proposal
        )
      );

      console.log(`Proposals accepted successfully.`);
    } catch (error) {
      console.error('Failed to accept proposals:', error);
    }
  };

  const handleDeleteAssets = async () => {
    try {
      const assetIds = selectedAssets.map((asset) => asset.id);

      if (organization === 'Seller') {
        const response = await fetch(`http://localhost:3001/org1/delete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ assets: assetIds }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
      } else if (organization === 'Buyer') {
        const response = await fetch(`http://localhost:3001/org2/delete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ assets: assetIds }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
      }

      console.log('Successfully deleted assets:', assetIds);
      setTriggerEffect((prev) => prev + 1);
      setSelectedAssets([]);
    } catch (error) {
      console.error('Failed to delete assets:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/hyper-fabric/getdata/${organization}`,
          { cache: 'no-store' }
        );
        const data = await response.json();
        setOrgData(data);
      } catch (error) {
        console.log('Error fetching data:', error);
        setOrgData([]);
      }
  
      try {
        let data: any;
        if (organization === 'Seller') {
          const response = await fetch(
            `http://localhost:3001/org1/getallproposals`
          );
          if (!response.ok) {
            console.log('Error fetching proposals from Seller:', response.statusText);
            throw new Error(`Error: ${response.statusText}`);
          }
          data = await response.json();
          setProposals(data);
        } else if (organization === 'Buyer') {
          const response = await fetch(
            `http://localhost:3001/org2/getallproposals`
          );
          if (!response.ok) {
            console.log('Error fetching proposals from Buyer:', response.statusText);
            throw new Error(`Error: ${response.statusText}`);
          }
          data = await response.json();
          setProposals(data);
        }
        console.info('Fetched proposals:');
        await checkProposals(data, organization);
      } catch (error) {
        console.log('Error fetching proposals:', error);
        setProposals([]);
      }
      
    };
  
    fetchData();
  }, [organization, triggerEffect]);

  
  const checkProposals = async (proposals: Proposal[], organization: string) => {
    //TODO: CHECK PROPOSALS does not change ui color, and returns proposal that is not accepted by both organizations.
    if (proposals.length === 0) {
      console.info('No proposals to check');
      return; // No proposals to check
    }
    console.info('Checking proposals:', proposals);
    const proposalIds = proposals.map((proposal) => proposal.id);

    try {
      let data: any;

      if (organization === 'Seller') {
        const response = await fetch(
          `http://localhost:3001/org1/checkproposals`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ proposals: proposalIds }),
          }
        );
        if (!response.ok) {
          console.log('Error checking proposals from Seller:', response.statusText);
          throw new Error(`Error: ${response.statusText}`);
        }
        data = await response.json();
      } else if (organization === 'Buyer') {
        const response = await fetch(
          `http://localhost:3001/org2/checkproposals`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ proposals: proposalIds }),
          }
        );
        if (!response.ok) {
          console.log('Error checking proposals from Buyer:', response.statusText);
          throw new Error(`Error: ${response.statusText}`);
        }
        data = await response.json();
      }
      setProposals((prevProposals) =>
        prevProposals.map((proposal) =>
          data.includes(proposal.id) ? { ...proposal, response: true } : proposal
        )
      );
    } catch (error) {
      console.log('Error checking proposals:', error);
    }
  };
  

  return (
    <>
      <div className="absolute top-4 right-4">
        <NotificationBell />
      </div>
      <AddAssetModal />
      <TransferModal />
      <div className="flex flex-row z-20 mt-10 mb-3 w-full max-w-7xl">
        <div className="flex flex-row">
          <Popover
            content={
              <div className="w-full rounded-md bg-white p-2 m:w-40">
                <button
                  onClick={() => {
                    setOrganization('Seller');
                    setOpenPopover(!openPopover);
                    setTriggerEffect((prev) => prev + 1);
                  }}
                  className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
                >
                  Seller Company
                </button>
                <button
                  onClick={() => {
                    setOrganization('Buyer');
                    setOpenPopover(!openPopover);
                    setTriggerEffect((prev) => prev + 1);
                  }}
                  className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
                >
                  Buyer Company
                </button>
                <button
                  onClick={() => {
                    setOrganization('Authority');
                    setOpenPopover(!openPopover);
                    setTriggerEffect((prev) => prev + 1);
                  }}
                  className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
                >
                  Domestic Authority
                </button>
              </div>
            }
            openPopover={openPopover}
            setOpenPopover={setOpenPopover}
          >
            <button className="bg-white flex justify-between rounded-md border border-gray-300 px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100 shadow-md animate-fade-up">
              <p className="text-gray-600 text-xl">{organization}</p>
              <ChevronDown
                className={`h-6 w-6 text-gray-600 transition-all mt-1 ${
                  openPopover ? 'rotate-180' : ''
                }`}
              />
            </button>
          </Popover>
          <button
            onClick={
              isSelecting
                ? () => {
                    setIsSelecting(false);
                    setSelectedAssets([]);
                    setSelectedProposals([]);
                  }
                : () => {
                    setIsSelecting(true);
                  }
            }
            className={`flex w-59 ml-2 items-center border bg-black justify-between rounded-md px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100 active:text-black ${
              isSelecting ? 'bg-gray-100 text-black' : 'bg-black text-white'
            }`}
          >
            Select
          </button>
        </div>
      </div>
      <div className="z-20 my-10 mt-1 flex flex-col max-w-7xl p-5 px-10 border border-gray-200 bg-white shadow-md animate-fade-up mx-40 rounded-xl min-w-[1280px]">
        <div className="flex flex-row justify-between gap-1 w-full">
          <div className="flex flex-row items-center">
            {organization != 'Organization' ? (
              <p className="text-lg font-bold">{organization}&apos;s Inventory</p>
            ) : (
              <p className="font-bold text-lg">Inventory</p>
            )}
          </div>
          <div className="flex flex-row gap-1">
            <button
              className="flex w-59 items-center border bg-green-400 justify-between rounded-md px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100 active:text-black text-white"
              onClick={() => setShowAddAssetModal(true)}
              disabled={organization == 'Organization'}
            >
              Add Asset
            </button>
            <button
              className="flex w-59 items-center bg-blue-400 justify-between rounded-md border px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100 active:text-black text-white"
              onClick={() => setShowTransferModal(true)}
              disabled={organization == 'Organization'}
            >
              Transfer Assets
            </button>
            <button
              className="flex w-59 items-center bg-red-400 justify-between rounded-md border px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100 active:text-black text-white"
              onClick={handleDeleteAssets}
              disabled={organization == 'Organization' || selectedAssets.length == 0}
            >
              Delete Assets
            </button>
          </div>
        </div>
        <AssetsSection
          orgData={orgData}
          selectedAssets={selectedAssets}
          isSelecting={isSelecting}
          handleSelectAsset={handleSelectAsset}
        />
      </div>
      <div className="z-20 my-10 mt-1 flex flex-col max-w-7xl p-5 px-10 border border-gray-200 bg-white shadow-md animate-fade-up mx-40 rounded-xl w-full">
        <div className="flex flex-row justify-between gap-1 w-full">
          <div className="flex flex-row items-center">
            {organization !== 'Organization' ? (
              <p className="text-lg font-bold">{organization}&apos;s Proposals</p>
            ) : (
              <p className="font-bold text-lg">Proposals</p>
            )}
          </div>
          <div className="flex flex-row gap-1">
            <button
              className="flex w-59 items-center bg-blue-500 justify-between rounded-md border px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100 active:text-black text-white"
              onClick={handleAcceptSelectedProposals}
              disabled={organization === 'Organization' || selectedProposals.length === 0}
            >
              Accept Proposals
            </button>
          </div>
        </div>
        <ProposalsSection
          proposals={proposals}
          selectedProposals={selectedProposals}
          isSelecting={isSelecting}
          handleSelectProposal={handleSelectProposal}
        />
      </div>
      <div className="z-20 mt-0 flex flex-col max-w-7xl p-5 px-10 border border-gray-200 bg-white shadow-md animate-fade-up mx-40 rounded-xl">
        <div className="flex flex-row justify-center items-center">
          <p className="font-bold text-lg">Transaction History</p>
        </div>
        <TransactionsSection transactions={transactions} />
      </div>
    </>
  );
}
