import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';
import coinSlice from './reducers/coinSlice';
import currentCoinSlice from './reducers/currentCoinSlice';
import transactionsSlice from './reducers/transactionsSlice';
import walletSlice from './reducers/walletSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        crypto: coinSlice,
        currentCoin: currentCoinSlice,
        transactions: transactionsSlice,
        wallet: walletSlice
    }
});

export default store;
