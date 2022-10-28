import PlayerCard from 'components/PlayerCard';
import Title from 'components/Title';
import React from 'react';
import { UserInfo } from 'types';
import { useApi, useData } from 'hooks';
import { DataCastingContainer } from 'components';

const Players = () => {
	const api = useApi();
	const { status, data: users } = useData<UserInfo[]>(
		'Impossible de récupérer les informations du joueur',
		[],
		'/users'
	);

	return (
		<DataCastingContainer status={status} dataElements="joueurs">
			<div className="pt-8 w-full flex flex-col">
				<Title title="LES JOUEURS" />
				<div className="mt-8 grid grid-cols-auto-fill-220 gap-4">
					{users && users.map((user, index) => <PlayerCard key={index} player={user} />)}
				</div>
			</div>
		</DataCastingContainer>
	);
};

export default Players;
