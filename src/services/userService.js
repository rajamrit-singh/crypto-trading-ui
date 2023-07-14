import api from './api'; // Import the api.js file

export const signUpUser = async (user) => {
    try {
        const response = await api.post('/signup', user);
        console.log(response.data); // Handle the response as needed
        return response.data;
    } catch (error) {
        console.error(error); // Handle the error
    }
}

export const loginUser = async (user) => {
    try {
        const response = await api.post('/login', user);
        console.log(response.data); // Handle the response as needed
        return response.data;
    } catch (error) {
        console.error(error); // Handle the error
    }
}

export const getProfile = async () => {
    try {
        const response = await api.get('/profile');
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}