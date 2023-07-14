import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';
import coinSlice from './reducers/coinSlice';
import currentCoinSlice from './reducers/currentCoinSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        crypto: coinSlice,
        currentCoin: currentCoinSlice
    }
});

export default store;
