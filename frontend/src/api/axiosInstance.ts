import axios from 'axios';

// Axios instance is a custom pre-configured Axios client that already knows things like baseURL, common headers (like Content-Type), timeouts, authentication tokens, interceptors (for logging or refreshing tokens)

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
  timeout: 5000,                        
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
