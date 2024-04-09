import axios from 'axios';
const api = axios.create();

api.interceptors.request.use(
  async config => {
    config.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
