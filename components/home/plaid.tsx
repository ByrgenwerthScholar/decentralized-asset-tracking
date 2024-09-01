// components/PlaidLinkButton.tsx
import React, { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useTransferModal } from './plaid-modal';

const PlaidLinkButton: React.FC = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const { TransferModal } = useTransferModal({
    showDemoModal,
    setShowDemoModal,
    accessToken,
  });

  useEffect(() => {
    // Fetch the link token from your Express server
    const fetchLinkToken = async () => {
      console.log('Fetching link token...');  
      try {
        const response = await fetch('http://localhost:3001/plaid/api/create_link_token'); // Adjust the URL to match your Express server endpoint
        const data = await response.json();
        setLinkToken(data.link_token);
      } catch (error) {
        console.error('Error fetching link token:', error);
      }
    };

    fetchLinkToken();
  }, []);

  const onSuccess = async (public_token: string, metadata: object) => {
    // Handle the success event, e.g., send the public_token to your server
    console.log('Plaid Link success:', public_token, metadata);
    try {
      const response = await fetch('http://localhost:3001/plaid/api/set_access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public_token }),
      });
      const data = await response.json();
      setAccessToken(data.access_token);
      setShowDemoModal(true);

      console.log('Access token response:', data);
    } catch (error) {
      console.error('Error exchanging public token:', error);
    }
  };

  const { open, ready, error } = usePlaidLink({
    token: linkToken!,
    onSuccess,
  });

  useEffect(() => {
    if (error) {
      console.error('Plaid Link Error:', error);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={() => open()}
        disabled={!ready}
        className={`px-6 py-3 rounded-lg mr-2 text-white transition duration-300 ${
          ready ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Connect a bank account
      </button>
      <button
        onClick={() => {setShowDemoModal(true); }}
        disabled={!accessToken}
        className={`px-6 py-3 rounded-lg text-white transition duration-300 ${
          accessToken ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Show Transfer Modal
      </button>
      <TransferModal />
    </div>
  );
};

export default PlaidLinkButton;
