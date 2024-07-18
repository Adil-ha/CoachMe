import axios from "axios";
import { accountService } from "../services/accountService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8090",
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajouter un intercepteur de requête
axiosInstance.interceptors.request.use(
  (config) => {
    const token = accountService.getToken();
    if (token) {
      config.headers = { ...config.headers, ...token };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
