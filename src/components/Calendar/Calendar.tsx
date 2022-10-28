import HeaderCase from './HeaderCase';
import Checkbox from './Checkbox';
import { Availability, Platform } from 'types';
import React from 'react';
import { Title } from 'components';
import availabilityNone from 'assets/icon/availabilityNone.svg';
import availabilityIrl from 'assets/icon/availabilityIrl.svg';
import availabilityIrlOrIl from 'assets/icon/availabilityIrlOrIl.svg';
import availabilityIl from 'assets/icon/availabilityIl.svg';
import avalabilityIG from 'assets/icon/availabilityIG.svg';
import avalabilityRest from 'assets/icon/availabilityRest.svg';
import { days, months } from 'moockedData';

type Props = {
	availabilities: Availability[];
	onAvailabilityChange: (platform: Platform, index: number) => void;
};

const Calendar = ({ availabilities, onAvailabilityChange: handleAvailabilityChange }: Props) => {
	return (
		<>
			<div
				className="
          py-2
          rounded-xl
          bg-lightBrown
          font-bubblegum
          text-white
          overflow-x-auto
          scrollbar-thin
          w-full"
			>
				<table>
					<thead>
						<tr className="flex p-4">
							{<HeaderCase firstLine="DATES" />}
							{availabilities.map((currentDate, index) => {
								const day = currentDate.at.date.getDay();
								const month = currentDate.at.date.getMonth();
								return (
									<HeaderCase
										key={`HeaderCase${index}`}
										firstLine={`${days[day || 0]}
                    ${currentDate.at.date.getDate()}
                    ${month ? months[month] : ''} `}
										secondLine={`en ${currentDate.at.moment}`}
									/>
								);
							})}
						</tr>
					</thead>
					<tbody>
						<tr className="mb-4 flex p-4 bg-brown">
							<td className="w-40 flex flex-col justify-center items-center"> MES DISPO :</td>
							{availabilities.map((availability, index) => {
								return (
									<Checkbox
										onChange={(newPlatform) => handleAvailabilityChange(newPlatform, index)}
										key={`Checkbox${index}`}
										checkboxState={availability.platform}
									/>
								);
							})}
						</tr>
					</tbody>
				</table>
			</div>
			<div className="absolute flex flex-col gap-1">
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
					<img src={avalabilityRest} alt="en repos" />A une partie ce jour
				</div>
				<div className="flex gap-3 items-center">
					<img src={avalabilityIG} alt="en jeu" />A une partie à ce moment
				</div>
			</div>
		</>
	);
};

export default Calendar;
