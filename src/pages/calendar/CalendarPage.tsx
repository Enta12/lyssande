import Title from '../../components/title';
import Calendar from '../../components/calendar/calendar';
import PrimaryButton from '../../components/primary-button';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Availability, Platform} from '../../types';
import api from '../../api/axios';
import {AuthContext} from '../../AppRoute';

type AvailabilitySave = {
  platform: Platform;
  at: {
    date: number;
    moment: 'journée' | 'soirée',
  }
}

const oneDay = 86400000;
const oneMounth = oneDay * 31;
const today = new Date();


const CalendarPage = () => {
  const [availabilitiesSave, setAvailabilitiesSave] =
      useState<Availability[]>([]);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [endDate, setEndDate] = useState<string>(
      `${today.getTime() + oneMounth}`,
  );
  const initOrUpdateAvalabilitiess = useCallback((startDate: Date) => {
    const pattern = /^[0-9]+$/;
    const dateEnd = new Date(pattern.test(endDate)? +endDate : endDate);
    const availabilities : Availability[] = [];
    let currentDate = startDate;
    while (currentDate < dateEnd) {
      availabilities.push(setInitialAvailability(currentDate, 'journée'));
      availabilities.push(setInitialAvailability(currentDate, 'soirée'));
      currentDate = new Date(currentDate.getTime() + oneDay);
    }
    return availabilities;
  }, [availabilitiesSave, endDate]);
  const {setUser} = useContext(AuthContext);
  const setInitialAvailability = (
      newDate: Date,
      newMoment: 'journée' | 'soirée',
  ) => {
    const date = new Date(newDate).setHours(0, 0, 0, 0);
    const index = availabilitiesSave.findIndex((el) => {
      const currentDate = el.at.date.getTime();
      return (
        date === currentDate &&
        newMoment === el.at.moment
      );
    });
    if (index !== -1) {
      return availabilitiesSave[index];
    }
    const availabilitySet: Availability = {
      platform: newDate.getDay() === 6 ? 'irl-or-online' : 'none',
      at: {
        date: newDate,
        moment: newMoment,
      },
    };
    return availabilitySet;
  };
  useEffect(() => {
    const fetchData = async () =>{
      const res = await api(setUser).get('/characters/availabilities');
      setAvailabilitiesSave(res.data.map((el: AvailabilitySave) => ({
        platform: el.platform,
        at: {
          date: new Date(+el.at.date),
          moment: el.at.moment,
        },
      })));
    };
    fetchData();
  }, [setAvailabilitiesSave]);
  useEffect(() => {
    const availabilitiesTemp = availabilities.filter((el) =>
      new Date(el.at.date) < new Date(endDate));
    if (availabilitiesSave.length) {
      setAvailabilities(
          [
            ...availabilitiesTemp,
            ...initOrUpdateAvalabilitiess(
              availabilitiesTemp.length - 1 > 0 ?
                new Date(availabilitiesTemp[availabilitiesTemp.length - 1].
                    at.date.getTime()) : today,
            ),
          ]);
    }
  }, [endDate, setAvailabilities, initOrUpdateAvalabilitiess]);

  const onSubmit = () => {
    api(setUser).put('/availabilities', availabilities);
  };
  const handleChange = (newPlatForm: Platform, index: number) => {
    const availabilitiesTemp = [...availabilities];
    availabilitiesTemp[index].platform = newPlatForm;
    setAvailabilities(availabilitiesTemp);
  };
  return (
    <div className='pt-8 w-full'>
      <Title title="MES DISPONIBILITE POUR LE PROCHAIN MOIS"/>
      <div className='my-4 text-swamp font-bubblegum text-xl'>
        {'Affiché jusqu\'au : '}
        <input
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
          className='
            outline-none
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
        <PrimaryButton text={'Envoyer'} onClick={onSubmit} />
      </div>

    </div>
  );
};


export default CalendarPage;
