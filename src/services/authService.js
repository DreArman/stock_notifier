import axios from 'axios';

const API_URL = import.meta.env.SERVER_URL;
console.log("out:", API_URL);

export const login = async (email, password) => {
  console.log("in:", API_URL);
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const register = async (email, password) => {
  const response = await axios.post(`${API_URL}/register`, { email, password });
  return response.data;
};

export const refreshToken = async () => {
    const refresh_token = localStorage.getItem('refresh_token');
    const response = await axios.post(`${API_URL}/refresh`, { refresh_token });
    localStorage.setItem('access_token', response.data.access_token);
    return response.data.access_token;
};