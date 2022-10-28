import { Role } from 'types';
import { useAuth } from 'hooks';
import { Navigate } from 'react-router-dom';
import React from 'react';

type Props = {
	restrictedTo?: Role[];
	children: JSX.Element;
};

const ProtectedRoute = ({ restrictedTo, children }: Props) => {
	const auth = useAuth();
	const redirect = restrictedTo ? `/403?authorizedTo=${restrictedTo[0]}` : '/login';

	if (!auth?.user.isLogged) {
		return (
			<Navigate
				to={{
					pathname: `/login`,
				}}
			/>
		);
	}

	const isNotAllowed = !restrictedTo?.includes(auth.user?.info?.role || 'player');
	if (!!restrictedTo && isNotAllowed) {
		return <Navigate to={redirect} />;
	}
	return children;
};

export default ProtectedRoute;
