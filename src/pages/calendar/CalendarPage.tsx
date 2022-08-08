import Title from '../../components/title';
import Calendar from '../../components/calendar/calendar';
import PrimaryButton from '../../components/primary-button';
import React, {useCallback, useEffect, useState} from 'react';
import {Availability, Platform} from '../../types';

const oneDay = 86400000;
const oneMounth = oneDay * 31;
const today = new Date();


const CalendarPage = () => {
  const setDates = useCallback((startDate: Date, endDate: Date) => {
    const availabilities : Availability[] = [];
    let currentDate = startDate;
    while (currentDate < endDate) {
      availabilities.push({
        platform: currentDate.getDay() === 0 ||
          currentDate.getDay() === 6 ? 'irl-or-online' : 'none',
        at: {
          date: currentDate,
          moment: 'journée',
        },
      });
      availabilities.push({
        platform: currentDate.getDay() === 0 ||
          currentDate.getDay() === 6 ? 'irl-or-online' : 'none',
        at: {
          date: currentDate,
          moment: 'journée',
        },
      });
      currentDate = new Date(currentDate.getTime() + oneDay);
    }
    return availabilities;
  }, []);
  const [availabilities, setAvailabilities] =
      useState<Availability[]>(
          setDates(today, new Date(today.getTime() + oneMounth)));
  const [endDate, setEndDate] = useState<string | undefined>();

  const handleChange = (newPlatForm: Platform, index: number) => {
    const availabilitiesTemp = [...availabilities];
    availabilitiesTemp[index].platform = newPlatForm;
    setAvailabilities(availabilitiesTemp);
  };
  useEffect(() => {
    if (endDate) {
      const availabilitiesTemp = availabilities.filter((el) =>
        new Date(el.at.date) < new Date(endDate));
      setAvailabilities(
          [
            ...availabilitiesTemp,
            ...setDates(
              availabilitiesTemp.length - 1 > 0 ?
                new Date(availabilitiesTemp[availabilitiesTemp.length - 1].
                    at.date.getTime()) : today,
              new Date(endDate)),
          ]);
    }
  }, [endDate, setAvailabilities, setDates]);
  return (
    <div className='pt-8 w-full'>
      <Title title="MES DISPONIBILITE POUR LE PROCHAIN MOIS"/>
      <div className='my-4 text-swamp font-bubblegum text-xl'>
        {'Affiché jusqu\'au : '}
        <input
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
          className='
          bg-lightBrown
          text-white
          p-2
          border-4
          border-white
          rounded-2xl
          w-44'
          type="date"
        />
      </div>
      <form>
        <Calendar
          setAvailability={handleChange}
          availabilities={availabilities}
        />
      </form>
      <div className='m-8 mb-32 flex justify-center'>
        <PrimaryButton text={'Envoyer'} />
      </div>

    </div>
  );
};


export default CalendarPage;
