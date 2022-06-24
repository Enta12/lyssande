import axios from './axios';
export const login = (email: string, password: string) => {
  return axios
      .post('auth/login', {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.data.access_token;
        console.log('token', token);
        if (token) {
          return token;
        }
        return '';
      })
      .catch(() => {
        return '';
      });
};
export const logout = () => {
  localStorage.removeItem('user');
};
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

