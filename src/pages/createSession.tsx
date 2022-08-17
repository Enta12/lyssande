import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../AppRoute';
import {ShortSelect} from '../components';
import PjSessionSelector from '../components/pjSessionSelector';
import PrimaryButton from '../components/primary-button';
import {User, PjType, Availability, Platform} from '../types';
import api from '../api/axios';
import {days, mounths} from '../moockedData';

type AvailabilitySend = {
  user: string,
  at: {
    date: number,
    moment: 'soirée' | 'journée',
  },
  platform: Platform,
}

const MOMENT: Array<'journée' | 'soirée'> = ['journée', 'soirée'];

type AvailabilityPerUser = Availability & {
  user: string,
}
const CreateSession = () => {
  const {setUser, user} = useContext(AuthContext);
  const [selectedPjs, setSelectedPjs] = useState<string[]>([]);
  const [lastQuest, setLastQuest] = useState(-1);
  const [selectedDate, setSelectedDate] = useState<number | undefined>(0);
  const [players, setPlayers] = useState<User[]>([]);
  const [characters, setCharacters] = useState<PjType[]>([]);
  const [gmDates, setGmDates] = useState<Date[]>([]);
  const [gmMoments, setGmMoments] = useState<('soirée' | 'journée')[]>([]);
  const [availabilities, setAvailabilities] =
      useState<AvailabilityPerUser[]>([]);
  const [moment, setMoment] = useState<('soirée' | 'journée')[]>(
      ['soirée', 'journée'],
  );
  useEffect(() => {
    const fetchData = async () =>{
      const userRes = await api(setUser).get('/users');
      const charactersRes = await api(setUser).get('/characters');
      const availabilitiesRes = await api(setUser).get('/availabilities');
      setPlayers(userRes.data);
      setCharacters(charactersRes.data);
      setAvailabilities(availabilitiesRes.data.filter(
          (el: AvailabilityPerUser) => el.platform !== 'none').map(
          (el: AvailabilitySend) => ({
            user: el.user,
            at: {
              date: new Date(+el.at.date),
              moment: el.at.moment,
            },
            platform: el.platform,
          })));
    };
    fetchData();
  }, []);
  useEffect(() => {
    const defineGmDate = () => {
      return availabilities.filter((el) => {
        if (el.user === user?.userId) return true;
        return false;
      }).map((el) => el.at.date);
    };
    const defineGmMoment = () => {
      return MOMENT.filter((moment) => availabilities.findIndex((el) => (
        selectedDate !== undefined &&
        el.at.date.getTime() === gmDates[selectedDate].getTime() &&
        el.user === user?.userId &&
        el.at.moment === moment
      )) !== -1);
    };
    const availabilitiesTemp = defineGmDate();
    if (availabilitiesTemp.length === 0) setSelectedDate(undefined);
    else if (!selectedDate) setSelectedDate(0);
    setGmDates(availabilitiesTemp.filter(
        (el, index) => availabilitiesTemp.findIndex(
            (findEl) => findEl.getTime() === el.getTime()) == index));
    const currentMoment = defineGmMoment();
    setGmMoments(currentMoment);
    setMoment(currentMoment);
  }, [availabilities, selectedDate]);

  const getById = (id: string) => {
    return characters?.filter((el) => el.id === id)[0];
  };

  const setSelectedPj = (playerIndex: number, pjID: string ) => {
    const selectedPjsTemp = [...selectedPjs];
    selectedPjsTemp[playerIndex] = pjID;
    setSelectedPjs(selectedPjsTemp);
    const newSelectedCharacter = getById(pjID);
    setLastQuest(selectedPjs.some(
        (element) => {
          const currentCharacter = getById(element);
          return (
            newSelectedCharacter.quest !== currentCharacter.quest &&
             newSelectedCharacter.quest !== undefined &&
            currentCharacter.quest !== undefined
          );
        }) ?
          -1 :
          (newSelectedCharacter.quest || lastQuest ));
  };
  const handleDateChange = (value : number) => {
    if (value !== selectedDate) setSelectedDate(value);
  };
  const handleMomentChange = (value : number) => {
    const momentTemp = [...moment];
    if (momentTemp.includes(gmMoments[value])) {
      if (moment.length> 1) {
        setMoment(gmMoments.filter(
            (el, index) => moment.includes(el) && index !== value));
      }
    } else {
      momentTemp.push(gmMoments[value]);
      setMoment(momentTemp);
    };
  };
  return (
    <div className="w-full flex items-center flex-col gap-3">
      <span className='
        w-full
        flex
        font-bubblegum
        text-brown
        items-center
        gap-2
        text-lg
      '>
        Selectionner la date
        <ShortSelect
          textEmpty='Aucune date'
          width='40'
          showValue
          options={gmDates.map((el) => `${days[el.getDay()]}
          ${el.getDate()} ${mounths[el.getMonth()]}`)}
          handleChange={handleDateChange}
          value={
            gmDates.length && selectedDate!== undefined ?
            [selectedDate] : []
          }
        />
        dans la
        <ShortSelect
          width='40'
          showValue
          options={gmMoments}
          handleChange={handleMomentChange}
          value={moment.map((el) => gmMoments.indexOf(el))}
        />
      </span>
      {players.map((player, index) => {
        return (
          <PjSessionSelector
            quest={lastQuest}
            selectedPj={selectedPjs[index]}
            setSelectedPj={setSelectedPj}
            playerIndex={index}
            key={index}
            pjs={characters.filter((pj) => pj.player === player.id)}
            playerName={player.name} />
        );
      })}
      <PrimaryButton text={'Create Session'} />
    </div>
  );
};

export default CreateSession;
