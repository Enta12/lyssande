import {MouseEvent, useState, useRef, useEffect} from 'react';
import ReactTooltip from 'react-tooltip';
import {playerMoocked} from '../../moockedData';
import {Pos, PjType} from '../../types';
import PjCard from '../pjCard';
import MapButton from './mapButton';
import ShortSelect from '../shortSelect';
import React from 'react';

type MapPos =
'positionFangh' |
'positionCaladie' |
'positionNorth' |
'positionJungle' |
'positionFernol' |
'positionMongbolo';
type Img = {
    xStart: number;
    width: number;
    yStart: number;
    height: number;
}
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
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const handleResize = () => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  window.addEventListener('resize', handleResize);

  const placeSelectedPj = (event : MouseEvent<HTMLImageElement>) => {
    if (pjSelected !== -1 && mapRef?.current &&
            event.clientX >
              mapRef.current.x - window.scrollX &&
            event.clientX <
              mapRef.current.x + mapRef.current.width - window.scrollX &&
            event.clientY >
              mapRef.current.y - window.scrollY &&
            event.clientY <
              mapRef.current.y + mapRef.current.height - window.scrollY
    ) {
      const currentItem = [...currentPos];
      currentItem[pjSelected] = {
        x: (event.clientX+window.scrollX-mapRef.current.x)/
          (mapRef.current.width),
        y: (event.clientY+window.scrollY-mapRef.current.y)/
          (mapRef.current.height),
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
        setHeight(mapRef?.current?.height || height-1);
      }, 500);
    }
  }, [mapRef, height, dimensions]);

  /*
  const updatePjs = () => {
     TODO
     Send pjSelected
  };
  */
  createTokens();
  return (
    <>
      <img
        className='self-start max-h-[800px]'
        src={img}
        alt={mapName}
        onClick={placeSelectedPj}
        ref={mapRef}
      />
      {tokens}
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
                      (selectedPj) => selectedPj === pj.player)
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
type TokenProps = {
    hidden: boolean,
    img: string,
    pj: PjType,
    pos: Pos,
    imgCoord:Img,
    handleClick: () => void
}
const Token = (
    {hidden, img, pj, pos, imgCoord, handleClick} : TokenProps) => {
  return (
    <>
      <img
        onClick={handleClick}
        data-tip
        data-for={`${pj.name}RegisterTip`}
        src={img}
        alt={pj.name}
        className={
          `absolute
          h-6
          w-6
          object-cover
          rounded-xl
          border
          border-black
          ${hidden && 'hidden'}
        `}
        style={
          {
            top: `${(pos.y* imgCoord.height)+imgCoord.yStart -12}px`,
            left: `${(pos.x*imgCoord.width)+imgCoord.xStart -12}px`,
          }
        }

      />
      <ReactTooltip
        id={`${pj.name}RegisterTip`}
        place='right'
        effect='solid'
        backgroundColor='none'
        delayShow={500}
      >
        <PjCard pjData={pj} />
      </ReactTooltip>
    </>

  );
};

export default Map;