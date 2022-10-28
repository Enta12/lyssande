import React, { useEffect, useState } from 'react';
import { Session, UserInfo } from 'types';
import { DataCastingContainer, Input, PcCard, PrimaryButton, TextInput, Title } from 'components';
import { useNavigate, useParams } from 'react-router-dom';
import avalabilityIrl from 'assets/icon/availabilityIrl.svg';
import avalabilityIl from 'assets/icon/availabilityIl.svg';
import { months } from 'moockedData';
import { toast } from 'react-toastify';
import { useApi, useData } from 'hooks';
import { getStatus } from 'hooks/useData';

const platformIcon = {
	online: {
		icon: avalabilityIl,
		alt: 'En ligne',
	},
	'just-irl': {
		icon: avalabilityIrl,
		alt: 'En vrai',
	},
};

const SessionEditPage = () => {
	const [session, setSession] = useState<Session>();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [statusSession, setStatusSession] = useState<'loading' | 'data'>('loading');
	const { status, data: users } = useData<UserInfo[]>(
		'Impossible de récupérer les informations du joueur',
		[],
		'/users'
	);
	const api = useApi();
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const sessionRes = await api.get(`/sessions/${params.id}`);
				setSession(sessionRes.data);
				setTitle(sessionRes.data.title || '');
				setDescription(sessionRes.data.description || '');
				setStatusSession('data');
			} catch (error) {
				toast.error('Impossible de récupérer les informations de la partie');
			}
		};
		fetchData();
	}, []);
	const sessionDate = new Date(session ? +session.date : '');
	const gm = users[users.findIndex((el) => el.id === session?.gm)];
	const submit = async () => {
		if (sessionDate > new Date()) {
			toast.error('Vous ne pouvez pas mettre à jour une partie à venir');
			return;
		}
		try {
			await api.put(`/sessions/${params.id}`, {
				description,
				title,
			});
			toast.success('La partie à été mise à jour avec succès');
			navigate('/');
		} catch (error) {
			toast.error('impossible de mettre à jour la partie');
		}
	};
	return (
		<DataCastingContainer status={getStatus(status, statusSession)} dataElements="sessions">
			<div className="flex flex-col gap-3 w-full">
				<Title
					className="self-center"
					title={
						session
							? `Partie du
                            ${' ' + sessionDate.getDate()}
                            ${' ' + months[sessionDate.getMonth()] + ' '}
                            en ${session?.moment}`
							: ''
					}
				/>
				<div className="flex gap-2">
					{session && (
						<img
							src={platformIcon[session.platform].icon}
							alt={platformIcon[session.platform].alt}
						/>
					)}
					<p className="text-2xl p-5 text-swamp font-bubblegum">
						{gm && (
							<span className="mr-4 text-darkBrown">
								Organisé par {gm.name.toLocaleUpperCase()}
							</span>
						)}
						AVEC
						{session &&
							session.characters.map((characterData, index) => {
								const character =
									users[users.findIndex((user) => user.id === characterData.player)];
								return (
									<span className="ml-2 text-bladeBrown" key={index}>
										{character
											? `- ${character.name.toLocaleUpperCase()} -`
											: '- PERSONNE INTROUVABLE -'}
									</span>
								);
							})}
					</p>
				</div>
				<div
					className="
                        bg-orange/[.8]
                        flex
                        flex-col
                        gap-4
                        p-5
                        rounded-2xl"
				>
					<Input
						label="Nom de la partie"
						placeholder="Exemple: Recherche du joyau magique"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<TextInput
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Un jour, trois aventuriers..."
						label="Résumé de la partie"
					/>
				</div>
				<div
					className="
                        grid
                        grid-cols-auto-fill-220
                        grid-flow-rows
                        gap-5"
				>
					{session &&
						session.characters.map((characterData, index) => (
							<PcCard key={index} pcData={characterData} />
						))}
				</div>
				<PrimaryButton onClick={submit} className="self-center" text="Mettre à jour la partie" />
			</div>
		</DataCastingContainer>
	);
};

export default SessionEditPage;
