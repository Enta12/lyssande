import HeaderCase from './headerCase';
import Checkbox from './checkbox';
import {PossibleDate} from '../../types';
import React from 'react';

type Availability = 'no' | 'yes' | 'maybe';

const mounths = [
  'jan.',
  'fev.',
  'mars',
  'avr.',
  'mai',
  'juin',
  'juil.',
  'aout',
  'sept.',
  'oct.',
  'nov.',
];
const days = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];

type Props = {
  dates: PossibleDate[];
  availability: Availability[];
};

const Calendar = ({dates, availability}: Props) => {
  return (
    <div
      className='
        py-2
        rounded-xl
        bg-lightBrown
        font-bubblegum
        text-white
        overflow-x-auto
        scrollbar-thin
        w-full'
    >
      <table>
        <thead>
          <tr className='flex p-4'>
            {<HeaderCase firstLine='DATES' />}
            {dates.map((currentDate, index) => {
              const day = currentDate.date?.getDay();
              return (
                <React.Fragment key={`HeaderCase${index}`}>
                  <HeaderCase
                    firstLine={`${days[day || currentDate.day || 0]} ${
                      day ? currentDate.date?.getDate() : ''
                    } ${day ? mounths[day] : ''} `}
                    secondLine={`en ${currentDate.moment}`}
                  />
                </React.Fragment>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr className='mb-4 flex p-4 bg-brown'>
            <td className='w-40 flex flex-col justify-center items-center'>
              {' '}
              MES DISPO :
            </td>
            {availability.map((dayAvailability, index) => {
              return (
                <React.Fragment key={`Checkbox${index}`}>
                  <Checkbox
                    isEditable={true}
                    checkboxState={dayAvailability}
                  />
                </React.Fragment>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
