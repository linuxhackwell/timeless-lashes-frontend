import axios from 'axios';

const API_URL = 'http://localhost:3000/api/admin';

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

export const register = async (adminData, token) => {
    const response = await axios.post(`${API_URL}/register`, adminData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const forgotPassword = async (email) => {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
};
