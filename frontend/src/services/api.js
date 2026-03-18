import axios from 'axios';

// Use relative path for Vercel production, otherwise use proxy for local dev
const API_URL = import.meta.env.PROD ? '/api/v1' : '/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add retry logic for failed requests
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with retry logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Initialize retry count
    if (!config.__retryCount) {
      config.__retryCount = 0;
    }

    // Check if we should retry
    const shouldRetry =
      config.__retryCount < MAX_RETRIES &&
      (error.code === 'ECONNABORTED' ||
        error.code === 'ERR_NETWORK' ||
        error.message === 'Network Error' ||
        !error.response);

    if (shouldRetry) {
      config.__retryCount += 1;
      console.log(`Retrying request (${config.__retryCount}/${MAX_RETRIES})...`);

      // Wait before retrying
      await sleep(RETRY_DELAY * config.__retryCount);

      return api(config);
    }

    // Enhance error message
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout. Please check your connection.';
    } else if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      error.message = 'Network error. Please ensure the backend server is running on http://localhost:8000';
    }

    return Promise.reject(error);
  }
);

export const login = (email, password) => {
  return api.post('/login/json', {
    email: email,
    password: password
  });
};

export const getMenus = () => api.get('/menus/');
export const createMenu = (data) => api.post('/menus/', data);
export const updateMenu = (id, data) => api.put(`/menus/${id}`, data);

export const getComplaints = () => api.get('/complaints/');
export const createComplaint = (data) => api.post('/complaints/', data);
export const updateComplaintStatus = (id, status) => api.put(`/complaints/${id}`, { status });

export const getFeedbacks = () => api.get('/feedback/');
export const createFeedback = (data) => api.post('/feedback/', data);

export const signup = (data) => api.post('/users/signup', data);

export default api;
