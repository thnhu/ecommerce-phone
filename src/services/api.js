import axios from "axios";

  const api = axios.create({
    baseURL: "http://localhost:8080",
  });

  export const createVNPayUrl = async (amount) => {
    try {
      const response = await api.get("/phone/api/vnpay/create-payment", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          amount: amount,
          orderInfo: "Thanh",
          orderType: "other",
          language: "vn",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating VNPay URL:", error);
      throw error;
    }
  }

  export const getRevenueByDate = async () => {
    try {
      const response = await api.get("/phone/order/revenue/daily");
      return response.data;
    } catch (error) {
      console.error("Error getting revenue by date:", error);
      throw error;
    }
  }

  export const getRevenueBySummary = async () => {
    try {
      const response = await api.get("/phone/order/revenue/summary");
      return response.data;
    } catch (error) {
      console.error("Error getting revenue by date:", error);
      throw error;
    }
  };

  const refreshAccessToken = async (expiredAccessToken) => {
    try {
      // console.log('Refreshing token with expired token:', expiredAccessToken);
      const response = await api.post("/phone/auth/refresh", {
        token: expiredAccessToken,
      });

    console.log("URL: " + response.headers);

    const newAccessToken = response.data.data.token;
    localStorage.setItem("authToken", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.log("Error refreshing token: ", error);
    throw error;
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

    // Only handle 401 errors and ensure we haven't already retried this request
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const expiredAccessToken = localStorage.getItem("authToken");

      if (!expiredAccessToken) {
        // If no token is found, log it
        console.log("No token found in localStorage. Cannot refresh token.");
        return Promise.reject(new Error("No token found in localStorage"));
      }

      try {
        const newAccessToken = await refreshAccessToken(expiredAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        console.log(
          "Retrying original request with new token:",
          originalRequest.url
        );
        return api(originalRequest);
      } catch (error) {
        console.error("Failed to refresh token:", error);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error); // Reject all other errors
  }
);

export default api;
