import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';
import coinSlice from './reducers/coinSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        crypto: coinSlice
    }
});

export default store;
