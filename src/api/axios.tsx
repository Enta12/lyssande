import axios from 'axios';
import {User} from '../types';
import {getToken, logout} from './auth';
// todo
// eslint-disable-next-line no-unused-vars
const BASE_URL = 'https://api.lysande.pepintrie.fr';
const BASE_URL_LOCAL = 'http://localhost:3001';
let setUser: (user?: User) => void | undefined;


const instance = axios.create({
  baseURL: BASE_URL_LOCAL,
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

export default (setUserFunction: (user?: User) => void) => {
  setUser = setUserFunction;
  return instance;
};
