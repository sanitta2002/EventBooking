import axios from "axios";
import { store } from "../store/store";
import { setAccessToken, logout } from "../store/authSlice";

export const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const state = store.getState();
        const refreshToken = state.auth.refreshToken;
        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post(`${AxiosInstance.defaults.baseURL}/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        store.dispatch(setAccessToken(newAccessToken));

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return AxiosInstance(originalRequest);
      } catch (err) {
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);