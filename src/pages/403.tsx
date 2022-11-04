import React from 'react';
import illustration from 'assets/images/403-picture.png';
import { ErrorPage } from 'components';
import { useAuth } from 'hooks';
import { useSearchParams } from 'react-router-dom';
import { Role } from 'types';

const ROLE_TRAD = {
	gm: 'maitres du jeux',
	admin: 'administrateurs',
	player: 'joueurs',
};

const ForbiddenPage = () => {
	const auth = useAuth();
	const role = auth?.user.info?.role;
	const currentRole = role ? ROLE_TRAD[role] : 'visiteurs';
	const [searchParams] = useSearchParams();
	const restrictedTo = ROLE_TRAD[(searchParams.get('authorizedTo') as Role) || 'player'];

	return (
		<ErrorPage
			text={{
				pageTitle: 'ACCES INTERDIT',
				firstLine: `Cette page n'est pas accessible aux ${currentRole},`,
				secondLine: `elle est reservé aux ${restrictedTo}.`,
			}}
			img={{
				src: illustration,
				alt: 'gandalf avec son baton',
				maxSize: 'max-w-[331px]',
			}}
		/>
	);
};

export default ForbiddenPage;
