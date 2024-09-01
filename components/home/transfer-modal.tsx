

import Modal from "@/components/shared/modal";
import { useState, Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { Asset } from "@/types/assets";

interface TransferModalProps {
  setShowDemoModal: Dispatch<SetStateAction<boolean>>;
  showDemoModal: boolean;
  setTriggerEffect: React.Dispatch<React.SetStateAction<number>>;
  selectedAssets: Asset[];
  organization: string;
}

const TransferModal = ({
  showDemoModal,
  setShowDemoModal,
  selectedAssets,
  setTriggerEffect,
  organization,
}: TransferModalProps) => {
  const [msp, setMsp] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      asset: selectedAssets,
      msp: msp,
    };

    let apiEndpoint = '';

    if (organization === "Seller") {
      apiEndpoint = `http://localhost:3001/org1/transferinit`;
    } else if (organization === "Buyer") {
      apiEndpoint = `http://localhost:3001/org2/transferinit`;
    }

    try {
      console.log('SELECTED ASSETS:' + JSON.stringify(selectedAssets));
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ asset: selectedAssets[0], msp: formData.msp }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      console.log('Successfully transferred assets:');
      setTriggerEffect((prev) => prev + 1); // Trigger a re-fetch of the data
      setShowDemoModal(false); // Close the modal

      // Optional: Clear form fields after successful submission
      setMsp('');
    } catch (error) {
      console.error('Failed to transfer assets:', error);
    }
  };

  return (
    <Modal showModal={showDemoModal} setShowModal={setShowDemoModal}>
      <div className="w-full overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
        <div className="flex flex-col items-center justify-center my-5">
          <h3 className="font-display text-2xl font-bold mb-5">Transfer Assets</h3>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row p-5 py-1 items-center justify-between text-center">
              <label htmlFor="msp" className="mr-3 font-bold">Transfer to:</label>
              <input
                id="msp"
                className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={msp}
                onChange={(e) => setMsp(e.target.value)}
                placeholder="MSP ID"
                required
              />
            </div>
            {selectedAssets.length === 1 ? (
              <div className="flex flex-row p-5 items-center justify-center text-center">
                <button
                  className="flex w-59 items-center bg-blue-400 justify-between rounded-md border px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100 active:text-black text-white"
                  type="submit"
                >
                  Transfer Asset
                </button>
              </div>
            ) : <div className="flex flex-row p-5 items-center justify-center text-center"> <p className="font-bold">Select One Asset to Transfer.</p> </div>}
          </form>
        </div>
      </div>
    </Modal>
  );
};

export function useTransferModal({  selectedAssets, setShowDemoModal, showDemoModal, setTriggerEffect, organization }: TransferModalProps) {
  const DemoModalCallback = useCallback(() => {
    return (
      <TransferModal
        showDemoModal={showDemoModal}
        setShowDemoModal={setShowDemoModal}
        selectedAssets={selectedAssets}
        setTriggerEffect={setTriggerEffect}
        organization={organization}
      />
    );
  }, [showDemoModal, setShowDemoModal, selectedAssets, setTriggerEffect, organization]);

  return useMemo(
    () => ({ setShowDemoModal, DemoModal: DemoModalCallback }),
    [setShowDemoModal, DemoModalCallback],
  );
}
