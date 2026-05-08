"use client";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  // You can modify the request config here if needed
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the error has a response with data, pass it along
    if (error.response?.data) {
      error.message = error.response.data.error || error.response.data.message || error.message;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
