import axios from 'axios';
import {getToken, refreshToken} from './auth';
const BASE_URL = 'https://api.lysande.pepintrie.fr';

export default axios.create({
  baseURL: BASE_URL,
});

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['x-access-token'] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
);
instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            await refreshToken();
            const token = getToken();
            if (token) {
              instance.defaults.headers.common['x-access-token'] = token;
              return instance(originalConfig);
            }
          } catch (error) {
            const err = error as any;
            if (err.response && err.response.data) {
              return Promise.reject(err.response.data);
            }
            return Promise.reject(err);
          }
        }
        if (err.response.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }
      return Promise.reject(err);
    },
);

