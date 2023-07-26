import api from './api'; // Import the api.js file

export const getListOfCoins = async (page, limit = 50, uuids = []) => {
    try {
        const response = await api.get('/coins', {
            params: {
                uuids,
                page,
                limit
            }
        });
        return response.data;
    } catch (error) {
        console.error(error); // Handle the error
    }
}

export const getUserCoins = async () => {
    try {
        const response = await api.get('/mycoins');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getCoinStats = async () => {
    try {
        const response = await api.get('/coins/stats');
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getCoinById = async (coinId) => {
    try {
        const response = await api.get(`/coin/${coinId}`);
        return response.data;
    } catch (error) {
        return error;
    }
}