import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8010/api/v2",
  timeout: 10000,
  withCredentials: true,
});

export default axiosInstance;
