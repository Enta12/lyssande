import HeaderCase from './headerCase';
import Checkbox from './checkbox';
import {Availability, Platform} from '../../types';
import React from 'react';
import Title from '../title';
import availabilityNone from '../../assets/availabilityNone.svg';
import availabilityIrl from '../../assets/availabilityIrl.svg';
import availabilityIrlOrIl from '../../assets/availabilityIrlOrIl.svg';
import availabilityIl from '../../assets/availabilityIl.svg';
import avalabilityIG from '../../assets/availabilityIG.svg';
import avalabilityRest from '../../assets/availabilityRest.svg';
import {days, months} from '../../moockedData';


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
          <img src={availabilityIl} alt="en ligne"/> Disponible en ligne
        </div>
        <div className='flex gap-3 items-center'>
          <img src={availabilityIrlOrIl} alt="en ligne ou en vraie"/>
          Disponible en ligne ou en vraie
        </div>
        <div className='flex gap-3 items-center'>
          <img src={availabilityIrl} alt="en vraie"/>
          Disponible en vraie
        </div>
        <div className='flex gap-3 items-center'>
          <img src={availabilityNone} alt="pas dispo"/>
          Pas Disponible
        </div>
        <div className='flex gap-3 items-center'>
          <img src={avalabilityRest} alt="en repo"/>
          A une partie ce jour
        </div><div className='flex gap-3 items-center'>
          <img src={avalabilityIG} alt="pas dispo"/>
          A une partie à ce moment
        </div>
      </div>
    </>
  );
};

export default Calendar;
