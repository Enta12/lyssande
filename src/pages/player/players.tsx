import PlayerCard from '../../components/playerCard';
import Title from '../../components/title';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../AppRoute';
import api from '../../api/axios';
import {User} from '../../types';

const Players = () => {
  const {setUser} = useContext(AuthContext);
  const [users, setUsers] = useState<User[] | undefined>();
  useEffect(() => {
    const fetchData = async () =>{
      const res = await api(setUser).get('/users');
      setUsers(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className='pt-8 w-full flex flex-col'>
      <Title title="LES JOUEURS" />
      <div className="mt-8 grid grid-cols-3 grid-flow-rows gap-8 ">
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
