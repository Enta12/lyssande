/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ShortSelect} from '../../components';
import PjSessionSelector from '../../components/pjSessionSelector';
import PrimaryButton from '../../components/primary-button';
import {PjType, Platform, UserInfo} from '../../types';
import {days, months} from '../../moockedData';
import {toast} from 'react-toastify';
import {useAuth, useApi} from '../../hook';

type AvailabilitySend = {
  user: string,
  at: {
    date: number,
    moment: 'soirée' | 'journée',
  },
  platform: Platform,
}

type PossiblePlatform = {
  online?: string[],
  'just-irl'?: string[],
};

type PossibleDate = {
  date: number;
  'journée'?: PossiblePlatform,
  'soirée'?: PossiblePlatform
}

const MOMENT: Array<'journée' | 'soirée'> = ['journée', 'soirée'];
const PLATFORM: Array<'online' | 'just-irl'> = ['online', 'just-irl'];

const platformTrad = {
  'online': 'ligne',
  'just-irl': 'irl',
};

const CreateSession = () => {
  const [selectedPjs, setSelectedPjs] = useState<string[]>([]);
  const [lastQuest, setLastQuest] = useState('');
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [players, setPlayers] = useState<UserInfo[]>([]);
  const [characters, setCharacters] = useState<PjType[]>([]);
  const [possibleDates, setPossibleDates] =
      useState<PossibleDate[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<number>(0);
  const [selectedMoment, setSelectedMoment] = useState(0);
  const navigate = useNavigate();
  const api = useApi();
  const auth = useAuth();

  useEffect(() => {
    try {
      const removeUselessPlatform = (possiblePlatform?: PossiblePlatform) => {
        const removeUselessAvailability = (
            platform: 'just-irl' | 'online',
            gmId : string,
            tempData: PossiblePlatform,
        ) => {
          const platformData = possiblePlatform?.[platform];
          if (platformData && platformData.includes(gmId)) {
            const playersOfAvailabilityFiltered =
                platformData.filter((player) => player !== gmId);
            if (playersOfAvailabilityFiltered.length > 0) tempData[platform] = playersOfAvailabilityFiltered;
          }
        };
        const tempData: PossiblePlatform = {};
        const gmId = auth?.user.info?.id;
        if (!gmId) return tempData;
        removeUselessAvailability('just-irl', gmId, tempData);
        removeUselessAvailability('online', gmId, tempData);
        return tempData;
      };
      const removeUselessMoment = (possibleDate: PossibleDate) => {
        const tempData: PossibleDate = {date: possibleDate.date};
        if (possibleDate.journée?.['just-irl'] ||
          possibleDate.journée?.online) tempData.journée = possibleDate.journée;
        if (possibleDate.soirée?.['just-irl'] ||
          possibleDate.soirée?.online) tempData.soirée = possibleDate.soirée;
        return tempData;
      };
      const fetchData = async () =>{
        const userRes = await api.get('/users');
        const charactersRes = await api.get('/characters');
        const availabilitiesRes = await api.get('/availabilities');
        setPlayers(userRes.data);
        setCharacters(charactersRes.data);

        const possibleDatesTemp: PossibleDate[] = [];
        availabilitiesRes.data.forEach((availabilityRes : AvailabilitySend) => {
          if (
            availabilityRes.platform !== 'none' &&
            availabilityRes.platform !== 'rest' &&
            availabilityRes.platform !== 'in-game'
          ) {
            let index = possibleDatesTemp.findIndex(
                (possibleDates) => possibleDates.date === availabilityRes.at.date);
            if (index === -1) {
              possibleDatesTemp.push({
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
              index = possibleDatesTemp.length -1;
            }
            if (availabilityRes.platform === 'irl-or-online') {
              possibleDatesTemp[index][availabilityRes.at.moment]?.['just-irl']?.push(availabilityRes.user);
              possibleDatesTemp[index][availabilityRes.at.moment]?.['online']?.push(availabilityRes.user);
            } else {
              possibleDatesTemp[index][availabilityRes.at.moment]?.[availabilityRes.platform]?.push(availabilityRes.user);
            }
          }
        });
        setPossibleDates(possibleDatesTemp.map((possibleDate) => {
          return ({
            'date': possibleDate.date,
            'journée': removeUselessPlatform(possibleDate.journée),
            'soirée': removeUselessPlatform(possibleDate.soirée),
          });
        }).map((possibleDates) => removeUselessMoment(possibleDates)).filter((possibleDates) =>
          possibleDates['journée'] ||
          possibleDates['soirée'],
        ));
      };
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de la récupération des données');
    }
  }, []);
  useEffect(()=> {
    const date = possibleDates[selectedDate];
    if (date) {
      const possibleDateKeys = Object.keys(date);
      if (possibleDateKeys.length === 2) {
        setSelectedMoment(
            MOMENT.findIndex((moment) => moment === possibleDateKeys[1]));
      }
    }
  }, [possibleDates, selectedDate]);
  useEffect(() => {
    const moment = possibleDates[selectedDate]?.[MOMENT[selectedMoment]];
    if (moment) {
      const possibleDateKeys = Object.keys(moment);
      if (possibleDateKeys.length === 1) {
        setSelectedPlatform(
            PLATFORM.findIndex((platform) => platform === possibleDateKeys[0]));
      }
    }
  }, [possibleDates, selectedDate]);
  useEffect(()=> setSelectedPjs([]), [selectedDate, selectedPlatform, selectedMoment]);

  const getPlayerAvailableOnOtherMoment = () => {
    if (!possibleDates[selectedDate][MOMENT[(selectedMoment+1)%2]]?.['just-irl']) {
      return possibleDates[selectedDate][MOMENT[(selectedMoment+1)%2]]?.online?.length;
    }
    const concatMoment = possibleDates[selectedDate][MOMENT[(selectedMoment+1)%2]]?.['just-irl']?.concat(
        possibleDates[selectedDate][MOMENT[(selectedMoment+1)%2]]?.online || []);
    return concatMoment?.filter((player, index) => concatMoment?.indexOf(player) === index).length;
  };
  const getPlayerAvailableOnOtherPlatform = () => possibleDates[selectedDate][MOMENT[selectedMoment]]?.
      [PLATFORM[(selectedPlatform+1)%2]]?.length;

  const getById = (id: string) => {
    return characters?.filter((el) => el.id === id)[0];
  };

  const loading = !possibleDates.length;

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
        date: `${possibleDates[selectedDate].date}`,
        moment: MOMENT[selectedMoment],
        platform: PLATFORM[selectedPlatform],
        characters: selectedPjs.filter((el) => !!el),
      });
      toast.success('La partie à été créer avec succès');
      navigate('/map');
    } catch (error) {
      toast.error('Impossible de créer la partie');
    }
  };

  return !loading ?
    <div
      className="w-full flex items-center flex-col gap-3 text-brown font-bubblegum text-lg"
    >
      <div className='
        w-full
        flex
        items-center
        gap-2
      '>
        <span className='w-8'>Le</span>
        <ShortSelect
          textEmpty='Aucune date'
          width='40'
          showValue
          options={possibleDates.map((possibleDate) => {
            const date = new Date(+possibleDate.date);
            return (
              `${days[date.getDay()]}
              ${date.getDate()}
              ${months[date.getMonth()]}`
            );
          })}
          handleChange={handleDateChange}
          value={[selectedDate]}
        />
      </div>
      <div className='
        w-full
        flex
        items-center
        gap-2
      '>
        <span className='w-8'>En</span>
        {
          Object.keys(possibleDates[selectedDate]).length === 3 ?
          <>
            <ShortSelect
              width='40'
              showValue
              options={MOMENT}
              handleChange={handleMomentChange}
              value={[selectedMoment]}
            />
            <span>
              {`
                ${getPlayerAvailableOnOtherMoment()}
                joueur(s) présent(s) en ${MOMENT[(selectedMoment+1)%2]}
              `}
            </span>
          </> :
          <div className='p-1.5 bg-slate-300 rounded-lg px-3 w-40'>
            {Object.keys(possibleDates[selectedDate])[1]}
          </div>
        }
      </div>
      <div className='
        w-full
        flex
        items-center
        gap-2
      '>
        <span className='w-8'>Sur</span>
        {
          Object.keys(possibleDates[selectedDate]?.[MOMENT[selectedMoment]] || {}).length === 2 ?
          <>
            <ShortSelect
              width='40'
              showValue
              options={PLATFORM.map((platform) => platformTrad[platform])}
              handleChange={handlePlatformChange}
              value={[selectedPlatform]}
            />
            <span>
              {`
                ${getPlayerAvailableOnOtherPlatform()}
                joueur(s) présent(s) en ${platformTrad[PLATFORM[(selectedPlatform+1)%2]]}
              `}
            </span>
          </> :
          <div className='p-1.5 bg-slate-300 rounded-lg px-3 w-40'>
            {
              platformTrad[Object.keys(
                  possibleDates[selectedDate]?.[MOMENT[selectedMoment]] || {},
              )[0] as 'online' | 'just-irl']
            }
          </div>
        }
      </div>
      <div className='
      w-full
      flex
      items-center
      gap-2
    '>
      </div>
      {
        possibleDates[selectedDate]?.[MOMENT[selectedMoment]]?.[PLATFORM[selectedPlatform]]?.map(
            (playerId, index) => {
              const irlOrOnline = possibleDates[selectedDate]?.
                  [MOMENT[selectedMoment]]?.
                  [PLATFORM[(selectedPlatform+1)%2]]?.
                  some(
                      (currentPlayerId) => currentPlayerId === playerId);
              return (
                <PjSessionSelector
                  platform={irlOrOnline ? 'irl-or-online' : PLATFORM[(selectedPlatform)%2]}
                  quest={lastQuest}
                  selectedPj={selectedPjs[index]}
                  setSelectedPj={setSelectedPj}
                  playerIndex={index}
                  key={index}
                  pjs={characters.filter((pj) => pj.player === playerId)}
                  playerName={players.find((player) => player.id === playerId)?.name || 'User introuvable'}
                />
              );
            })
      }
      <PrimaryButton
        text={'Créer une partie'}
        onClick={submit}
      />
    </div> : <></>;
};

export default CreateSession;
