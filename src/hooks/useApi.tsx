import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '.';
const BASE_URL = 'https://api.lyssande.pepintrie.fr';

const useApi = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  instance.interceptors.request.use(
      (config) => {
        const token = auth?.user.jwt;
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
            auth?.dispatch({type: 'logout'});
            navigate('/');
          }
          if (err.response.data) {
            return Promise.reject(err.response.data);
          }
        }
        return Promise.reject(err);
      },
  );
  return instance;
};

export default useApi;
