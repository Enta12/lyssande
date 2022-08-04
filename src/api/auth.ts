import {User} from '../types';
import api from './axios';

const tokenPlace = 'lysandeLocal';

export const login = (
    email: string,
    password: string,
    setUser: (user?: User) => void,
) => {
  return api(setUser)
      .post('auth/login', {
        email,
        password,
      })
      .then((response) => {
        const data = response.data;
        if (data.token) {
          localStorage.setItem(tokenPlace, data.token);
          return data.token;
        }
      }).catch((err) => {
        return err.code;
      });
};
export const logout = (setUser: (user: User | undefined) => void) => {
  localStorage.removeItem(tokenPlace);
  setUser(undefined);
};
export const getToken = () => {
  return localStorage.getItem(tokenPlace);
};
