import React, {useEffect, useState} from 'react';
import {SessionCard} from 'components';
import {useApi} from 'hooks';
import {Session, UserInfo} from 'types';
import {toast} from 'react-toastify';

const SessionPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [pastSession, setPastSession] = useState(false);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const api = useApi();

  useEffect(() => {
    try {
      const fetchData = async () =>{
        const sessionRes = await api.get('/sessions');
        const userRes = await api.get('/users');
        setSessions(sessionRes.data);
        setUsers(userRes.data);
      };
      fetchData();
    } catch (error) {
      toast.error('Impossible de récupérer les sessions');
    }
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


