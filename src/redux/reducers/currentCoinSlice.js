import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uuid: '',
    symbol: '',
    iconUrl: '',
    price: '',
};

const currentCoinSlice = createSlice({
    name: 'coins',
    initialState,
    reducers: {
        setCurrentCoin(state, action) {
            return action.payload;
        },
        addCoin(state, action) {
            state.push(action.payload);
        },
        removeCoin(state) {
            return {};
        },
    },
});

export const { setCurrentCoin, removeCoin } = currentCoinSlice.actions;
export default currentCoinSlice.reducer;
