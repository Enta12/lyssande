import {Role} from 'types';
import {useAuth} from 'hooks';
import {Navigate} from 'react-router-dom';
import React from 'react';

type Props = {
    restricted?: { to: Role[]; redirectPath: string };
    children: JSX.Element;
};

const ProtectedRoute= ({restricted, children}: Props) => {
  const auth = useAuth();

  if (!auth?.user.isLogged) {
    return (
      <Navigate
        to={{
          pathname: `/login`,
        }}
      />
    );
  }

  const isNotAllowed = !restricted?.to.includes(
      auth.user?.info?.role || 'player');
  if (!!restricted && isNotAllowed) {
    return <Navigate to={restricted.redirectPath} />;
  }
  return children;
};

export default ProtectedRoute;
