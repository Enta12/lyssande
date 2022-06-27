import axios from './axios';

export const login = (email: string, password: string) => {
  return axios
      .post('auth/login', {
        email,
        password,
      })
      .then((response) => {
        const tokens = response.data.data;
        console.log(tokens);
        if (tokens.refresh_token) {
          localStorage.setItem('refreshToken', tokens.refresh_token);
        }
        if (tokens.access_token) {
          localStorage.setItem('token', tokens.access_token);
          return tokens.access_token;
        }
      }).catch((err) => {
        return err.code;
      });
};
export const logout = () => {
  localStorage.removeItem('token');
};
export const refreshToken = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  return axios
      .post('auth/refresh', {
        refresh_token: refreshToken,
      })
      .then((response) => {
        const token = response.data.data.accessToken;
        if (token) {
          localStorage.setItem('token', token);
        }
      });
};
export const getToken = () => {
  return localStorage.getItem('token');
};


