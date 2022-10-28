import PlayerCard from 'components/PlayerCard';
import Title from 'components/Title';
import React, { useEffect, useState } from 'react';
import { UserInfo } from 'types';
import { useApi } from 'hooks';
import { toast } from 'react-toastify';

const Players = () => {
	const [users, setUsers] = useState<UserInfo[]>([]);
	const api = useApi();
	useEffect(() => {
		try {
			const fetchData = async () => {
				const res = await api.get('/users');
				setUsers(res.data);
			};
			fetchData();
		} catch (error) {
			toast.error('Erreur dans la récupération des joueurs');
		}
	}, []);

	return (
		<div className="pt-8 w-full flex flex-col">
			<Title title="LES JOUEURS" />
			<div className="mt-8 grid grid-cols-auto-fill-220 gap-4">
				{users && users.map((user, index) => <PlayerCard key={index} player={user} />)}
			</div>
		</div>
	);
};

export default Players;
