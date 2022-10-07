import Map from 'components/Map/Map';
import {mapsMoocked} from 'moockedData';
import React, {useEffect, useState} from 'react';
import {PcType, UserInfo} from 'types';
import {toast} from 'react-toastify';
import {useAuth} from 'hooks';
import useApi from 'hooks/useApi';
import {ReactComponent as Corner} from 'assets/reverseBorder/corner.svg';

// eslint-disable-next-line max-len
const noSaveMsg = 'Attention, vous pouvez temporairement déplacer vos tokens mais leur position n\'est pas enregistrée';

const MapPage = () => {
  const [mapSelected, setMapSelected] = useState(0);
  const [pcData, setPcData] = useState<PcType[]>([]);
  const [players, setPlayers] = useState<UserInfo[]>([]);
  const auth = useAuth();
  const api = useApi();

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const characterRes = await api.get('/characters');
        const usersRes = await api.get('/users');
        setPcData(characterRes.data);
        setPlayers(usersRes.data);
      } catch (error) {
        toast.error('Impossible de récupérer les personnages');
      }
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
          id: pcData[index].id,
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
    try {
      await api.put('/characters', body);
      toast.error('Mise à jour réussie');
    } catch (error) {
      toast.error('Erreur dans la mise à jour des utilisateurs');
    }
  };
  return (
    <>
      {
        auth?.user.info?.role === 'player' &&
        <p className='m-4 font-bold text-darkBrown text-xl'>
          {noSaveMsg}
        </p>
      }
      <div className="flex flex-col pb-5 w-full">
        <div className="flex w-full justify-between relative">
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
        <div className="bg-darkBrown w-full h-2 rounded-b-lg"/>
      </div>
      <Map
        players={players}
        handleSend={updatePositions}
        scale={mapsMoocked[mapSelected].scale}
        img={mapsMoocked[mapSelected].mapLink}
        pcs={pcData}
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
  last}: MapSelectorProps) => {
  return (
    <div className="relative">
      {
        !!index && actif &&
        <Corner
          className='
            rotate-[-3deg]
            absolute
            fill-darkBrown
            bottom-[-8px]
            left-[-11px]'
        />
      }
      <div
        onClick={() => handleChange(index)}
        className={`
          text-lg
          font-semibold
          cursor-pointer
          ${actif? 'bg-darkBrown text-orange' : 'bg-lightBrown text-darkBrown'}
          p-3
          rounded-t-lg`}
      >
        {`~ ${name} ~`}
      </div>
      {
        actif && !last &&
        <Corner
          className='
            rotate-[100deg]
            absolute
            fill-darkBrown
            bottom-[-8px]
            right-[-11px]'
        />
      }
    </div>

  );
};
