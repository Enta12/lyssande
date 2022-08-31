import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../AppRoute';
import api from '../../api/axios';
import {SessionCard} from '../../components';
import {Session, User} from '../../types';

const SessionPage = () => {
  const {setUser} = useContext(AuthContext);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [pastSession, setPastSession] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () =>{
      const sessionRes = await api(setUser).get('/sessions');
      const userRes = await api(setUser).get('/users');
      setSessions(sessionRes.data);
      setUsers(userRes.data);
    };
    fetchData();
  }, []);
  return (
    <div className='flex flex-col gap-3 w-full'>
      <div
        className='
          flex
          justify-around
          font-bold
          font-bubblegum
          text-2xl
          mb-8'
      >
        <button
          onClick={() => setPastSession(true)}
          className={`
            hover:underline hover:text-brown
            ${
              pastSession ?
              'text-brown underline' :
              'text-gray-500' }
          `}
        >
          Parties passées
        </button>
        <button
          onClick={() => setPastSession(false)}
          className={`
            hover:underline hover:text-brown
            ${
              !pastSession ?
              'text-brown underline' :
              'text-gray-500' }
          `}
        >
          Parties à venir
        </button>
      </div>
      {
        sessions.filter(
            (sessionEl)=> pastSession ?
                new Date(+sessionEl.date) <= new Date() :
                new Date(+sessionEl.date) > new Date(),
        ).map(
            (sessionEl, index) =>
              <SessionCard key={index} data={sessionEl} users={users} />)
      }
    </div>
  );
};

export default SessionPage;


