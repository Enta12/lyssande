import { Availability, Platform } from 'types';
import React from 'react';
import { days } from 'moockedData';
import DayCard from './DayCard';
import dayjs from 'dayjs';

type Props = {
	availabilities: Availability[];
	numbersOfDays: number;
	updateAvailabilities: (newAvailabilities: Availability[]) => void;
};

type formattedAvailabilities = {
	day?: Platform;
	evenning?: Platform;
	date: dayjs.Dayjs;
};

const getFormatedAvailabilities = (availabilities: Availability[]) => {
	const formattedAvailabilities: formattedAvailabilities[] = [];
	availabilities.forEach((availability) => {
		const formattedAvailabilityElement = formattedAvailabilities.find((availabilityFormatted) =>
			dayjs(availability.at.date).isSame(availabilityFormatted.date, 'day')
		);
		if (formattedAvailabilityElement) {
			availability.at.moment === 'soirée'
				? (formattedAvailabilityElement.evenning = availability.platform)
				: (formattedAvailabilityElement.day = availability.platform);
		} else {
			formattedAvailabilities.push({
				date: dayjs(availability.at.date),
				evenning: availability.at.moment === 'soirée' ? availability.platform : undefined,
				day: availability.at.moment === 'journée' ? availability.platform : undefined,
			});
		}
	});
	return formattedAvailabilities.sort((a, b) => a.date.diff(b.date));
};

const Calendar = ({ availabilities, numbersOfDays, updateAvailabilities }: Props) => {
	const pastDate =
		numbersOfDays - availabilities.length / 2 > -1 ? numbersOfDays - availabilities.length / 2 : 0;
	let weekIsOdd = false;
	const formattedAvailabilities = getFormatedAvailabilities(availabilities);
	if (availabilities.length === 0)
		return (
			<p className="bg-brown text-2xl text-center px-2">
				Chargement (si cela persiste changer de mois ou recharger la page)
			</p>
		);

	const updateAvailability = (
		newPlatform: Platform,
		day: dayjs.Dayjs,
		moment: 'day' | 'evenning'
	) => {
		const formattedMoment = moment === 'day' ? 'journée' : 'soirée';
		const availabilityChange = availabilities.find(
			(availability) =>
				dayjs(availability.at.date).isSame(day, 'day') && availability.at.moment === formattedMoment
		);
		if (availabilityChange) availabilityChange.platform = newPlatform;
		updateAvailabilities(availabilities);
	};

	const getFrenchDayNb = (dayNb: number) => {
		if (dayNb === 0) return 6;
		return dayNb - 1;
	};

	return (
		<>
			<div className="grid grid-cols-7 w-full h-12 items-center bg-brown text-white">
				{days.map((day, index) => {
					if (index)
						return (
							<div
								className="text-center text-none lg:text-2xl first-letter:text-2xl"
								key={`day${index}`}
							>
								{day}
							</div>
						);
				})}
				<div className="text-center text-none lg:text-2xl first-letter:text-2xl">{days[0]}</div>
			</div>
			<div className="bg-white grid w-full grid-cols-7 gap-x-1">
				{[
					...Array(getFrenchDayNb(formattedAvailabilities[0].date.subtract(pastDate, 'day').day())),
				].map((_, index) => {
					return (
						<DayCard oddWeek={weekIsOdd} key={`pastDate${index}`} onChange={updateAvailability} />
					);
				})}
				{[...Array(pastDate)].map((_, index) => {
					const day = formattedAvailabilities[0].date.subtract(pastDate - index, 'day');
					if (getFrenchDayNb(day.day()) === 0 && index) weekIsOdd = !weekIsOdd;
					return (
						<DayCard
							oddWeek={weekIsOdd}
							key={`pastDate${index}`}
							day={day}
							onChange={updateAvailability}
						/>
					);
				})}
				{formattedAvailabilities.map((availability, index) => {
					const day = dayjs(availability.date);
					if (getFrenchDayNb(dayjs(day).day()) === 0) weekIsOdd = !weekIsOdd;
					return (
						<DayCard
							onChange={updateAvailability}
							oddWeek={weekIsOdd}
							key={`dayCard${index}`}
							day={day}
							dayAvailability={availability.day}
							eveningAvailability={availability.evenning}
						/>
					);
				})}
				{[
					...Array(
						6 -
							getFrenchDayNb(formattedAvailabilities[formattedAvailabilities.length - 1].date.day())
					),
				].map((_, index) => {
					return (
						<DayCard onChange={updateAvailability} oddWeek={weekIsOdd} key={`postDate${index}`} />
					);
				})}
			</div>
		</>
	);
};

export default Calendar;
