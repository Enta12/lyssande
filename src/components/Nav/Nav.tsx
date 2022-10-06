import React from 'react';
import {useAuth} from 'hook';
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
      <NavLink href="/pj">PJS</NavLink>
      <NavLink href="/map">Carte</NavLink>
      {
        (
          auth?.user.info?.role === 'admin' ||
          auth?.user.info?.role === 'gm'
        ) &&
          <>
            <NavLink href="/player">Joueurs</NavLink>
            <NavLink href="/fight">Combat</NavLink>
            <NavLink href="/newSession">Créer une partie</NavLink>
          </>
      }
      {
        auth?.user.info?.role === 'admin' &&
        <NavLink href="/addUser">Ajouter un utilisateur</NavLink>
      }
    </nav>
  );
};

export default Nav;
