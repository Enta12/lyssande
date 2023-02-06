import { Title, PrimaryButton, DataCastingContainer } from 'components';
import Calendar from './Calendar/Calendar';
import React, { useEffect, useState } from 'react';
import { Availability, Platform } from 'types';
import { toast } from 'react-toastify';
import useApi from 'hooks/useApi';
import useData from 'hooks/useData';
import dayjs from 'dayjs';
import { months } from 'moockedData';
import { ReactComponent as Arrow } from 'assets/icon/arrow.svg';
import cn from 'classnames';
import availabilityNone from 'assets/icon/availabilityNone.svg';
import availabilityIrl from 'assets/icon/availabilityIrl.svg';
import availabilityIrlOrIl from 'assets/icon/availabilityIrlOrIl.svg';
import availabilityIl from 'assets/icon/availabilityIl.svg';
import availabilityIG from 'assets/icon/availabilityIG.svg';
import availabilityRest from 'assets/icon/availabilityRest.svg';

type AvailabilitySave = {
	platform: Platform;
	at: {
		date: number;
		moment: 'journée' | 'soirée';
	};
};

const CalendarPage = () => {
	const [selectedMonth, setselectedMonth] = useState(
		new Date(dayjs(new Date()).add(1, 'day').toDate())
	);
	const numbersOfDays = dayjs(selectedMonth).daysInMonth();
	const api = useApi();
	const {
		status,
		data: availabilities,
		setData: setAvailabilities,
	} = useData<Availability[], AvailabilitySave>(
		'Impossible de récupérer vos disponibilités',
		[],
		'/users/availabilities',
		(el: AvailabilitySave) => ({
			platform: el.platform,
			at: {
				date: new Date(+el.at.date),
				moment: el.at.moment,
			},
		})
	);

	useEffect(() => {
		if (status === 'data') initiateMonthAvailabilities();
	}, [selectedMonth, status]);

	const initiateMonthAvailabilities = () => {
		const newAvailabilities: Availability[] = [];
		for (let i = 0; i < numbersOfDays; i++) {
			const day = dayjs(selectedMonth).date(i);
			if (
				!availabilities.find((el) => dayjs(el.at.date).isSame(day, 'day')) &&
				dayjs(day).isAfter(dayjs(), 'day')
			) {
				newAvailabilities.push(
					{
						platform: day.day() === 0 || day.day() === 6 ? 'irl-or-online' : 'none',
						at: {
							date: day.toDate(),
							moment: 'journée',
						},
					},
					{
						platform: day.day() === 0 || day.day() === 6 ? 'irl-or-online' : 'none',
						at: {
							date: day.toDate(),
							moment: 'soirée',
						},
					}
				);
			}
		}
		setAvailabilities([...availabilities, ...newAvailabilities]);
	};
	const onSubmit = async () => {
		try {
			await api.put(
				'/availabilities',
				availabilities.map((el) => ({
					at: {
						date: `${el.at.date.getTime()}`,
						moment: el.at.moment,
					},
					platform: el.platform,
				}))
			);
			toast.success('mise à jour réussie');
		} catch {
			toast.error('Impossible de mettre à jour vos disponibilités');
		}
	};
	return (
		<DataCastingContainer status={status} dataElements="disponibilités">
			<div className="flex flex-col gap-3 min-w-full">
				<div className="mx-auto bg-lightBrown font-bubblegum w-full max-w-[1000px] sm:rounded-xl overflow-hidden">
					<div className="h-24 flex items-center justify-center">
						<div className="h-20 flex items-center justify-between px-4 bg-white w-44 rounded-2xl drop-shadow">
							{!dayjs().isSame(selectedMonth, 'month') ? (
								<button
									onClick={() =>
										setselectedMonth(dayjs(selectedMonth).subtract(1, 'month').toDate())
									}
								>
									<Arrow className={cn({ grayscale: dayjs().isSame(selectedMonth, 'month') })} />
								</button>
							) : (
								<div className="w-[40px]"></div>
							)}
							<div className="text-3xl text-darkBrown">{months[dayjs(selectedMonth).month()]}</div>
							<button
								onClick={() => setselectedMonth(dayjs(selectedMonth).add(1, 'month').toDate())}
							>
								<Arrow className="rotate-180" />
							</button>
						</div>
					</div>
					<Calendar
						numbersOfDays={numbersOfDays}
						availabilities={availabilities.filter((availability) =>
							dayjs(availability.at.date).isSame(selectedMonth, 'month')
						)}
						updateAvailabilities={setAvailabilities}
					/>
				</div>
				<PrimaryButton text={'Envoyer'} className="self-center" onClick={onSubmit} />
				<div className="flex flex-col gap-1">
					<Title subtitle title="Légende" />
					<div className="flex gap-3 items-center">
						<img src={availabilityIl} alt="en ligne" /> Disponible en ligne
					</div>
					<div className="flex gap-3 items-center">
						<img src={availabilityIrlOrIl} alt="en ligne ou IRL" />
						Disponible en ligne ou IRL
					</div>
					<div className="flex gap-3 items-center">
						<img src={availabilityIrl} alt="irl" />
						Disponible IRL
					</div>
					<div className="flex gap-3 items-center">
						<img src={availabilityNone} alt="non dispo" />
						Non Disponible
					</div>
					<div className="flex gap-3 items-center">
						<img src={availabilityRest} alt="en repos" />A une partie ce jour
					</div>
					<div className="flex gap-3 items-center">
						<img src={availabilityIG} alt="en jeu" />A une partie à ce moment
					</div>
				</div>
			</div>
		</DataCastingContainer>
	);
};

export default CalendarPage;
