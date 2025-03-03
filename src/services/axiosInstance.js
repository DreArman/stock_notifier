import axios from "axios";
import Pages from "../constants/Pages";
import { refreshToken } from "./authService";

const API_URL = import.meta.env.VITE_SERVER_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Автоматически отправляем куки //todo uncomment future
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem("access_token");
        window.location.href = Pages.SIGN_IN;
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
