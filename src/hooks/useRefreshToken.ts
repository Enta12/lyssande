import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const {setAuth, auth} = useAuth();

  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true,
    });
    const authTemp = auth || {token: ''};
    authTemp.token = response.data.data.accessToken.toString();
    setAuth(authTemp);
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
