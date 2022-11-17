import React, { useState } from 'react';
import { useAuth, useOutsideClicker } from 'hooks';
import NavLink from './NavLink';
import NavContainer from './NavContainer';
import { ReactComponent as BurgerIcon } from 'assets/icon/burger.svg';

const Nav = () => {
	const [isOpen, setOpen] = useState(false);
	const mobileNavModal = useOutsideClicker(() => setOpen(false));
	const auth = useAuth();

	const navData = [
		{
			name: 'Calendrier',
			children: [
				{
					name: 'Calendrier',
					url: '/calendar',
					access: ['admin', 'gm', 'player'],
				},
			],
		},
		{
			name: 'PJS',
			children: [
				{
					name: 'PJS',
					url: '/pc',
					access: ['admin', 'gm', 'player'],
				},
			],
		},
		{
			name: 'Utilisateurs',
			children: [
				{
					name: auth?.user.info?.role === 'admin' ? 'Voir les utilisateurs' : 'Voir les joueurs',
					url: '/players',
					access: ['admin', 'gm'],
				},
				{
					name: 'Création',
					url: '/players/add',
					access: ['admin'],
				},
			],
		},
		{
			name: 'Paties',
			children: [
				{
					name: 'Mes parties',
					url: '/sessions',
					access: ['admin', 'gm', 'player'],
				},
				{
					name: 'Création',
					url: '/sessions/add',
					access: ['admin', 'gm'],
				},
			],
		},
		{
			name: 'Outils',
			children: [
				{
					name: 'Combat',
					url: '/fight',
					access: ['admin', 'gm'],
				},
				{
					name: 'Carte',
					url: '/map',
					access: ['admin', 'gm', 'player'],
				},
			],
		},
	];

	const navFilteredByAccess = navData
		.map((data) => {
			const { children, ...rest } = data;
			const childrenFiltered = children.filter((navElement) =>
				navElement.access.includes(auth?.user.info?.role || '')
			);
			return {
				...rest,
				children: childrenFiltered,
			};
		})
		.filter((data) => data.children.length);

	return (
		<>
			<nav className="md:flex hidden">
				{navFilteredByAccess.map((data, index) => {
					if (data.children.length > 1) {
						return <NavContainer key={index} title={data.name} navlinks={data.children} />;
					}
					return (
						<NavLink key={index} href={data.children[0].url}>
							{data.children[0].name}
						</NavLink>
					);
				})}
			</nav>
			<div className="flex flex-col md:hidden">
				<BurgerIcon className="cursor-pointer" onClick={() => setOpen(true)} />
				{isOpen && (
					<nav
						ref={mobileNavModal}
						className="z-10 absolute bg-gray-300 rounded-xl flex flex-col right-4 p-4 top-24 items-center"
					>
						{navFilteredByAccess.map((data, catIndex) => {
							data.children.map((navElement, catNav) => (
								<NavLink key={`${catIndex}${catNav}`} href={navElement.url}>
									{navElement.name}
								</NavLink>
							));
						})}
					</nav>
				)}
			</div>
		</>
	);
};

export default Nav;
