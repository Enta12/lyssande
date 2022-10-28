import React from 'react';
import illustration from 'assets/images/403-picture.png';
import { Title } from 'components';
import { useAuth } from 'hooks';
import { useSearchParams } from 'react-router-dom';
import { Role } from 'types';

type Props = {};

const ROLE_TRAD = {
	gm: 'maitres du jeux',
	admin: 'administrateurs',
	player: 'joueurs',
};

const ForbiddenPage = ({}: Props) => {
	const auth = useAuth();
	const role = auth?.user.info?.role;
	const currentRole = role ? ROLE_TRAD[role] : 'visiteurs';
	const [searchParams] = useSearchParams();
	const restrictedTo = ROLE_TRAD[(searchParams.get('authorizedTo') as Role) || 'player'];

	return (
		<div className="sm:justify-between justify-center flex w-full flex-1">
			<div className="flex flex-col pt-12 gap-2 font-bubblegum text-brown text-2xl">
				<Title title="ACCES INTERDIT" className="sm:text-start text-center" />
				<p className="sm:text-start text-center my-4">Nous sommes désolé.</p>
				<p className="sm:text-start text-center">
					{`Cette page n'est pas accessible aux ${currentRole},`}
				</p>
				<p className="sm:text-start text-center">{`elle est reservé aux ${restrictedTo}.`}</p>
			</div>
			<img
				className="contain self-end hidden lg:block relative top-6 max-w-[331px]"
				src={illustration}
				alt="gandalf"
			/>
		</div>
	);
};

export default ForbiddenPage;
