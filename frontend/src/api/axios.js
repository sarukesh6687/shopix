import axios from 'axios';

const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const defaultBaseURL = isLocalhost ? 'http://localhost:5002/api' : 'https://shopix-ruddy.vercel.app/api';


const api = axios.create({ 
  baseURL: process.env.REACT_APP_API_URL || defaultBaseURL 
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

