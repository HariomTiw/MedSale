// src/api/axiosConfig.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add common headers or auth tokens here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Variables to handle token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Add response interceptor for handling refresh tokens
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          // Wait for the token refresh
          await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          return axiosInstance(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${BASE_URL}/api/v1/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        if (response.status === 200) {
          processQueue(null, response.data);
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Clear any stored auth state
        localStorage.removeItem("user");
        // Redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // If the error is a 403 (Forbidden) or final 401 attempt
    if (
      error.response?.status === 403 ||
      (error.response?.status === 401 && originalRequest._retry)
    ) {
      // Clear any stored auth state
      localStorage.removeItem("user");
      // Redirect to login
      window.location.href = "/login";
    }

    // If the error is 401 and we haven't retried yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const response = await axiosInstance.post("/api/v1/auth/refresh-token");

        if (response.status === 200) {
          // If token refresh was successful, retry the original request
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token fails, redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
