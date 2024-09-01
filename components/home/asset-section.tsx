"use client"

import React from 'react';
import { Asset } from '@/types/assets';

interface AssetsSectionProps {
  orgData: Asset[];
  selectedAssets: Asset[];
  isSelecting: boolean;
  handleSelectAsset: (asset: Asset) => void;
}

const AssetsSection: React.FC<AssetsSectionProps> = ({ orgData, selectedAssets, isSelecting, handleSelectAsset }) => {
  return (
    <div className="relative w-full h-full">
      <div className="flex overflow-x-auto space-x-4 py-2 relative animate-fade-up mt-3 no-scrollbar min-h-[160px]">
        {orgData.length > 0 ? (
          orgData.map((asset: Asset) => (
            <div
              key={asset.id}
              className={`flex-none w-64 h-48 p-4 ${isSelecting ? 'hover:border-green-400 hover:border-2' : ''} ${
                selectedAssets.some(selectedAsset => selectedAsset.id === asset.id) ? 'bg-green-400 text-white hover:border-red-400' : 'bg-white text-black'
              } border border-gray-300 rounded-lg flex flex-col justify-between shadow-md`}
              onClick={() => handleSelectAsset(asset)}
            >
              <div>
                <p className="font-bold text-lg">{asset.model}</p>
                <p className="text-md mt-2">Size: {asset.size}</p>
              </div>
              <p className="text-xs mt-4 text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">Accumulator: {asset.accumulator}</p>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
      <div className="absolute inset-y-0 right-0 w-20 z-30 gradient-blur backdrop-blur-sm"></div>
    </div>
  );
};

export default AssetsSection;
