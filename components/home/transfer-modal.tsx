import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";


interface TransferModalProps {
  showDemoModal: boolean;
  setShowDemoModal: Dispatch<SetStateAction<boolean>>;
  setSelectedAssets: Dispatch<SetStateAction<string[]>>;
  selectedAssets: string[];
}

const TransferModal = ({
  showDemoModal,
  setShowDemoModal,
  selectedAssets, 
}: TransferModalProps) => {
  
  const [msp, setMsp] = useState("");
  return (
    <Modal showModal={showDemoModal} setShowModal={setShowDemoModal}>
      <div className="w-full overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
        <div className="flex flex-col items-center justify-center my-5">
          <h3 className="font-display text-2xl font-bold mb-5">{selectedAssets}</h3>
          <form>
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
            <div className="flex flex-row p-5 items-center justify-center text-center">
              <button
                className="flex w-59 items-center bg-blue-400 justify-between rounded-md border px-4 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100 active:text-black text-white"
                type="submit"
              >
                Transfer Asset
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export function useTransferModal({setSelectedAssets, selectedAssets, setShowDemoModal, showDemoModal }: TransferModalProps) {
  const DemoModalCallback = useCallback(() => {
    return (
      <TransferModal
        showDemoModal={showDemoModal}
        setShowDemoModal={setShowDemoModal}
        selectedAssets={selectedAssets}
        setSelectedAssets={setSelectedAssets}
      />
    );
  }, [showDemoModal, setShowDemoModal, selectedAssets, setSelectedAssets]);

  return useMemo(
    () => ({ setShowDemoModal, DemoModal: DemoModalCallback }),
    [setShowDemoModal, DemoModalCallback],
  );
}
