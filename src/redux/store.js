import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';
import coinSlice from './reducers/coinSlice';
import currentCoinSlice from './reducers/currentCoinSlice';
import transactionsSlice from './reducers/transactionsSlice';
import walletSlice from './reducers/walletSlice';
import coinStatsSlice from './reducers/coinStatsSlice';
import globalSlice from './reducers/globalSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        crypto: coinSlice,
        currentCoin: currentCoinSlice,
        transactions: transactionsSlice,
        wallet: walletSlice,
        coinStats: coinStatsSlice,
        global: globalSlice
    }
});

export default store;
