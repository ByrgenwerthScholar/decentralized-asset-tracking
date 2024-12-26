// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import demoReducer from './slices/demoSlice';
import docsReducer from './slices/docsSlice';
import orgsReducer from './slices/orgsSlice';

const store = configureStore({
  reducer: {
    demo: demoReducer,
    docs: docsReducer,
    orgs: orgsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
