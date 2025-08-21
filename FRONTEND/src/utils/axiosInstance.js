import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:8080/api/v1',
  withCredentials: true
});

export default axiosInstance;