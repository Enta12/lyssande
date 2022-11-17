import React, { useState } from 'react';
import { useAuth, useOutsideClicker } from 'hooks';
import NavLink from './NavLink';
import NavContainer from './NavContainer';
import { ReactComponent as BurgerIcon } from 'assets/icon/burger.svg';

const Nav = () => {
	const [isOpen, setOpen] = useState(false);
	const mobileNavModal = useOutsideClicker(() => setOpen(false));

	const auth = useAuth();
	return (
		<>
			<nav className="md:flex hidden">
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
			<div className="flex flex-col md:hidden">
				<BurgerIcon className="cursor-pointer" onClick={() => setOpen(true)} />
				{isOpen && (
					<nav
						ref={mobileNavModal}
						className="z-10 absolute bg-gray-300 rounded-xl flex flex-col right-4 p-4 top-24 items-center"
					>
						<NavLink swamp href="/calendar">
							Calendrier
						</NavLink>
						<NavLink swamp href="/pc">
							PJS
						</NavLink>
						<NavLink swamp href="/sessions">
							Mes parties
						</NavLink>
						<NavLink swamp href="/map">
							Carte
						</NavLink>
						{(auth?.user.info?.role === 'gm' || auth?.user.info?.role === 'admin') && (
							<>
								<NavLink swamp href="/players">
									Joueurs
								</NavLink>
								<NavLink swamp href="/sessions/add">
									Créer une partie
								</NavLink>
								<NavLink swamp href="/fight">
									Combat
								</NavLink>
							</>
						)}
						{auth?.user.info?.role === 'admin' && (
							<>
								<NavLink href="/players/add">Créer un joueur</NavLink>
							</>
						)}
					</nav>
				)}
			</div>
		</>
	);
};

export default Nav;
