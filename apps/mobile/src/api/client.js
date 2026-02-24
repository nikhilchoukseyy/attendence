import axios from 'axios';
import { loadToken } from '../services/authStorage';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  timeout: 10000
});

api.interceptors.request.use(async (config) => {
  const token = await loadToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
