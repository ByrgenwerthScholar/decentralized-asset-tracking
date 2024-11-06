// src/services/fabricService.ts
import { Transaction } from '@shared/Transaction';

export const fabricService = {
  getTransactions: async (): Promise<{ data: Transaction[] }> => {
    // Mock data
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        price: 100,
        amount: 2,
        country: 'USA',
        timestamp: '2023-10-10 10:00:00',
      },
      {
        id: '2',
        price: 200,
        amount: 5,
        country: 'UK',
        timestamp: '2023-10-10 11:00:00',
      },
      // Add more mock transactions as needed
    ];

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockTransactions });
      }, 1000); // Simulate network delay
    });
  },
};
