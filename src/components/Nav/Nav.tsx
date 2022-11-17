import React from 'react';
import { useAuth } from 'hooks';
import NavLink from './NavLink';
import NavContainer from './NavContainer';

const Nav = () => {
	const auth = useAuth();
	return (
		<nav className="flex">
			<NavLink href="/calendar">Calendrier</NavLink>
			<NavLink href="/pc">PJS</NavLink>
			{auth?.user.info?.role === 'gm' && (
				<>
					<NavLink href="/players">Joueurs</NavLink>
				</>
			)}
			{auth?.user.info?.role === 'admin' && (
				<NavContainer
					title="Joueurs"
					navlinks={[
						{ url: '/players', name: 'Tous les joueurs' },
						{ url: '/players/add', name: 'Création' },
					]}
				/>
			)}
			{auth?.user.info?.role === 'player' ? (
				<NavLink href="/sessions">Mes parties</NavLink>
			) : (
				<NavContainer
					title="Parties"
					navlinks={[
						{ url: '/sessions/add', name: 'Créer une partie' },
						{ url: '/sessions', name: 'Mes parties' },
					]}
				/>
			)}
			{auth?.user.info?.role === 'player' ? (
				<NavLink href="/map">Carte</NavLink>
			) : (
				<NavContainer
					title="Outils"
					navlinks={[
						{ url: '/map', name: 'Carte' },
						{ url: '/fight', name: 'Combat' },
					]}
				/>
			)}
		</nav>
	);
};

export default Nav;
