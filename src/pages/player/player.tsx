import PjCard from '../../components/pjCard';
import SubTitle from '../../components/subTitle';
import Title from '../../components/title';
import addIcon from '../../assets/add.svg';
// import Calendar from '../../components/calendar/calendar';
import {User, PjType, Availability} from '../../types';
import {useNavigate, useParams} from 'react-router-dom';
import React, {useContext, useEffect, useState} from 'react';
import api from '../../api/axios';
import {AuthContext} from '../../AppRoute';

const availabilities : Availability[] = [];

type Props = {
  userId?: string
}

const setDates = () => {
  new Array(7).fill('').forEach((value, index) => {
    availabilities.push({
      at: {
        date: new Date(),
        moment: 'journée',
      },
      platform: (index === 0 || index === 6 ? 'irl-or-online' : 'none'),
    });
    availabilities.push({
      at: {
        date: new Date(),
        moment: 'soirée',
      },
      platform: (index === 0 || index === 6 ? 'irl-or-online' : 'none'),
    });
  });
};

setDates();

const Player = ({userId} :Props) => {
  const params = useParams();
  const navigate = useNavigate();
  const {setUser} = useContext(AuthContext);
  const [playerSelected, setPlayerSelected] = useState<User | undefined>();
  const [characters, setCharacters] = useState<PjType[] | undefined>();
  const id = params.id || userId;
  if (!id) navigate('404');
  useEffect(() => {
    const fetchData = async () =>{
      const userRes = await api(setUser).get(`/users/${id}`);
      const charactersRes = await api(setUser).get(`/users/${id}/characters`);
      setPlayerSelected(userRes.data);
      setCharacters(charactersRes.data);
    };
    fetchData();
  }, []);
  return (
    playerSelected && characters ?
    <div className='
      pt-8
      w-full
      flex
      flex-col
      gap-8
    '>
      <Title title={playerSelected.name} />
      <SubTitle title="PERSONNAGES" />
      <div className="
        grid
        grid-cols-auto-fill-220
        grid-flow-rows
        gap-4
        w-full
      ">
        { characters.map(
            (characterData, index) =>
              <PjCard
                key={index}
                pjData={characterData}
                onClick={() => navigate(`/pj/${characterData.id}`)}
              />,
        )}
        <a href="/editCharacter">
          <button className="
            border-dashed
            h-96
            w-56
            border-orange
            border-8
            rounded-2xl
            flex
            justify-center
            items-center
          ">
            <img className="max-h-20" alt="add pj" src={addIcon} />
          </button>
        </a>
      </div>
      <SubTitle title="PREFERENCES" />
      <div className='font-bubblegum text-swamp'>
        Bientôt disponible
      </div>
      {
        /*
        <form >
          <Calendar
            availabilities={availabilities}
            setAvailability={
              (platform: Platform, index: number) => console.log('TODO')}
          />
        </form>
        */
      }
    </div> : <></>
  );
};

export default Player;
