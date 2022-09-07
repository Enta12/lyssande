import React, {useContext} from 'react';
import {AuthContext} from '../AppRoute';

const Nav = () => {
  const {user} = useContext(AuthContext);
  return (
    <nav className="">
      { user?.role === 'player' && <NavLink href="/">Mon compte</NavLink>}
      <NavLink href="/calendar">Calendrier</NavLink>
      <NavLink href="/sessions">Mes parties</NavLink>
      <NavLink href="/pj">PJS</NavLink>
      <NavLink href="/map">Carte</NavLink>
      {
        (
          user?.role === 'admin' ||
          user?.role === 'gm'
        ) &&
          <>
            <NavLink href="/player">Joueurs</NavLink>
            <NavLink href="/fight">Combat</NavLink>
            <NavLink href="/newSession">Créer une partie</NavLink>
          </>
      }
      {
        user?.role === 'admin' &&
        <NavLink href="/addUser">Ajouter un utilisateur</NavLink>
      }
    </nav>
  );
};

const NavLink = (props : {children: string, href: string}) => {
  const {href, children} = props;
  return (
    <a href={href} className="
        text-gray-300
        mx-2.5
        font-semibold
        text-2xl
    ">
      {children}
    </a>
  );
};

export default Nav;
