import api from './api'; // Import the api.js file

export const buyCoin = async (crypto_id, quantity) => {
    try {
        const response = await api.post('/transaction/buy', {
            crypto_id,
            quantity
        });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getTransactions = async (user_id) => {
    try {
        const response = await api.get('/transactions', {
            user_id
        });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const sellCoin = async (crypto_id, quantity) => {
    try {
        const response = await api.post('/transaction/sell', {
            crypto_id,
            quantity
        });
        return response.data;
    } catch (error) {
        return error;
    }
}