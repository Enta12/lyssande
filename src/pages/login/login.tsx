import jwtDecode from 'jwt-decode';
import React, {useState} from 'react';
import {login} from '../../api/auth';
import Input from '../../components/input';
import PrimaryButton from '../../components/primary-button';
import {User} from '../../types';

type Props = {
  setUser: (user: User) => void
}

const Login = ({setUser} : Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async () => {
    const res = await login(email, password);
    if (res === 'ERR_BAD_REQUEST') {
      console.log('LOGIN ERROR TODO');
      return;
    }
    const tokenDecode = jwtDecode(res) as any; // Change to Type Token
    console.log('login tokenDecode', tokenDecode);
    setUser({userId: tokenDecode?.id});
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
