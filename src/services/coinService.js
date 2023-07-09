import api from './api'; // Import the api.js file

export const getListOfCoins = async () => {
    try {
        const response = await api.get('/coins');
        console.log(response.data); // Handle the response as needed
        return response.data;
    } catch (error) {
        console.error(error); // Handle the error
    }
}