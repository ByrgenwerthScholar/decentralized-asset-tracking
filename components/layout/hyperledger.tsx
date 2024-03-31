"use client"

import { useState } from "react";
import Popover from "../shared/popover";
import { ChevronDown } from "lucide-react";

export default function Hyperledger() {
  const [openPopover, setOpenPopover] = useState(false);
  const [organization, setOrganization] = useState("Organization");
  const assets = ["Asset 1", "Asset 2", "Asset 3", "Asset 4", "Asset 5", "Asset 6", "Asset 7", "Asset 8", "Asset 9", "Asset 10"]
  return (
      <div className="z-20 my-10 flex flex-col max-w-7xl p-5 px-10 border border-gray-400 animate-fade-up mx-40 rounded-3xl">
        <div className="flex flex-row justify-between">
          <div>
            <Popover
              content={
                <div className="w-full rounded-md bg-white p-2 m:w-40">
                  <button onClick={() => {setOrganization("Manufacturer"); setOpenPopover(!openPopover)}} className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                    Manufacturer
                  </button>
                  <button onClick={() => {setOrganization("Domestic Buyer"); setOpenPopover(!openPopover)}} className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                    Domestic Buyer
                  </button>
                  <button onClick={() => {setOrganization("International Buyer"); setOpenPopover(!openPopover)}} className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                    International Buyer
                  </button>
                  <button onClick={() => {setOrganization("Domestic Authority"); setOpenPopover(!openPopover)}} className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                    Domestic Authority
                  </button>
                  <button onClick={() => {setOrganization("International Authority"); setOpenPopover(!openPopover)}} className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
                    International Authority
                  </button>
                </div>
              }
              openPopover={openPopover}
              setOpenPopover={setOpenPopover}
            >
              <button
                className="flex w-59 items-center justify-between rounded-md border border-gray-300 px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
              >
                <p className="text-gray-600">{organization}</p>
                <ChevronDown
                  className={`h-4 w-4 text-gray-600 transition-all ${openPopover ? "rotate-180" : ""
                    }`}
                />
              </button>
            </Popover> 
            </div>
            <div className="flex flex-row gap-1">
              <button
                className="flex w-59 items-center bg-black justify-between rounded-md border border-gray-300 px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100 active:text-black text-white"
              >
                Add Asset
              </button>
              <button
                className="flex w-59 items-center bg-black justify-between rounded-md border border-gray-300 px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100 active:text-black text-white"
              >
                Transfer Asset
              </button>
            </div>  
        </div> 
        <div className="relative w-full h-full">
          <div className="flex overflow-x-auto space-x-4 py-2 relative animate-fade-up mt-3 no-scrollbar">
            {assets.map((asset) => (
              <div key="{asset}" className="flex-none w-48 h-40 backdrop-blur-sm hover:backdrop-blur-xl border border-gray-300 rounded-lg flex items-center justify-center">
                {asset}
              </div>
            ))}
        </div>
        <div className="absolute inset-y-0 right-0 w-20 z-30 gradient-blur backdrop-blur-sm"></div>
      </div>
    </div>
  )
}