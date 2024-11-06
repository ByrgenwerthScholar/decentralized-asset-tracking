// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import demoReducer from './slices/demoSlice';
import docsReducer from './slices/docsSlice';
import transactionReducer from './slices/transactionSlice';

const store = configureStore({
  reducer: {
    demo: demoReducer,
    docs: docsReducer,
    transactions: transactionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
