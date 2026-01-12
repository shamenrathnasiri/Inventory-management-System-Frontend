import axiosLib from "axios";
import { getToken } from "../services/TokenService";
import config from '../config';

const apiUrl = config.apiBaseUrl + '/api';

const axios = axiosLib.create({
  baseURL: apiUrl, 
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((req) => {
  const token = getToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Response interceptor to handle auth errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 unauthorized, token might be invalid/expired
    if (error.response?.status === 401) {
      // Clear token and redirect to login if needed
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export default axios;
