import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWallet(state, action) {
      return action.payload;
    },
  },
});

export const { setWallet } = walletSlice.actions;
export default walletSlice.reducer;
