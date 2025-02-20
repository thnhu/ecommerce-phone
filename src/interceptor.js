// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://localhost:8080/',
// });

// api.interceptors.request.use(
//   (config) => {
//     console.log('Request made with:', config);
//     config.headers['Authorization'] = `Bearer ${localStorage.getItem("authToken")}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080", // Your base URL
});

const refreshAccessToken = async (expiredAccessToken) => {
  try {
    const response = await axios.post("/phone/auth/refresh", {
      token: expiredAccessToken,
    });

    const newAccessToken = response.data.data.token;
    localStorage.setItem("authToken", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    // throw error;
  }
};

// Request interceptor to add the token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to catch 401 errors (token expiration)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const expiredAccessToken = localStorage.getItem("authToken");

      try {
        const newAccessToken = await refreshAccessToken(expiredAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (error) {
        console.error("Failed to refresh token:", error);
        return Promise.reject(error);
      }
    }

    // If the error is not a 401 or refresh failed, reject it
    return Promise.reject(error);
  }
);

export default api;