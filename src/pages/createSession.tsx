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
  const [gmDates, setGmDates] = useState<string[]>([]);
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
    const availabilitiesTemp = availabilities.filter((el) => {
      if (!moment.includes(el.at.moment)) return false;
      if (el.user === user?.userId) return true;
      return false;
    }).map((el) => `${days[el.at.date.getDay()]}
    ${el.at.date.getDate()} ${mounths[el.at.date.getMonth()]}`);
    if (availabilitiesTemp.length === 0) setSelectedDate(undefined);
    else if (!selectedDate) setSelectedDate(0);
    setGmDates(availabilitiesTemp.filter(
        (el, index) => availabilitiesTemp.indexOf(el) == index));
  }, [moment, availabilities, selectedDate]);
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
    setSelectedDate(value);
  };
  const handleMomentChange = (value : number) => {
    const momentTemp = [...moment];
    if (momentTemp.includes(MOMENT[value])) {
      setMoment(MOMENT.filter(
          (el, index) => moment.includes(el) && index !== value));
    } else {
      momentTemp.push(MOMENT[value]);
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
        gap-5
        text-lg
      '>
        Selectionner la date
        <ShortSelect
          textEmpty='Aucune date'
          width='40'
          showValue
          options={gmDates}
          handleChange={handleDateChange}
          value={
            gmDates.length && selectedDate!== undefined ?
            [selectedDate] : []
          }
        />
        dans la
        <ShortSelect
          textEmpty='JAMAIS !'
          width='40'
          showValue
          options={MOMENT}
          handleChange={handleMomentChange}
          value={moment.map((el) => MOMENT.indexOf(el))}
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
