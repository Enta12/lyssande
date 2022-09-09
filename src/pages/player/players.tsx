import PlayerCard from '../../components/playerCard';
import Title from '../../components/title';
import React, {useEffect, useState} from 'react';
import {UserInfo} from '../../types';
import {useApi} from '../../hook';

const Players = () => {
  const [users, setUsers] = useState<UserInfo[] | undefined>();
  const api = useApi();
  useEffect(() => {
    const fetchData = async () =>{
      const res = await api.get('/users');
      setUsers(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className='pt-8 w-full flex flex-col'>
      <Title title="LES JOUEURS" />
      <div className="mt-8 grid grid-cols-auto-fill-220 gap-4">
        {
          users &&
          users.map((user, index) =>
            <PlayerCard key={index} player={user} />)
        }
      </div>
    </div>
  );
};

export default Players;
