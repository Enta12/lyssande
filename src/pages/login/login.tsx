import jwtDecode from 'jwt-decode';
import React, {useContext, useState} from 'react';
import {toast} from 'react-toastify';
import {login} from '../../api/auth';
import {AuthContext} from '../../AppRoute';
import Input from '../../components/input';
import PrimaryButton from '../../components/primary-button';
import {Token} from '../../types';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useContext(AuthContext);

  const isEmail = () => {
    const pattern =
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(pattern);
  };

  const handleClick = async () => {
    if (!isEmail()) {
      toast.error(
        email ? 'L\'email n\'est pas au bon format':
        'L\'email est obligatoire',
      );
      return;
    }
    if (!password) {
      toast.error('Mot de passe obligatoire');
      return;
    }
    if (setUser) {
      const token = await login(email, password, setUser);
      if (token === 'ERR_BAD_REQUEST') {
        toast.error('Login ou mot de passe incorrect');
        return;
      }
      console.log(token);
      const tokenDecode = jwtDecode(token) as Token;
      setUser({...tokenDecode});
    }
  };
  return (
    <div className="
      min-h-screen
      bg-cover
      h-full
      bg-[url('pages/login/login-background.png')]
      flex
      items-center
      justify-center
    ">
      <form className="
        gap-4
        pt-8
        pb-28
        flex
        flex-col
        bg-orange/[.8]
        h-3/4
        w-5/12
        rounded-3xl
        justify-around
        items-center
      ">
        <Input
          value={email}
          placeholder="Email"
          type="email"
          setValueString={setEmail}
        />
        <Input
          value={password}
          setValueString={setPassword}
          placeholder="Mot de passe"
          type="password"
        />
        <PrimaryButton
          onClick={handleClick}
          text={'Connexion'}
        />
      </form>
    </div>
  );
};

export default Login;
