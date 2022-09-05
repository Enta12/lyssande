import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../AppRoute';
import api from '../../api/axios';
import {Session, User} from '../../types';
import {Input, PjCard, PrimaryButton, TextInput, Title} from '../../components';
import {useNavigate, useParams} from 'react-router-dom';
import avalabilityIrl from '../../assets/availabilityIrl.svg';
import avalabilityIl from '../../assets/availabilityIl.svg';
import {months} from '../../moockedData';
import {toast} from 'react-toastify';

const platformIcon = {
  'online': {
    icon: avalabilityIl,
    alt: 'En ligne',
  },
  'just-irl': {
    icon: avalabilityIrl,
    alt: 'En vrai',
  },
};

const SessionEditPage = () => {
  const {setUser} = useContext(AuthContext);
  const [session, setSession] = useState<Session>();
  const [users, setUsers] = useState<User[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () =>{
      const sessionRes = await api(setUser).get(`/sessions/${params.id}`);
      const userRes = await api(setUser).get('/users');
      setSession(sessionRes.data);
      setTitle(sessionRes.data.title || '');
      setDescription(sessionRes.data.description || '');
      setUsers(userRes.data);
    };
    fetchData();
  }, []);
  const sessionDate = new Date(session ? +session.date : '');
  const gm = users[users.findIndex(
      (el) => el.id === session?.gm)];
  const submit = async () => {
    if (!(sessionDate > new Date())) {
      toast.error('Vous ne pouvez pas mettre à jour une partie à venir');
      return;
    }
    try {
      await api(setUser).put(`/sessions/${params.id}`, {
        description,
        title,
      });
      toast.success('La partie à été mise à jour avec succés');
      navigate('/');
    } catch (error) {
      toast.error('impossible de mettre à jour la partie');
    }
  };
  return (
    <div className='flex flex-col gap-3 w-full'>
      <Title
        className='self-center'
        title={session ?
          `Partie du
              ${' ' + sessionDate.getDate()}
              ${' ' + months[sessionDate.getMonth()] + ' '}
              en ${session?.moment}` :
              ''
        }
      />
      <div className='flex gap-2'>
        {
          session && <img
            src={platformIcon[session.platform].icon}
            alt={platformIcon[session.platform].alt}
          />
        }
        <p className='text-2xl p-5 text-swamp font-bubblegum'>
          {
            gm &&
            <span className='mr-4 text-darkBrown'>
              Organisé par {gm.name.toLocaleUpperCase()}
            </span>
          }
          AVEC
          {
            session && session.characters.map((characterData, index) => {
              const character = users[users.findIndex(
                  (user) => user.id === characterData.player,
              )];
              return (
                <span className="ml-2 text-bladeBrown" key={index}>
                  {
                    character ?
                    `- ${character.name.toLocaleUpperCase()} -` :
                    '- PERSONNE INTROUVABLE -'
                  }
                </span>
              );
            })
          }
        </p>
      </div>
      <div
        className='
          bg-orange/[.8]
          flex
          flex-col
          gap-4
          p-5
          rounded-2xl'
      >
        <Input
          placeholder="Nom de la partie"
          type="text"
          value={title}
          setValueString={setTitle}
        />
        <TextInput
          value={description}
          setValue={setDescription}
          placeholder="Résumé de la partie"
        />
      </div>
      <div
        className="
            grid
            grid-cols-auto-fill-220
            grid-flow-rows
            gap-5"
      >
        {session && session.characters.map((characterData, index) =>
          <PjCard
            key={index}
            pjData={characterData}
          />,
        )}
      </div>
      <PrimaryButton
        onClick={submit}
        className='self-center'
        text="Mettre à jour la partie"
      />
    </div>
  );
};

export default SessionEditPage;

