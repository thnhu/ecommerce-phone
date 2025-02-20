import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
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
    console.log("Error refreshing token: ", error);
    throw(error)
  }
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config; //Return config so Axios continue sending it
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status == 401 &&
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
    return Promise.reject(error);
  }
);

export default api;
