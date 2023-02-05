import dayjs from 'dayjs';
import React from 'react';
import cn from 'classnames';
import { Platform } from 'types';
import Checkbox from './Checkbox';

type Props = {
	day?: dayjs.Dayjs;
	oddWeek: boolean;
	eveningAvailability?: Platform;
	dayAvailability?: Platform;
	onChange: (newPlatform: Platform, day: dayjs.Dayjs, moment: 'day' | 'evenning') => void;
};

const DayCard = ({
	day,
	oddWeek,
	eveningAvailability,
	dayAvailability,
	onChange: handleChange,
}: Props) => {
	const date = dayjs(new Date());

	return (
		<div
			className={cn('flex flex-col text-xl items-center py-3', {
				'bg-lightBrown': !oddWeek,
				'bg-brown': oddWeek,
				grayscale: !eveningAvailability || !dayAvailability,
			})}
		>
			{day && (
				<>
					{day.date()}
					<Checkbox
						checkboxState={dayAvailability || 'none'}
						moment="day"
						onChange={(newPlatform: Platform) => {
							handleChange(newPlatform, day, 'day');
						}}
					/>

					<Checkbox
						checkboxState={eveningAvailability || 'none'}
						moment="evenning"
						onChange={(newPlatform: Platform) => {
							handleChange(newPlatform, day, 'evenning');
						}}
					/>
				</>
			)}
		</div>
	);
};

export default DayCard;
