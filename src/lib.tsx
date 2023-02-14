import dayjs from 'dayjs';
import { Availability, FormattedAvailabilities } from 'types';

export const getFormatedAvailabilities = (availabilities: Availability[]) => {
	const formattedAvailabilities: FormattedAvailabilities[] = [];
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
				user: availability.user,
				evenning: availability.at.moment === 'soirée' ? availability.platform : undefined,
				day: availability.at.moment === 'journée' ? availability.platform : undefined,
			});
		}
	});
	return formattedAvailabilities.sort((a, b) => a.date.diff(b.date));
};
