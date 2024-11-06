// src/store/slices/demoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DemoState {
  selectedDemo: string;
  status: 'idle' | 'running' | 'paused' | 'stopped';
}

const initialState: DemoState = {
  selectedDemo: '',
  status: 'idle',
};

const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    selectDemo(state, action: PayloadAction<string>) {
      state.selectedDemo = action.payload;
      state.status = 'idle'; // Reset status when a new demo is selected
    },
    startDemo(state) {
      state.status = 'running';
    },
    pauseDemo(state) {
      state.status = 'paused';
    },
    stopDemo(state) {
      state.status = 'stopped';
    },
  },
});

export const { selectDemo, startDemo, pauseDemo, stopDemo } = demoSlice.actions;
export default demoSlice.reducer;
