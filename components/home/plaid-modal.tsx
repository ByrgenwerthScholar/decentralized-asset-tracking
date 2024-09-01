import Modal from "@/components/shared/modal";
import { useState, useEffect, Dispatch, SetStateAction, useCallback, useMemo } from "react";

interface TransferModalProps {
  showDemoModal: boolean;
  setShowDemoModal: Dispatch<SetStateAction<boolean>>;
  accessToken: string | null;
}

interface Transaction {
  account_id: string;
  account_owner: string | null;
  amount: number;
  authorized_date: string | null;
  authorized_datetime: string | null;
  category: string[];
  category_id: string;
  check_number: string | null;
  counterparties: any[];
  date: string;
  datetime: string | null;
  iso_currency_code: string;
  location: any;
  logo_url: string | null;
  merchant_entity_id: string | null;
  merchant_name: string | null;
  name: string;
  payment_channel: string;
  payment_meta: any;
  pending: boolean;
  pending_transaction_id: string | null;
  personal_finance_category: any | null;
  personal_finance_category_icon_url: string | null;
  transaction_code: string | null;
  transaction_id: string;
  transaction_type: string;
  unofficial_currency_code: string | null;
  website: string | null;
}

const TransferModal = ({
  showDemoModal,
  setShowDemoModal,
  accessToken,
}: TransferModalProps) => {
  const [transferData, setTransferData] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransferData = async () => {
      if (!accessToken || !showDemoModal) {
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/plaid/api/transactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_token: accessToken,
          }),
        });
        const data = await response.json();
        console.log("Data fetched:", data.latest_transactions);
        setTransferData(data.latest_transactions); // Correctly accessing the latest_transactions property
      } catch (error) {
        console.error("Error fetching transfer data:", error);
      }
    };

    if (showDemoModal) {
      fetchTransferData();
    }
  }, [showDemoModal, accessToken]);

  const renderNestedObject = (obj: any) => {
    return Object.entries(obj).map(([key, value]) => (
      value !== null && <div key={key}><strong>{key}:</strong> {JSON.stringify(value)}</div>
    ));
  };

  return (
    <Modal showModal={showDemoModal} setShowModal={setShowDemoModal}>
      <div className="w-full max-h-[70vh] overflow-y-auto md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
        <div className="flex flex-col items-center justify-center my-5">
          <h3 className="font-display text-2xl font-bold mb-5">Transfer Data</h3>
          <div className="w-full p-5">
            {transferData.length > 0 ? (
              <ul>
                {transferData.map((item, index) => (
                  <li key={index} className="mb-2 border-b pb-2">
                    {item.name && <div className="text-xl"> <strong>{item.name}</strong></div>}
                    {item.amount !== null && <div><strong>Amount:</strong> {item.amount}</div>}
                    {item.date && <div><strong>Date:</strong> {item.date}</div>}
                    {item.category.length > 0 && <div><strong>Category:</strong> {item.category.join(', ')}</div>}
                    {item.merchant_name && <div><strong>Merchant:</strong> {item.merchant_name}</div>}
                    {item.transaction_type && <div><strong>Transaction Type:</strong> {item.transaction_type}</div>}
                    {item.payment_channel && <div><strong>Payment Channel:</strong> {item.payment_channel}</div>}
                    {item.iso_currency_code && <div><strong>ISO Currency Code:</strong> {item.iso_currency_code}</div>}
                    {item.unofficial_currency_code && <div><strong>Unofficial Currency Code:</strong> {item.unofficial_currency_code}</div>}
                    {item.website && <div><strong>Website:</strong> {item.website}</div>}
                    {item.logo_url && <div><strong>Logo URL:</strong> {item.logo_url}</div>}
                    {item.authorized_date && <div><strong>Authorized Date:</strong> {item.authorized_date}</div>}
                    {item.authorized_datetime && <div><strong>Authorized Datetime:</strong> {item.authorized_datetime}</div>}
                    {item.check_number && <div><strong>Check Number:</strong> {item.check_number}</div>}
                    {item.counterparties.length > 0 && <div><strong>Counterparties:</strong> {item.counterparties.map((counterparty: any) => counterparty.name).join(', ')}</div>}
                    {item.location && renderNestedObject(item.location)}
                    {item.merchant_entity_id && <div><strong>Merchant Entity ID:</strong> {item.merchant_entity_id}</div>}
                    {item.payment_meta && renderNestedObject(item.payment_meta)}
                    {item.personal_finance_category && renderNestedObject(item.personal_finance_category)}
                    {item.personal_finance_category_icon_url && <div><strong>Personal Finance Category Icon URL:</strong> {item.personal_finance_category_icon_url}</div>}
                    {item.transaction_code && <div><strong>Transaction Code:</strong> {item.transaction_code}</div>}
                    {item.transaction_id && <div><strong>Transaction ID:</strong> {item.transaction_id}</div>}
                    {item.unofficial_currency_code && <div><strong>Unofficial_currency_code:</strong> {item.unofficial_currency_code}</div>}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No transfer data available</p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export function useTransferModal({ setShowDemoModal, showDemoModal, accessToken }: TransferModalProps) {
  const TransferModalCallback = useCallback(() => {
    return (
      <TransferModal
        showDemoModal={showDemoModal}
        setShowDemoModal={setShowDemoModal}
        accessToken={accessToken}
      />
    );
  }, [showDemoModal, setShowDemoModal, accessToken]);

  return useMemo(
    () => ({ setShowDemoModal, TransferModal: TransferModalCallback }),
    [setShowDemoModal, TransferModalCallback],
  );
}
