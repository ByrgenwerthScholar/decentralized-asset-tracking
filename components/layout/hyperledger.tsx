"use client"

import { useState, useEffect } from "react";
import Popover from "../shared/popover";
import { ChevronDown } from "lucide-react";
import { useAddAssetModal } from "@/components/home/add-asset-modal";
import { useTransferModal } from "@/components/home/transfer-modal";
import { Asset } from "@/types/assets";

export default function Hyperledger() {
  const [organization, setOrganization] = useState("Organization");
  const [triggerEffect, setTriggerEffect] = useState(0);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const { DemoModal: AddAssetModal } = useAddAssetModal({ setShowDemoModal: setShowAddAssetModal, showDemoModal: showAddAssetModal, setTriggerEffect: setTriggerEffect, organization} );
  const { DemoModal: TransferModal } = useTransferModal({ setSelectedAssets, selectedAssets, setShowDemoModal: setShowTransferModal, showDemoModal: showTransferModal});
  const [openPopover, setOpenPopover] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [orgData, setOrgData] = useState<Asset[]>([]);
  const transactions = ["Transaction 1", "Transaction 2", "Transaction 3", "Transaction 4", "Transaction 5", "Transaction 6", "Transaction 7", "Transaction 8", "Transaction 9", "Transaction 10"];
  
  const handleSelectAsset = (asset: string) => {
    if (isSelecting) {
      setSelectedAssets(prevAssets => {
        const assetIndex = prevAssets.findIndex((element) => element === asset);
        if (assetIndex > -1) {
          // Asset is already selected, remove it
          return prevAssets.filter((_, index) => index !== assetIndex);
        } else {
          // Asset not selected, add it
          return [...prevAssets, asset];
        }
      });
    }
  };

  const handleDeleteAssets = async () => { 
    try {
      if (organization === "Seller") {
        const response = await fetch(`http://localhost:3001/org1/delete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({assets: selectedAssets}),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
      } else if (organization === "Buyer") {
        const response = await fetch(`http://localhost:3001/org2/delete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({assets: selectedAssets}),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
      }
    
      console.log('Successfully deleted assets:', selectedAssets);
      setTriggerEffect((prev) => prev + 1); // Trigger a re-fetch of the data
      setSelectedAssets([]); // Clear selected assets
    } catch (error) {
      console.error('Failed to delete assets:', error);
    }
  }
  useEffect(() => {

    // Function to fetch data based on the selected organization
    const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/hyper-fabric/getdata/${organization}`, { cache: 'no-store' });
      const data = await response.json();
      setOrgData(data); // Update the state with the fetched data
    } catch (error) {
      console.log("Error fetching data:", error);
      setOrgData([]); // Reset the data or set error state as needed
    }
  };

    fetchData();
  }, [organization, triggerEffect]);
  return (
    <>
      <AddAssetModal />
      <TransferModal />
      <div className="flex flex-row z-20 mt-10 mb-3 w-full max-w-7xl">
        <p>{triggerEffect}</p>
        <div>
          <Popover
            content={
              <div className="w-full rounded-md bg-white p-2 m:w-40">
                <button  onClick={() => {setOrganization("Seller"); setOpenPopover(!openPopover); setTriggerEffect((prev) => prev + 1)}} className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                  Seller Company 
                </button>
                <button onClick={() => {setOrganization("Buyer"); setOpenPopover(!openPopover); setTriggerEffect((prev) => prev + 1)}} className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                  Buyer Company 
                </button>
                <button onClick={() => {setOrganization("Authority"); setOpenPopover(!openPopover); setTriggerEffect((prev) => prev + 1)}} className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                  Domestic Authority
                </button>
              </div>
            }
            openPopover={openPopover}
            setOpenPopover={setOpenPopover}
          >
            <button
              className="bg-white flex justify-between rounded-md border border-gray-300 px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100 shadow-md animate-fade-up"
            >
              <p className="text-gray-600 text-xl">{organization}</p>
              <ChevronDown
                className={`h-6 w-6 text-gray-600 transition-all mt-1 ${openPopover ? "rotate-180" : ""
                  }`}
              />
            </button>
          </Popover> 
        </div>
      </div>
      <div className="z-20 my-10 mt-1 flex flex-col max-w-7xl p-5 px-10 border border-gray-200 bg-white shadow-md animate-fade-up mx-40 rounded-xl min-w-[1280px]">
        <div className="flex flex-row justify-between gap-1 w-full">
          <div>
            <button
              onClick={isSelecting ? () => {setIsSelecting(false); setSelectedAssets([])} : () => {setIsSelecting(true)}}
              className={`flex w-59 items-center border bg-black justify-between rounded-md px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100 active:text-black ${isSelecting ? "bg-gray-100 text-black" : "bg-black text-white"}`}
            >
              Select Assets
            </button>
          </div>
          <div className="flex flex-row items-center">
            {organization!="Organization" ? <p className="text-lg font-bold">{organization}&apos;s Inventory</p> : <p className="font-bold text-lg">Inventory</p>}
          </div>
          <div className="flex flex-row gap-1">
            <button
              className="flex w-59 items-center border bg-green-400 justify-between rounded-md px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100 active:text-black text-white"
              onClick={() => setShowAddAssetModal(true)}
              disabled={organization == "Organization"}
            >
              Add Asset
            </button>
            <button
              className="flex w-59 items-center bg-blue-400 justify-between rounded-md border px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100 active:text-black text-white"
              onClick={() => setShowTransferModal(true)}
              disabled={organization == "Organization"}
            >
              Transfer Assets
            </button> 
            <button
              className="flex w-59 items-center bg-red-400 justify-between rounded-md border px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100 active:text-black text-white"
              onClick={handleDeleteAssets}
              disabled={organization == "Organization" || selectedAssets.length == 0}
            >
              Delete Assets
            </button> 
          </div>
        </div> 
        <div className="relative w-full h-full">
          <div className="flex overflow-x-auto space-x-4 py-2 relative animate-fade-up mt-3 no-scrollbar min-h-[160px]">
            {(orgData.length > 0) ? (
              orgData.map((asset: Asset) => (
              <div key="{asset}" className={`flex-none w-48 h-40 ${isSelecting ? "hover:border-green-400 hover:border-2" : ""} ${selectedAssets.includes(asset.ID) ? 'bg-green-400 text-white hover:border-red-400' : 'bg-white text-black'} border border-gray-300 rounded-lg flex items-center justify-center shadow-md`} onClick={() => handleSelectAsset(asset.ID)}>
                <p className="font-bold">{asset.Model}</p> 
              </div> ))) 
                : (<p></p>)}
        </div>
        <div className="absolute inset-y-0 right-0 w-20 z-30 gradient-blur backdrop-blur-sm"></div>
        </div>
      </div>
      <div className="z-20 mt-0 flex flex-col max-w-7xl p-5 px-10 border border-gray-200 bg-white shadow-md animate-fade-up mx-40 rounded-xl">
        <div className="flex flex-row justify-center items-center">
        <p className="font-bold text-lg">Transaction History</p>
        </div>
        <div className="relative w-full h-full">
          <div className="flex overflow-x-auto space-x-4 py-2 relative animate-fade-up mt-3 no-scrollbar">
            {transactions.map((transaction) => (
              <div key="{transaction}" className="flex-none w-48 h-40 border border-gray-300 rounded-lg flex items-center justify-center shadow-md">
                <p className="font-bold">{transaction}</p>
              </div>
            ))}
        </div>
        <div className="absolute inset-y-0 right-0 w-20 z-30 gradient-blur backdrop-blur-sm"></div>
        </div>
      </div>
    </>
  )
}