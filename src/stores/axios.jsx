import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { createContext, useContext } from "react";
import { useLoader } from "./loader";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AxiosContext = createContext();

export const AxiosProvider = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { hideLoader, showLoader } = useLoader();

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      timeout: 10000,
    },
  });
  // Add request interceptor
  axiosInstance.interceptors.request.use(
    async (config) => {
      showLoader();
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        const organizationId = localStorage.getItem("organizationId");
        config.headers["X-Organization-Id"] = organizationId;
      } catch (err) {
        console.warn(
          "Failed to retrieve token, continuing without Authorization header.",
          err
        );
        hideLoader();
      }
      return config;
    },
    (error) => {
      hideLoader();
      return Promise.reject(error);
    }
  );

  // Add response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      hideLoader();
      return response;
    },
    (error) => {
      hideLoader();
      return Promise.reject(error);
    }
  );

  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
};

const useAxios = () => {
  return useContext(AxiosContext);
};
export default useAxios;
