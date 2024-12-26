import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface OrgsState {
  selectedOrg: string;
}

const initialState: OrgsState = {
  selectedOrg: 'Org1MSP',
};

const orgsSlice = createSlice({
  name: 'orgs',
  initialState,
  reducers: {
    selectOrg(state, action: PayloadAction<string>) {
      state.selectedOrg = action.payload;
    },
  },
});

export const { selectOrg } = orgsSlice.actions;
export default orgsSlice.reducer;