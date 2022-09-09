import {Session, UserInfo} from '../types';
import UnfoldingCard from './UnfoldingCard';
import React, {useState} from 'react';
import {months} from '../moockedData';
import avalabilityIrl from '../assets/availabilityIrl.svg';
import avalabilityIl from '../assets/availabilityIl.svg';
import {ReactComponent as EditButton} from '../assets/editButton.svg';
import PjCard from './pjCard';
import {useNavigate} from 'react-router-dom';

type Props = {
    data: Session;
    users: UserInfo[]
}

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

const SessionCard = ({
  data,
  users,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const sessionDate = new Date(+data.date);
  const past = new Date() > sessionDate;
  const gm = users[users.findIndex((el) => el.id === data.gm)];
  return (
    <UnfoldingCard
      header={
        <div className='flex gap-2 items-center justify-between w-full'>
          <div className='flex gap-2 items-center'>
            <img
              src={platformIcon[data.platform].icon}
              alt={platformIcon[data.platform].alt}
            />
            <span>
              <span className='underline'>
                {`Partie du 
                  ${sessionDate.getDate()} 
                  ${months[sessionDate.getMonth()]}
                `}
              </span>
              {` en ${data.moment}`}
            </span>

          </div>
          <div className='text-center'>
            {
              data.title ? `[ ${data.title} ]` :
              <>
                {
                  !past ?
                  '[ Pas encore de nom ]' :
                  <>
                    [Sans nom]
                    <span className='text-xs ml-1'>es tu le script ?</span>
                  </>
                }
              </>
            }
          </div>
          {
            gm &&
            <span className='min-w-max mr-4'>
              Organisé par {gm.name.toLocaleUpperCase()}
            </span>
          }
        </div>
      }
      isOpen={isOpen}
      handleOpen={setIsOpen}
    >
      <div className='relative'>
        <hr />
        <p
          className={`
          text-white
            font-bubblegum
            my-4
            ${!data.description ? 'text-center' : ''}
          `}
        >
          {data.description}
          {
            !data.description && (!past ?
            <>
              [Pas encore de description]
              <span className='text-xs ml-1'>on va pas se spoiler !</span>
            </>:
            <>
              [Sans description]
              <span className='text-xs ml-1'>es tu le script ?</span>
            </>
            )}
        </p>
        <p className='font-lg p-5 text-white font-bubblegum'>
          AVEC
          {
            data.characters.map((characterData, index) => {
              const character = users[users.findIndex(
                  (user) => user.id === characterData.player,
              )];
              return (
                <span className="ml-2 text-gray-300" key={index}>
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
        <div
          className="
            grid
            grid-cols-auto-fill-220
            grid-flow-rows
            gap-5
            p-5"
        >
          {data.characters.map((characterData, index) =>
            <PjCard
              key={index}
              pjData={characterData}
            />,
          )}
        </div>
        {
          past &&
          <button
            className='absolute right-2 bottom-2'
            onClick={() => navigate(`/sessions/${data.id}`)}
          >
            <EditButton />
          </button>
        }
      </div>
    </UnfoldingCard>
  );
};

export default SessionCard;
