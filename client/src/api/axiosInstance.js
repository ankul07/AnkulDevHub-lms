import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ankul-dev-hub-lms.vercel.app/api/v2",
  timeout: 10000,
  withCredentials: true,
});

export default axiosInstance;
