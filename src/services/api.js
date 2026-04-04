import axios from 'axios';

if (typeof window !== 'undefined') {
  window.alert(`DIAGNOSTIC VERSION: 10 - API URL: http://127.0.0.1:5000/api`);
}

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api', // Force direct local connection for debugging
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // window.location.href = '/login'; // Or handle via history/navigate
    }
    return Promise.reject(error);
  }
);

export default api;
