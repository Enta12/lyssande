/* eslint-disable sonarjs/cognitive-complexity */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataCastingContainer, ErrorPage, InputSelect } from 'components';
import PcSessionSelector from 'components/PcSessionSelector';
import PrimaryButton from 'components/Primary-button';
import { PcType, Platform } from 'types';
import { days, months } from 'moockedData';
import { toast } from 'react-toastify';
import { useAuth, useApi, useData } from 'hooks';
import { getStatus } from 'hooks/useData';

type AvailabilitySend = {
	user: string;
	at: {
		date: number;
		moment: 'soirée' | 'journée';
	};
	platform: Platform;
};

type PossiblePlatform = {
	online?: string[];
	'just-irl'?: string[];
};

type PossibleDate = {
	date: number;
	journée?: PossiblePlatform;
	soirée?: PossiblePlatform;
};

const MOMENT: Array<'journée' | 'soirée'> = ['journée', 'soirée'];
const PLATFORM: Array<'online' | 'just-irl'> = ['online', 'just-irl'];

const platformTrad = {
	online: 'ligne',
	'just-irl': 'irl',
};

const CreateSession = () => {
	const [selectedPcs, setSelectedPcs] = useState<string[]>([]);
	const [lastQuest, setLastQuest] = useState('');
	const [selectedDate, setSelectedDate] = useState<number>(0);
	const { status: charactersStatus, data: characters } = useData<PcType[]>(
		'Impossible de récupérer les personnages',
		[],
		'/characters'
	);
	const { status: usersStatus, data: players } = useData<PcType[]>(
		'Impossible de récupérer les joueurs',
		[],
		'/users'
	);
	const [possibleDates, setPossibleDates] = useState<PossibleDate[]>([]);
	const [selectedPlatform, setSelectedPlatform] = useState<number>(0);
	const [selectedMoment, setSelectedMoment] = useState(0);
	const navigate = useNavigate();
	const api = useApi();
	const [availabilitiesStatus, setAvailabilitiesStatus] = useState<'loading' | 'data'>('loading');
	const auth = useAuth();

	useEffect(() => {
		try {
			const removeUselessPlatform = (possiblePlatform?: PossiblePlatform) => {
				const removeUselessAvailability = (
					platform: 'just-irl' | 'online',
					gmId: string,
					tempData: PossiblePlatform
				) => {
					const platformData = possiblePlatform?.[platform];
					if (platformData && platformData.includes(gmId)) {
						const playersOfAvailabilityFiltered = platformData.filter((player) => player !== gmId);
						if (playersOfAvailabilityFiltered.length > 0)
							tempData[platform] = playersOfAvailabilityFiltered;
					}
				};
				const tempData: PossiblePlatform = {};
				const gmId = auth?.user.info?.id;
				if (!gmId) return tempData;
				removeUselessAvailability('just-irl', gmId, tempData);
				removeUselessAvailability('online', gmId, tempData);
				return tempData;
			};
			const removeUselessMoment = (possibleDate: PossibleDate) => {
				const tempData: PossibleDate = { date: possibleDate.date };
				if (possibleDate.journée?.['just-irl'] || possibleDate.journée?.online)
					tempData.journée = possibleDate.journée;
				if (possibleDate.soirée?.['just-irl'] || possibleDate.soirée?.online)
					tempData.soirée = possibleDate.soirée;
				return tempData;
			};
			const fetchData = async () => {
				const userRes = await api.get('/users');
				const charactersRes = await api.get('/characters');
				const availabilitiesRes = await api.get('/availabilities');

				const possibleDatesTemp: PossibleDate[] = [];
				availabilitiesRes.data.forEach((availabilityRes: AvailabilitySend) => {
					if (
						availabilityRes.platform !== 'none' &&
						availabilityRes.platform !== 'rest' &&
						availabilityRes.platform !== 'in-game'
					) {
						let index = possibleDatesTemp.findIndex(
							(possibleDates) => possibleDates.date === availabilityRes.at.date
						);
						if (index === -1) {
							possibleDatesTemp.push({
								date: availabilityRes.at.date,
								journée: {
									online: [],
									'just-irl': [],
								},
								soirée: {
									online: [],
									'just-irl': [],
								},
							});
							index = possibleDatesTemp.length - 1;
						}
						if (availabilityRes.platform === 'irl-or-online') {
							possibleDatesTemp[index][availabilityRes.at.moment]?.['just-irl']?.push(
								availabilityRes.user
							);
							possibleDatesTemp[index][availabilityRes.at.moment]?.['online']?.push(
								availabilityRes.user
							);
						} else {
							possibleDatesTemp[index][availabilityRes.at.moment]?.[availabilityRes.platform]?.push(
								availabilityRes.user
							);
						}
					}
				});
				setPossibleDates(
					possibleDatesTemp
						.map((possibleDate) => {
							return {
								date: possibleDate.date,
								journée: removeUselessPlatform(possibleDate.journée),
								soirée: removeUselessPlatform(possibleDate.soirée),
							};
						})
						.map((possibleDates) => removeUselessMoment(possibleDates))
						.filter((possibleDates) => possibleDates['journée'] || possibleDates['soirée'])
				);
				setAvailabilitiesStatus('data');
			};
			fetchData();
		} catch (error) {
			toast.error('Erreur lors de la récupération des données');
		}
	}, []);
	useEffect(() => {
		const date = possibleDates[selectedDate];
		if (date) {
			const possibleDateKeys = Object.keys(date);
			if (possibleDateKeys.length === 2) {
				setSelectedMoment(MOMENT.findIndex((moment) => moment === possibleDateKeys[1]));
			}
		}
	}, [possibleDates, selectedDate]);
	useEffect(() => {
		const moment = possibleDates[selectedDate]?.[MOMENT[selectedMoment]];
		if (moment) {
			const possibleDateKeys = Object.keys(moment);
			if (possibleDateKeys.length === 1) {
				setSelectedPlatform(PLATFORM.findIndex((platform) => platform === possibleDateKeys[0]));
			}
		}
	}, [possibleDates, selectedDate]);

	const getPlayerAvailableOnOtherMoment = () => {
		if (!possibleDates[selectedDate][MOMENT[(selectedMoment + 1) % 2]]?.['just-irl']) {
			return possibleDates[selectedDate][MOMENT[(selectedMoment + 1) % 2]]?.online?.length;
		}
		const concatMoment = possibleDates[selectedDate][MOMENT[(selectedMoment + 1) % 2]]?.[
			'just-irl'
		]?.concat(possibleDates[selectedDate][MOMENT[(selectedMoment + 1) % 2]]?.online || []);
		return concatMoment?.filter((player, index) => concatMoment?.indexOf(player) === index).length;
	};
	const getPlayerAvailableOnOtherPlatform = () =>
		possibleDates[selectedDate][MOMENT[selectedMoment]]?.[PLATFORM[(selectedPlatform + 1) % 2]]
			?.length;

	const getById = (id: string) => {
		return characters?.filter((el) => el.id === id)[0];
	};

	const setSelectedPc = (playerIndex: number, pcID: string) => {
		const selectedPcsTemp = [...selectedPcs];
		selectedPcsTemp[playerIndex] = pcID;
		setSelectedPcs(selectedPcsTemp);
		const newSelectedCharacter = getById(pcID);
		setLastQuest(
			selectedPcs.some((element) => {
				const currentCharacter = getById(element);
				return (
					newSelectedCharacter.quest !== currentCharacter.quest &&
					newSelectedCharacter.quest !== undefined &&
					currentCharacter.quest !== undefined
				);
			})
				? ''
				: newSelectedCharacter.quest || lastQuest
		);
	};

	const handlePlatformChange = (value: number) => {
		setSelectedPcs([]);
		if (value !== selectedPlatform) setSelectedPlatform(value);
	};
	const handleDateChange = (value: number) => {
		setSelectedPcs([]);
		if (value !== selectedDate) setSelectedDate(value);
	};
	const handleMomentChange = (value: number) => {
		setSelectedPcs([]);
		setSelectedMoment(value);
	};

	const submit = async () => {
		if (selectedDate === undefined) {
			toast.error('Pas de dates selectionnés');
			return;
		}
		if (!selectedPcs.some((el) => !!el)) {
			toast.error('Veuillez selectionner au moins un personnage');
			return;
		}
		try {
			await api.post('/sessions', {
				date: `${possibleDates[selectedDate].date}`,
				moment: MOMENT[selectedMoment],
				platform: PLATFORM[selectedPlatform],
				characters: selectedPcs.filter((el) => !!el),
			});
			toast.success('La partie à été créer avec succès');
			navigate('/map');
		} catch (error) {
			toast.error('Impossible de créer la partie');
		}
	};

	return (
		<DataCastingContainer
			status={getStatus(charactersStatus, usersStatus, availabilitiesStatus)}
			dataElements="disponibilités"
		>
			{possibleDates.length && (
				<div className="w-full flex items-center flex-col gap-3 text-brown font-bubblegum text-lg">
					<div
						className="
                        w-full
                        flex
                        items-center
                        gap-2"
					>
						<span className="w-8">Le</span>
						<InputSelect
							required
							placeholder="Aucune date"
							options={possibleDates.map((possibleDate) => {
								const date = new Date(+possibleDate.date);
								return `${days[date.getDay()]}
                                    ${date.getDate()}
                                    ${months[date.getMonth()]}`;
							})}
							onSelectValue={(value) => handleDateChange(value[0])}
							values={[selectedDate]}
							className="w-52"
							type="secondary"
						/>
					</div>
					<div
						className="
                        w-full
                        flex
                        items-center
                        gap-2"
					>
						<span className="w-8">En</span>
						{Object.keys(possibleDates[selectedDate]).length === 3 ? (
							<>
								<InputSelect
									required
									options={MOMENT}
									onSelectValue={(value) => handleMomentChange(value[0])}
									values={[selectedMoment]}
									className="w-52"
									type="secondary"
								/>
								<span>
									{`
                    ${getPlayerAvailableOnOtherMoment()}
                    joueur(s) présent(s) en ${MOMENT[(selectedMoment + 1) % 2]}
                `}
								</span>
							</>
						) : (
							<div className="p-1.5 bg-slate-300 rounded-lg px-3 w-52">
								{Object.keys(possibleDates[selectedDate])[1]}
							</div>
						)}
					</div>
					<div
						className="
                        w-full
                        flex
                        items-center
                        gap-2"
					>
						<span className="w-8">Sur</span>
						{Object.keys(possibleDates[selectedDate]?.[MOMENT[selectedMoment]] || {}).length ===
						2 ? (
							<>
								<InputSelect
									required
									options={PLATFORM.map((platform) => platformTrad[platform])}
									onSelectValue={(value) => handlePlatformChange(value[0])}
									values={[selectedPlatform]}
									className="w-52"
									type="secondary"
								/>
								<span>
									{`
                    ${getPlayerAvailableOnOtherPlatform()}
                    joueur(s) présent(s) en ${platformTrad[PLATFORM[(selectedPlatform + 1) % 2]]}
                `}
								</span>
							</>
						) : (
							<div className="p-1.5 bg-slate-300 rounded-lg px-3 w-52">
								{
									platformTrad[
										Object.keys(possibleDates[selectedDate]?.[MOMENT[selectedMoment]] || {})[0] as
											| 'online'
											| 'just-irl'
									]
								}
							</div>
						)}
					</div>
					<div
						className="
                        w-full
                        flex
                        items-center
                        gap-2"
					></div>
					{possibleDates[selectedDate]?.[MOMENT[selectedMoment]]?.[PLATFORM[selectedPlatform]]?.map(
						(playerId, index) => {
							const irlOrOnline = possibleDates[selectedDate]?.[MOMENT[selectedMoment]]?.[
								PLATFORM[(selectedPlatform + 1) % 2]
							]?.some((currentPlayerId) => currentPlayerId === playerId);
							return (
								<PcSessionSelector
									platform={irlOrOnline ? 'irl-or-online' : PLATFORM[selectedPlatform % 2]}
									quest={lastQuest}
									selectedPc={selectedPcs[index]}
									onSelectedPc={setSelectedPc}
									playerIndex={index}
									key={index}
									pcs={characters.filter((pc) => pc.player === playerId)}
									playerName={
										players.find((player) => player.id === playerId)?.name || 'User introuvable'
									}
								/>
							);
						}
					)}
					<PrimaryButton text={'Créer une partie'} onClick={submit} />
				</div>
			)}
			{!possibleDates.length && (
				<ErrorPage
					text={{
						title: 'AUCUNE SESSIONS POSSIBLES',
						firstLine: "Personne n'a de dispobilité compatible avec les autres",
						secondLine:
							'Si cela vous paret étrange vérifier que vous avez bien remplie vos dispobilité et demander à vos joueurs si eux aussi l’on fait.',
					}}
				/>
			)}
		</DataCastingContainer>
	);
};

export default CreateSession;
