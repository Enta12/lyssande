import Map from '../components/map/map';
import {pjsMoocked, mapsMoocked} from '../moockedData';
import React, {useState} from 'react';


const MapPage = () => {
  const [mapSelected, setMapSelected] = useState(0);
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
        scale={mapsMoocked[mapSelected].scale}
        img={mapsMoocked[mapSelected].mapLink}
        pjs={pjsMoocked}
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
