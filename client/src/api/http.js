import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 12000
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("edutrack_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("edutrack_token");
      localStorage.removeItem("edutrack_user");
    }
    return Promise.reject(error);
  }
);

export default http;
