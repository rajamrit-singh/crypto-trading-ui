import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const coinSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setCoins(state, action) {
      return action.payload;
    },
    addCoin(state, action) {
      state.push(action.payload);
    },
    removeCoin(state, action) {
      const index = state.findIndex((coin) => coin.uuid === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { setCoins, addCoin, removeCoin } = coinSlice.actions;
export default coinSlice.reducer;
