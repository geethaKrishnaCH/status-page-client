import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
  // .. other options
});

export const setupAxiosInterceptors = (getToken) => {
  instance.interceptors.request.use(
    async (config) => {
      try {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        console.warn(
          "Failed to retrieve token, continuing without Authorization header."
        );
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default instance;
