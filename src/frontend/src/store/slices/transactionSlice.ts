// src/store/slices/transactionSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Transaction } from '@shared/Transaction';
import { fabricService } from '../../services/fabricService'; // Placeholder for your backend service

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

// Async thunk to fetch transactions from backend
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fabricService.getTransactions(); // Implement this service
      return response.data as Transaction[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.transactions.push(action.payload);
    },
    clearTransactions(state) {
      state.transactions = [];
    },
    // Additional reducers can be added here (e.g., removeTransaction, updateTransaction)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addTransaction, clearTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
