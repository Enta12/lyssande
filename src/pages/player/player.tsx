import PjCard from '../../components/pjCard';
import SubTitle from '../../components/subTitle';
import Title from '../../components/title';
import addIcon from '../../assets/add.svg';
import Calendar from '../../components/calendar/calendar';
import {PossibleDate, User, PjType} from '../../types';
import {useNavigate, useParams} from 'react-router-dom';
import React, {useContext, useEffect, useState} from 'react';
import api from '../../api/axios';
import {AuthContext} from '../../AppRoute';

type Availability = 'no' | 'yes' | 'maybe'
const availability : Availability[] = [];
const dates: PossibleDate[] = [];

type Props = {
  userId?: string
}

const setDates = () => {
  new Array(7).fill('').forEach((value, index) => {
    dates.push({
      day: index,
      moment: 'journée',
    });
    availability.push(index === 0 || index === 6 ? 'yes' : 'no');
    dates.push({
      day: index,
      moment: 'soirée',
    });
    availability.push(index === 0 || index === 6 ? 'yes' : 'no');
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
      <SubTitle title="PERSONAGES" />
      <div className="grid grid-cols-4 grid-flow-rows gap-4 w-[62rem]">
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
      <SubTitle title="DATES" />
      <form >
        <Calendar dates={dates} availability={availability}/>
      </form>
    </div> : <></>
  );
};

export default Player;
