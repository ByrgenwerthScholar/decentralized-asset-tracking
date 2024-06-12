import Modal from "@/components/shared/modal";
import { useState, useCallback, useMemo } from "react";

interface AddAssetModalProps {
  showDemoModal: boolean;
  setShowDemoModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTriggerEffect: React.Dispatch<React.SetStateAction<number>>;
  organization: string;
}

const AddAssetModal = ({ showDemoModal, setShowDemoModal, setTriggerEffect, organization }: AddAssetModalProps) => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    const formData = {
      name,
      size, // Assuming size should be a number
    };
    
    try {
      if (organization === "Seller") {
      const response = await fetch(`http://localhost:3001/org1/addnew`, { // Replace '/api/your-endpoint' with your actual endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: formData.name, size: formData.size}),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    } else if (organization === "Buyer") {
      const response = await fetch(`http://localhost:3001/org2/addnew`, { // Replace '/api/your-endpoint' with your actual endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: formData.name, size: formData.size}),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    }
    
      
      console.log('Successfully added asset:');
      setTriggerEffect((prev) => prev + 1); // Trigger a re-fetch of the data
      setShowDemoModal(false); // Close the modal

      // Optional: Clear form fields after successful submission
      setName('');
      setSize('');
    } catch (error) {
      console.error('Failed to add asset:', error);
    }
  };

  // Now, the return statement is directly part of the AddAssetModal function
  return (
    <Modal showModal={showDemoModal} setShowModal={setShowDemoModal}>
      <div className="w-full overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
        <div className="flex flex-col items-center justify-center my-5">
          <h3 className="font-display text-2xl font-bold mb-5">Add Asset</h3>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row p-5 py-1 items-center justify-between text-center">
              <label htmlFor="name" className="mr-3 font-bold">Asset Model:</label>
              <input
                id="name"
                className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Asset Model"
                required
              />
            </div>
            <div className="flex flex-row p-5 py-1 items-center justify-between text-center">
              <label htmlFor="size" className="mr-3 font-bold">Asset Size:</label>
              <input
                id="size"
                className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="Batch Size"
                required
              />
            </div>
            <div className="flex flex-row p-5 items-center justify-center text-center">
              <button
                className="flex w-59 items-center justify-center mt-5 border bg-green-400 rounded-md px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100 active:text-black text-white"
                onClick={() => {handleSubmit}}
              >
                Add Asset
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export function useAddAssetModal({ showDemoModal, setShowDemoModal, setTriggerEffect, organization }: AddAssetModalProps) {
  const DemoModalCallback = useCallback(() => {
    return (
      <AddAssetModal
        showDemoModal={showDemoModal}
        setShowDemoModal={setShowDemoModal}
        setTriggerEffect={setTriggerEffect}
        organization={organization}
      />
    );
  }, [showDemoModal, setShowDemoModal, setTriggerEffect, organization]);

  return useMemo(
    () => ({ setShowDemoModal, DemoModal: DemoModalCallback }),
    [setShowDemoModal, DemoModalCallback],
  );
}