import Map from '../components/map/map';
import {mapsMoocked} from '../moockedData';
import React, {useContext, useEffect, useState} from 'react';
import api from '../api/axios';
import {PjType, User} from '../types';
import {AuthContext} from '../AppRoute';
import {toast} from 'react-toastify';
import {ReactComponent as Corner} from '../assets/reverseBorder/corner.svg';

// eslint-disable-next-line max-len
const noSaveMsg = 'Attention, vous pouvez temporairement déplacer vos tokens mais leur position n\'est pas enregistrée';

const MapPage = () => {
  const [mapSelected, setMapSelected] = useState(0);
  const [pjData, setPjData] = useState<PjType[]>([]);
  const [players, setPlayers] = useState<User[]>([]);
  const {setUser, user} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () =>{
      const characterRes = await api(setUser).get('/characters');
      const usersRes = await api(setUser).get('/users');
      setPjData(characterRes.data);
      setPlayers(usersRes.data);
    };
    fetchData();
  }, []);

  const updatePositions = async (
      newPositions: ({
      map: string;
      group: number;
      x: number;
      y: number;
  } | undefined)[]) => {
    const body: {
      id: string,
      positions: {
        coordinates: {
          x: number,
          y: number,
        }
        group: number,
        map: string,
      }
    }[] = [];
    newPositions.forEach((el, index) => {
      if (el) {
        body.push({
          id: pjData[index].id,
          positions: {
            coordinates: {
              x: el.x,
              y: el.y,
            },
            map: el.map,
            group: el.group,
          },
        });
      }
    });
    const res = await api(setUser).put('/characters', body);
    if (res.data.err) {
      toast.error(res.data.err);
    } else toast.success('Mise à jour réussie');
  };
  return (
    <>
      {
        user?.role === 'player' &&
        <p className='m-4 font-bold text-darkBrown text-xl'>
          {noSaveMsg}
        </p>
      }
      <div className="flex flex-col pb-5 w-full">
        <div className="flex w-full justify-between relative gap-2">
          {mapsMoocked.map((map, index) => {
            return (
              <MapSelector
                last={index === mapsMoocked.length-1}
                key={index}
                name={map.name}
                actif={index === mapSelected}
                index={index}
                handleChange={(changeIndex) => setMapSelected(changeIndex)}
              />
            );
          })}
        </div>
        <div className="
          bg-darkBrown
          w-full
          h-2
          rounded-b-lg
          min-w-[522px]"
        />
      </div>
      <Map
        players={players}
        handleSend={updatePositions}
        scale={mapsMoocked[mapSelected].scale}
        img={mapsMoocked[mapSelected].mapLink}
        pjs={pjData}
        mapName={mapsMoocked[mapSelected].name}
      />
    </>

  );
};

export default MapPage;

type MapSelectorProps = {
  last: boolean,
  handleChange: (index: number) => void,
  name: string,
  actif: boolean,
  index:number,
}

const MapSelector = ({
  name,
  actif,
  index,
  handleChange,
  last,
}: MapSelectorProps) => {
  return (
    <>
      <div className='flex relative'>
        { index !== 0 && actif &&
          <Corner
            className='
              absolute
              bottom-[-7px]
              left-[-11px]
              fill-darkBrown'
          />
        }
        <div
          onClick={() => handleChange(index)}
          className={`
            px-3
            2xl:text-lg
            text-base
            font-semibold
            cursor-pointer
            ${actif? 'bg-darkBrown text-orange' :
                     'bg-orange text-darkBrown'}
            m-auto
            rounded-t-xl
            h-9
            flex
            items-center
          `}
        >
          <span
            className='
              max-h-6
              text-ellipsis
              overflow-hidden'
          >
            <span className='hidden 2xl:inline' >~</span>
            {name}
            <span className='hidden 2xl:inline' >~</span>
          </span>
        </div>
        { !last && actif &&
          <Corner
            className='
              absolute
              bottom-[-7px]
              right-[-11px]
              rotate-[102deg]
              fill-darkBrown'
          />
        }
      </div>
    </>
  );
};
