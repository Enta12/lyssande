import React, {createContext, useState} from 'react';
import {JsxElement} from 'typescript';
import {Auth} from '../types';

const AuthContext = createContext<
  { auth?: Auth; setAuth:(newAuth: Auth) => void }>
      ({setAuth: (newAuth) => newAuth});
export const AuthProvider = ({children}: {children: JsxElement}) => {
  const [auth, setAuth] = useState<Auth |undefined>();
  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
