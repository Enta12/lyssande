import jwtDecode from 'jwt-decode';
import React, {createContext, useContext, useReducer} from 'react';
import {UserInfo} from '../types';

type AuthInfo = {
  jwt?: string;
  info?: UserInfo;
  isLogged: boolean;
};
const initialState: AuthInfo = {
  jwt: undefined,
  info: undefined,
  isLogged: false,
};
type Action = {
  type: 'login' | 'logout';
  payload?: { jwt?: string; onLogin?: () => void };
};

// TODO supress when back send id and not userId
type TokenDecoded = {
  userId: string;
  role: 'admin' | 'gm' | 'player';
  name: string;
  email?: string;
}
const formatDecoded = (token: TokenDecoded) => {
  return {
    role: token.role,
    name: token.name,
    email: token.email,
    id: token.userId,
  };
};

const reducer = (state: AuthInfo, action: Action): AuthInfo => {
  switch (action.type) {
    case 'login':
      if (!action.payload?.jwt) return state;
      const jwt = action.payload.jwt;
      localStorage.setItem('token', jwt);
      const decoded = jwtDecode<TokenDecoded>(jwt);
      if (action.payload?.onLogin) action.payload?.onLogin();
      return {jwt, info: formatDecoded(decoded), isLogged: true};
    case 'logout':
      localStorage.clear();
      return initialState;
    default:
      throw new Error('Unknown action type requested on Auth Reducer');
  }
};

const initializer = () => {
  const token = localStorage.getItem('token');
  if (!token) return initialState;
  try {
    const decoded = jwtDecode<TokenDecoded>(token);
    return {jwt: token, info: formatDecoded(decoded), isLogged: true};
  } catch {
    return initialState;
  }
};

const AuthContext = createContext<
  { user: AuthInfo; dispatch: React.Dispatch<Action> } | undefined>(
      undefined,
  );

const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = (
    {children}: { children: React.ReactNode},
) => {
  const [user, dispatch] = useReducer(reducer, initializer());
  return (
    <AuthContext.Provider value={{user, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
