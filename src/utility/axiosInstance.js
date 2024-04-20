import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    if (accessToken) {
      // ** eslint-disable-next-line no-param-reassign
      config.headers.Authorization = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
