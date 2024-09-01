"use client"

import React from 'react';

interface TransactionsSectionProps {
  transactions: string[];
}

const TransactionsSection: React.FC<TransactionsSectionProps> = ({ transactions }) => {
  return (
    <div className="relative w-full h-full">
      <div className="flex overflow-x-auto space-x-4 py-2 relative animate-fade-up mt-3 no-scrollbar">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex-none w-48 h-40 border border-gray-300 rounded-lg flex items-center justify-center shadow-md">
            <p className="font-bold">{transaction}</p>
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 right-0 w-20 z-30 gradient-blur backdrop-blur-sm"></div>
    </div>
  );
};

export default TransactionsSection;
