import {MouseEvent, useState, useRef, useEffect} from 'react';
import {playerMoocked} from '../../moockedData';
import {PjType} from '../../types';
import MapButton from './mapButton';
import ShortSelect from '../shortSelect';
import React from 'react';
import Token from './token';

type MapPos =
'positionFangh' |
'positionCaladie' |
'positionNorth' |
'positionJungle' |
'positionFernol' |
'positionMongbolo';

type Props = {
    pjs : PjType[],
    img: string,
    mapName: string,
}

const Map = ({img, pjs, mapName}: Props) => {
  const mapRef = useRef<HTMLImageElement>(null);
  const [currentPos, setCurrentPos] =
        useState<{x: number, y: number, map: string}[]>([]);
  const [pjSelected, setPjSelected] = useState(-1);
  const [pjSortedByPlayer, setPjSortedByPlayer] = useState<number[]>([]);
  const [height, setHeight] = useState(mapRef?.current?.height || 0);
  const tokens: JSX.Element[] = [];
  const handleChange= (option: number) => {
    if (pjSortedByPlayer.some((selectedPj) => selectedPj === option)) {
      setPjSortedByPlayer(pjSortedByPlayer.filter((selectedPj) => {
        return selectedPj !== option;
      }));
    } else {
      setPjSortedByPlayer([...pjSortedByPlayer, option]);
    }
  };
  let mapPos : MapPos = 'positionFangh';
  switch (mapName) {
    case 'Caladie':
      mapPos = 'positionCaladie';
      break;
    case 'Confins du givres':
      mapPos = 'positionNorth';
      break;
    case 'Jungles D\'Ammouka & Sungul':
      mapPos = 'positionJungle';
      break;
    case 'Ile Mong-Bolo':
      mapPos = 'positionMongbolo';
      break;
    case 'Fernol':
      mapPos = 'positionFernol';
      break;
  }
  const placeSelectedPj = (event : MouseEvent<HTMLDivElement>) => {
    if (pjSelected > -1 && mapRef?.current &&
            event.clientX >
              mapRef.current.offsetLeft - window.scrollX &&
            event.clientX <
              mapRef.current.offsetLeft + mapRef.current.clientWidth -
              window.scrollX &&
            event.clientY >
              mapRef.current.offsetTop - window.scrollY &&
            event.clientY <
              mapRef.current.offsetTop + mapRef.current.clientHeight -
              window.scrollY
    ) {
      const currentItem = [...currentPos];
      currentItem[pjSelected] = {
        x: (event.clientX+window.scrollX-mapRef.current.offsetLeft-12)/
          (mapRef.current.clientWidth),
        y: (event.clientY+window.scrollY-mapRef.current.offsetTop-12)/
          (mapRef.current.clientHeight),
        map: mapName,
      };
      setCurrentPos(currentItem);
    }
  };
  const createTokens = () => {
    pjs.forEach((pj, index) => {
      if (mapRef?.current) {
        if (currentPos[index]?.x > 0) {
          if (currentPos[index].map === mapName) {
            tokens[index] =
                    <Token
                      hidden={
                        !(pjSortedByPlayer.length===0 ||
                        pjSortedByPlayer.some(
                            (selectedPj) => selectedPj === pj.player))}
                      handleClick={() => {
                        setPjSelected(index);
                      }}
                      img={pjs[index].img}
                      pj={pjs[index]}
                      key={pj.name}
                      pos={currentPos[index]}
                      imgCoord={
                        {
                          xStart: mapRef.current.x,
                          width: mapRef.current.width,
                          yStart: mapRef.current.y,
                          height: mapRef.current.height,
                        }
                      }
                    />;
          };
        } else if (pj.positions[mapPos]) {
          tokens[index] =
                <Token
                  hidden={
                    !(
                      pjSortedByPlayer.length===0 ||
                      pjSortedByPlayer.some(
                          (selectedPj) => selectedPj === pj.player)
                    )}
                  handleClick={() => {
                    setPjSelected(index);
                  }}
                  img={pj.img}
                  key={pj.name}
                  pj={pj}
                  pos={pj.positions[mapPos] || {x: 0, y: 0}}
                  imgCoord={{
                    xStart: mapRef.current.x,
                    width: mapRef.current.width,
                    yStart: mapRef.current.y,
                    height: mapRef.current.height,
                  }}
                />;
        }
      }
    });
  };
  useEffect(() => {
    if (height>0) {
      createTokens();
      setPjSelected(pjSelected-1);
    } else {
      setTimeout(function() {
        setHeight(mapRef?.current?.clientHeight || height-1);
      }, 500);
    }
  }, [height]);

  /*
  const updatePjs = () => {
     TODO
     Send pjSelected
  };
  */
  createTokens();
  return (
    <>
      <div
        className='relative'
        ref={mapRef}
      >
        <img
          className='self-start max-h-[800px]'
          src={img}
          alt={mapName}
          onClick={placeSelectedPj}
        />
        {tokens}
      </div>
      <div className='flex gap-16 mt-4 w-full'>
        <ShortSelect
          textEmpty='Filtrer par joueur'
          options={playerMoocked.map((player) => player.name)}
          value={pjSortedByPlayer}
          handleChange={handleChange} />
      </div>
      <div className='flex gap-16 mt-4 w-full pb-5 pl-5'>

        {pjs.map((pj, index) => {
          return (
            <MapButton
              hidden={
                !(pjSortedByPlayer.length===0 ||
                  pjSortedByPlayer.some(
                      (selectedPj) => selectedPj === pj.player) ||
                  currentPos[index] || pj.positions[mapPos]
                )}
              onClick={() => {
                setPjSelected(index);
              }}
              key={pj.name}
              name={pj.name}
              picture={pj.img}
            />
          );
        })}
      </div>
    </>
  );
};

export default Map;
