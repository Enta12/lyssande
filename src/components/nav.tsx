import React, {useContext} from 'react';
import {AuthContext} from '../AppRoute';

const Nav = () => {
  const {user} = useContext(AuthContext);
  return (
    <nav className="">
      { user?.role === 'player' && <NavLink href="/">Accueil</NavLink>}
      <NavLink href="/calendar">Calendrier</NavLink>
      <NavLink href="/pj">PJS</NavLink>
      <NavLink href="/map">Carte</NavLink>
      {
        (
          user?.role === 'admin' ||
          user?.role === 'gm'
        ) &&
          <>
            <NavLink href="/player">Joeurs</NavLink>
            <NavLink href="/fight">Combat</NavLink>
            <NavLink href="newSession">Créer une session</NavLink>
          </>
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
