import Map from '../components/map/map';
import {mapsMoocked} from '../moockedData';
import React, {useEffect, useState} from 'react';
import axios from '../api/axios';
import {PjType} from '../types';


const MapPage = () => {
  const [mapSelected, setMapSelected] = useState(0);
  const [pjData, setPjData] = useState<PjType[]>([]);

  useEffect(() => {
    const fetchData = async () =>{
      const res = await axios.get('/characters');
      setPjData(res.data);
    };
    fetchData();
  }, []);

  const updatePoisitions = (
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
    axios.put('/characters', body);
  };
  return (
    <>
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
        handleSend={updatePoisitions}
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
  last}: MapSelectorProps) => {
  return (
    <div className="bg-darkBrown rounded-t-full flex">
      {index !== 0 && <div className={`
      bg-amber-100
        ${actif && 'rounded-br-full'}
        w-2
        h-full
        self-end
      `} />}
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
      {!last && <div className={`
      bg-amber-100
      ${actif && 'rounded-bl-full'}
      w-2
      h-full
      self-end
    `} />}
    </div>

  );
};
