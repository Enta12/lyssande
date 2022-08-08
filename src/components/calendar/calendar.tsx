import HeaderCase from './headerCase';
import Checkbox from './checkbox';
import {Availability, Platform} from '../../types';
import React from 'react';
import Title from '../title';
import {ReactComponent as AvalabilityNone} from
  '../../assets/availabilityNone.svg';
import {ReactComponent as AvalabilityIrl} from
  '../../assets/availabilityIrl.svg';
import {ReactComponent as AvalabilityIrlOrIl} from
  '../../assets/availabilityIrlOrIl.svg';
import {ReactComponent as AvalabilityIl} from
  '../../assets/availabilityIl.svg';

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
  availabilities: Availability[];
  setAvailability: (platform: Platform, index: number) => void;
};

const Calendar = ({availabilities, setAvailability}: Props) => {
  return (
    <>
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
              {availabilities.map((currentDate, index) => {
                const day = currentDate.at.date.getDay();
                const month = currentDate.at.date.getMonth();
                return (
                  <HeaderCase
                    key={`HeaderCase${index}`}
                    firstLine={`${days[day || 0]} ${
                        day ? currentDate.at.date.getDate() : ''
                    } ${month ? mounths[month] : ''} `}
                    secondLine={`en ${currentDate.at.moment}`}
                  />
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
              {availabilities.map((availability, index) => {
                return (
                  <Checkbox
                    onChange={
                      (newPlatform) => setAvailability(newPlatform, index)
                    }
                    key={`Checkbox${index}`}
                    checkboxState={availability.platform}
                  />
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <div className='absolute flex flex-col gap-1'>
        <Title subtitle title="Légende" />
        <div className='flex gap-3 items-center'>
          <AvalabilityIl /> Disponible en ligne
        </div>
        <div className='flex gap-3 items-center'><AvalabilityIrlOrIl />
          Disponible en ligne ou en vraie
        </div>
        <div className='flex gap-3 items-center'>
          <AvalabilityIrl /> Disponible en vraie
        </div>
        <div className='flex gap-3 items-center'>
          <AvalabilityNone /> Pas Disponible
        </div>
      </div>
    </>
  );
};

export default Calendar;
