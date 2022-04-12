import axios from "axios";

const axiosApp = axios.create({
  baseURL: `https://gateway-test-backend.herokuapp.com/api/v1`,
  timeout: 15000,
  withCredentials: false,
  headers: { "Content-Type": "application/json" }
});
export default axiosApp;
