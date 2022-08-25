import axios from 'axios';
import {Token} from '../types';
import {getToken, logout} from './auth';
const BASE_URL = 'https://api.lyssande.pepintrie.fr';
let setUser: (user?: Token) => void | undefined;


const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
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
          if (setUser) logout(setUser);
        }
        if (err.response.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }
      return Promise.reject(err);
    },
);

export default (setUserFunction: (user?: Token) => void) => {
  setUser = setUserFunction;
  return instance;
};
