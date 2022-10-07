import React from 'react';
import {useAuth} from 'hooks';
import NavLink from './NavLink';

const Nav = () => {
  const auth = useAuth();
  return (
    <nav>
      {
        auth?.user.info?.role === 'player' &&
        <NavLink href="/">Mon compte</NavLink>
      }
      <NavLink href="/calendar">Calendrier</NavLink>
      <NavLink href="/sessions">Mes parties</NavLink>
      <NavLink href="/pc">PJS</NavLink>
      <NavLink href="/map">Carte</NavLink>
      {
        (
          auth?.user.info?.role === 'admin' ||
          auth?.user.info?.role === 'gm'
        ) &&
          <>
            <NavLink href="/players">Joueurs</NavLink>
            <NavLink href="/fight">Combat</NavLink>
            <NavLink href="/sessions/add">Créer une partie</NavLink>
          </>
      }
      {
        auth?.user.info?.role === 'admin' &&
        <NavLink href="/players/add">Ajouter un utilisateur</NavLink>
      }
    </nav>
  );
};

export default Nav;
