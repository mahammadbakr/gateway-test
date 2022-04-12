import axios from "axios";

const axiosApp = axios.create({
  baseURL: `http://localhost:5050/api/v1`,
  timeout: 15000,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
  credentials: "Access-Control-Allow-Credentials",
});
export default axiosApp;
