import api from './api'; // Import the api.js file

export const buyCoin = async (crypto_id, quantity) => {
    try {
        const response = await api.post('/transaction/buy', {
            crypto_id,
            quantity
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
