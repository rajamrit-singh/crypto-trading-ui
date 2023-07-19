import { createSlice } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: [],
  reducers: {
    addTransaction: (state, action) => {
      state.push(action.payload);
    },
    addTransactions: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTransaction, addTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
