import { globalStorage, userAtom } from "@/data/globalStorage";
import axios from "axios";

// Create an axios instance
const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://apihairdresser.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("AccessToken") || globalStorage.get(userAtom)?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Kullanıcıyı login sayfasına yönlendir
      window.location.href = "/login";
    }
    // Hatalar için özelleştirilmiş bir işlem alanı
    return Promise.reject(error);
  }
);

export default apiClient;
