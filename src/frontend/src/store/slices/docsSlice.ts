import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface DocsState {
  selectedDoc: string;
}

const initialState: DocsState = {
  selectedDoc: 'introduction',
};

const docsSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    selectDoc(state, action: PayloadAction<string>) {
      state.selectedDoc = action.payload;
    },
  },
});

export const { selectDoc } = docsSlice.actions;
export default docsSlice.reducer;