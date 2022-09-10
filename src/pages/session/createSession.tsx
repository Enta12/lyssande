/* eslint-disable no-unused-vars */
import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ShortSelect} from '../../components';
import PjSessionSelector from '../../components/pjSessionSelector';
import PrimaryButton from '../../components/primary-button';
import {PjType, Availability, Platform, UserInfo} from '../../types';
import {days, months} from '../../moockedData';
import availabilityIrl from '../../assets/availabilityIrl.svg';
import availabilityIl from '../../assets/availabilityIl.svg';
import {toast} from 'react-toastify';
import {useAuth, useApi} from '../../hook';
import {platform} from 'os';

type AvailabilitySend = {
  user: string,
  at: {
    date: number,
    moment: 'soirée' | 'journée',
  },
  platform: Platform,
}

type PossibleDate = {
  date: number;
  'journée' : {
    online: string[],
    'just-irl': string[],
  },
  'soirée' : {
    online: string[],
    'just-irl': string[],
  }
}

const MOMENT: Array<'journée' | 'soirée'> = ['journée', 'soirée'];

type AvailabilityPerUser = Availability & {
  user: string,
}
const CreateSession = () => {
  const [selectedPjs, setSelectedPjs] = useState<string[]>([]);
  const [lastQuest, setLastQuest] = useState('');
  const [selectedDate, setSelectedDate] = useState<number | undefined>(0);
  const [players, setPlayers] = useState<UserInfo[]>([]);
  const [characters, setCharacters] = useState<PjType[]>([]);
  const [gmDates, setGmDates] = useState<Date[]>([]);
  const [gmMoments, setGmMoments] = useState<('soirée' | 'journée')[]>([]);
  const [availabilitiesSorted, setAvailabilitiesSorted] =
      useState<PossibleDate[]>([]);
  const [availabilities, setAvailabilities] =
      useState<AvailabilityPerUser[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<number>(0);
  const [gmPlatform, setGmPlatform] = useState<string[]>([]);
  const [selectedMoment, setSelectedMoment] = useState(0);
  const navigate = useNavigate();
  const api = useApi();
  const auth = useAuth();

  useEffect(() => {
    try {
      const removeUselessAvailability = (playersOfAvailability: string[]) => {
        playersOfAvailability
            .filter((player) => player !== auth?.user.info?.id);
        return playersOfAvailability.length > 1 ?
            playersOfAvailability : [];
      };
      const fetchData = async () =>{
        const userRes = await api.get('/users');
        const charactersRes = await api.get('/characters');
        const availabilitiesRes = await api.get('/availabilities');
        setPlayers(userRes.data);
        setCharacters(charactersRes.data);
        // tentative
        const possibleDateTemp: PossibleDate[] = [];
        availabilitiesRes.data.forEach((availabilityRes : AvailabilitySend) => {
          let index = possibleDateTemp.findIndex(
              (possibleDate) =>
                possibleDate.date === availabilityRes.at.date);
          if (
            availabilityRes.platform !== 'none' &&
            availabilityRes.platform !== 'rest' &&
            availabilityRes.platform !== 'in-game'
          ) {
            if (index === -1) {
              possibleDateTemp.push({
                'date': availabilityRes.at.date,
                'journée': {
                  'online': [],
                  'just-irl': [],
                },
                'soirée': {
                  'online': [],
                  'just-irl': [],
                },
              });
              index = possibleDateTemp.length -1;
            }
            if (availabilityRes.platform === 'irl-or-online') {
              // eslint-disable-next-line max-len
              possibleDateTemp[index][availabilityRes.at.moment]['just-irl'].push(availabilityRes.user);
            } else {
              // eslint-disable-next-line max-len
              possibleDateTemp[index][availabilityRes.at.moment][availabilityRes.platform].push(availabilityRes.user);
            }
          }
        });
        possibleDateTemp.map((possibleDate) => ({
          'journée': {
            'online': removeUselessAvailability(
                possibleDate['journée'].online),
            'just-irl': removeUselessAvailability(
                possibleDate['journée']['just-irl']),
          },
          'soirée': {
            'online': removeUselessAvailability(
                possibleDate['soirée'].online),
            'just-irl': removeUselessAvailability(
                possibleDate['soirée']['just-irl']),
          },
        }));
        possibleDateTemp.filter((possibleDate) =>
          possibleDate['journée']['just-irl'].length ||
          possibleDate['journée'].online.length ||
          possibleDate['soirée']['just-irl'].length ||
          possibleDate['soirée'].online.length,
        );
        // end tentative
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
    } catch (error) {
      toast.error('Erreur lors de la récupération des données');
    }
  }, []);

  useEffect(() => {
    const defineGmDate = () => {
      return availabilities.filter((availabilityA)=>{
        return availabilities.findIndex((availabilityB) =>
          availabilityA.user !== availabilityB.user &&
          availabilityA.at.date.getTime() === availabilityB.at.date.getTime() &&
          availabilityA.at.moment === availabilityB.at.moment &&
          (
            availabilityA.platform === 'irl-or-online' ||
            availabilityB.platform === 'irl-or-online' ||
            availabilityA.platform === availabilityB.platform
          )) !== -1;
      }).filter((el) => {
        if (el.user === auth?.user?.info?.id) return true;
        return false;
      }).map((el) => el.at.date);
    };
    const defineGmMoment = () => {
      return MOMENT.filter((moment) => availabilities.findIndex((el) => (
        selectedDate !== undefined &&
        el.at.date.getTime() === gmDates[selectedDate].getTime() &&
        el.user === auth?.user?.info?.id &&
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
          auth?.user?.info?.id === el.user &&
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
    try {
      await api.post('/sessions', {
        date: `${gmDates[selectedDate].getTime()}`,
        moment: gmMoments[selectedMoment],
        platform: gmPlatform[selectedPlatform],
        characters: selectedPjs.filter((el) => !!el),
      });
      toast.success('La partie à été créer avec succès');
      navigate('/map');
    } catch (error) {
      toast.error('Impossible de créer la partie');
    }
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
            <img src={availabilityIrl} alt="IRL"/>
          </div>
        }
      </span>
      {players.map((player, index) => {
        const playerAvailability = availabilities.findIndex((el) => (
          el.user === player.id &&
          (
            el.platform === 'irl-or-online' ||
            el.platform === gmPlatform[selectedPlatform]
          ) &&
          selectedDate !== undefined &&
          el.at.date.getTime() === gmDates[selectedDate].getTime() &&
          el.at.moment === gmMoments[selectedMoment]
        ));
        // TODO suppress verification player is me ?
        if (
          playerAvailability !== -1 &&
          player.id !== auth?.user?.info?.id
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
