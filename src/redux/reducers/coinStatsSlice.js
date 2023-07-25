import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const coinStatsSlice = createSlice({
    name: 'coinStats',
    initialState,
    reducers: {
        setCoinStats(state, action) {
            return action.payload;
        },
    },
});

export const { setCoinStats } = coinStatsSlice.actions;
export default coinStatsSlice.reducer;