import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { createContext } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AxiosContext = createContext();

export const AxiosProvider = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      timeout: 100000,
    },
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      } catch (err) {
        console.warn(
          "Failed to retrieve token, continuing without Authorization header.",
          err
        );
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
};

export default AxiosContext;
