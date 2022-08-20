/* eslint-disable no-unused-vars */
import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../AppRoute';
import {ShortSelect} from '../../components';
import PjSessionSelector from '../../components/pjSessionSelector';
import PrimaryButton from '../../components/primary-button';
import {User, PjType, Availability, Platform} from '../../types';
import api from '../../api/axios';
import {days, months} from '../../moockedData';
import availabilityIrl from '../../assets/availabilityIrl.svg';
import availabilityIl from '../../assets/availabilityIl.svg';
import {toast} from 'react-toastify';

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
  const [lastQuest, setLastQuest] = useState('');
  const [selectedDate, setSelectedDate] = useState<number | undefined>(0);
  const [players, setPlayers] = useState<User[]>([]);
  const [characters, setCharacters] = useState<PjType[]>([]);
  const [gmDates, setGmDates] = useState<Date[]>([]);
  const [gmMoments, setGmMoments] = useState<('soirée' | 'journée')[]>([]);
  const [availabilities, setAvailabilities] =
      useState<AvailabilityPerUser[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<number>(0);
  const [gmPlatform, setGmPlatform] = useState<string[]>([]);
  const [selectedMoment, setSelectedMoment] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () =>{
      const userRes = await api(setUser).get('/users');
      const charactersRes = await api(setUser).get('/characters');
      const availabilitiesRes = await api(setUser).get('/availabilities');
      setPlayers(userRes.data);
      setCharacters(charactersRes.data);
      setAvailabilities(availabilitiesRes.data.filter(
          (el: AvailabilityPerUser) => el.platform !== 'none' &&
                                       el.platform !== 'rest' &&
                                       el.platform !== 'in-game').map(
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
    else if (selectedDate === undefined) setSelectedDate(0);
    setGmDates(availabilitiesTemp.filter(
        (el, index) => availabilitiesTemp.findIndex(
            (findEl) => findEl.getTime() === el.getTime()) == index));
    const momentAvailableOfDate = defineGmMoment();
    setGmMoments(momentAvailableOfDate);
    if (selectedMoment === momentAvailableOfDate.length) setSelectedMoment(0);
    setGmMoments(momentAvailableOfDate);
    const definePlatform = () => {
      const availabilityOfGmIndex = availabilities.findIndex((el) => {
        return (
          user?.userId === el.user &&
          selectedDate !== undefined &&
          el.at.date.getTime() === gmDates[selectedDate].getTime() &&
          el.at.moment === momentAvailableOfDate[selectedMoment]
        );
      });
      if (availabilityOfGmIndex === -1) return [];
      else if (
        availabilities[availabilityOfGmIndex].platform ==='irl-or-online'
      ) {
        return ['just-irl', 'online'];
      }
      if (availabilities[availabilityOfGmIndex].platform === 'just-irl') {
        return ['just-irl'];
      }
      return ['online'];
    };
    const platFormAvailable = definePlatform();
    setGmPlatform(platFormAvailable);
    if (platFormAvailable.length < 2) setSelectedPlatform(0);
  }, [availabilities, selectedDate, selectedMoment]);

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
          '' :
          (newSelectedCharacter.quest || lastQuest ));
  };
  const handlePlatformChange = (value: number) => {
    if (value !== selectedPlatform) setSelectedPlatform(value);
  };
  const handleDateChange = (value : number) => {
    if (value !== selectedDate) setSelectedDate(value);
  };
  const handleMomentChange = (value : number) => {
    setSelectedMoment(value);
  };
  const submit = async () => {
    if (selectedDate === undefined) {
      toast.error('Pas de dates selectionnés');
      return;
    }
    if (!selectedPjs.some((el) => !!el)) {
      toast.error('Veuillez selectionner au moins un personnage');
      return;
    }
    const res = await api(setUser).post('/sessions', {
      date: `${gmDates[selectedDate].getTime()}`,
      moment: gmMoments[selectedMoment],
      platform: gmPlatform[selectedPlatform],
      characters: selectedPjs.filter((el) => !!el),
    });
    if (res.status === 201) {
      toast.success('La partie à été créer avec succés');
      navigate('/map');
    } else toast.error(res.data.err);
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
        La partie aura lieu le
        <ShortSelect
          textEmpty='Aucune date'
          width='40'
          showValue
          options={gmDates.map((el) => `${days[el.getDay()]}
          ${el.getDate()} ${months[el.getMonth()]}`)}
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
          value={[selectedMoment]}
        />
      </span>
      <span className='
        w-full
        flex
        font-bubblegum
        text-brown
        items-center
        gap-2
        text-lg
        min-h-[51px]
      '>
        Platforme :
        {
          gmPlatform.length > 1 &&
          <ShortSelect
            width='40'
            showValue
            options={gmPlatform.map(
                (el) => el === 'just-irl' ? 'En vraie' : 'En ligne')}
            handleChange={handlePlatformChange}
            value={[selectedPlatform]}
          />
        }
        {
          gmPlatform[selectedPlatform] == 'online' &&
          <div className='flex gap-3 items-center'>
            <img src={availabilityIl} alt="en ligne"/>
          </div>
        }
        {
          gmPlatform[selectedPlatform] == 'just-irl' &&
          <div className='flex gap-3 items-center'>
            <img src={availabilityIrl} alt="en vraie"/>
          </div>
        }
      </span>
      {players.map((player, index) => {
        const playerAvailability = availabilities.findIndex((el) => (
          el.user === player.id &&
          (
            el.platform === gmPlatform[selectedPlatform] ||
            gmPlatform.length === 2
          ) &&
          selectedDate !== undefined &&
          el.at.date.getTime() === gmDates[selectedDate].getTime() &&
          el.at.moment === gmMoments[selectedMoment]
        ));
        // TODO suppress verification player is me ?
        if (
          playerAvailability !== -1 &&
          player.id !== user?.userId
        ) {
          return (
            <PjSessionSelector
              disable={
                availabilities[playerAvailability].platform !==
                gmPlatform[selectedPlatform] &&
                availabilities[playerAvailability].platform !== 'irl-or-online'
              }
              platform={availabilities[playerAvailability].platform}
              quest={lastQuest}
              selectedPj={selectedPjs[index]}
              setSelectedPj={setSelectedPj}
              playerIndex={index}
              key={index}
              pjs={characters.filter((pj) => pj.player === player.id)}
              playerName={player.name}
            />
          );
        }
      })}
      <PrimaryButton
        text={'Créer une partie'}
        onClick={submit}
      />
    </div>
  );
};

export default CreateSession;
