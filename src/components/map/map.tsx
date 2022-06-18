import {MouseEvent, useState, useRef, useEffect} from 'react';
import {landsMoocked, playerMoocked, speedMoocked} from '../../moockedData';
import {PjType} from '../../types';
import MapButton from './mapButton';
import ShortSelect from '../shortSelect';
import React from 'react';
import Token from './token';
import ContextMenu from './contextMenu';

type Props = {
    pjs : PjType[],
    img: string,
    mapName: string,
}

type ContextMenuProps = {
  y: string;
  x: string;
  pjIndex?: number;
}

const formatPjToPos = (pj :PjType) => {
  if (!pj.positions) return undefined;
  return {
    ...pj.positions.coordonate,
    map: pj.positions.map,
  };
};

const Map = ({img, pjs, mapName}: Props) => {
  const mapRef = useRef<HTMLImageElement>(null);

  const [contexMenu, setContextMenu] =
    useState<ContextMenuProps | null>(null);
  const [currentPos, setCurrentPos] =
    useState(pjs.map((pj) => formatPjToPos(pj)));
  const [pjSelected, setPjSelected] = useState(-1);
  const [pjSortedByPlayer, setPjSortedByPlayer] = useState<number[]>([]);
  const [height, setHeight] = useState(mapRef?.current?.height || 0);
  const [contextValue, setContextValue] =
      useState({speed: 0, land: 0, duration: 0});

  const tokens: JSX.Element[] = [];
  const contextMenu = {
    speed: {
      options: speedMoocked.map((speed) => speed.name),
      value: contextValue.speed,
    },
    land: {
      options: landsMoocked.map((land) => land.name),
      value: contextValue.land,
    },
    duration: {
      options: new Array(10).fill('').map(
          (duration, index) => `${index+1} jour`),
      value: contextValue.duration,
    },
  };

  const handleContextMenuChange = (action: string, index: number) => {
    if (action === 'speed' || action === 'land' || action === 'duration') {
      const contextValueTemp = {...contextValue};
      contextValueTemp[action] = index;
      setContextValue(contextValueTemp);
      setContextMenu(null);
      return;
    }
    const currentPosTemp = [...currentPos];
    switch (action) {
      case 'supressToken':
        currentPosTemp[index] = undefined;
        setCurrentPos(currentPosTemp);
        break;
      case 'resetToken':
        currentPosTemp[index] = formatPjToPos(pjs[index]);
        setCurrentPos(currentPosTemp);
    }
    setContextMenu(null);
  };
  const openContextMenu =(
      e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>,
      pjIndex?: number,
  ) => {
    e.preventDefault();
    const xPos = e.pageX + 'px';
    const yPos = e.pageY + 'px';
    setContextMenu({
      x: xPos,
      y: yPos,
      pjIndex: pjIndex,
    });
  };
  const handleChange= (option: number) => {
    if (pjSortedByPlayer.some((selectedPj) => selectedPj === option)) {
      setPjSortedByPlayer(pjSortedByPlayer.filter((selectedPj) => {
        return selectedPj !== option;
      }));
    } else {
      setPjSortedByPlayer([...pjSortedByPlayer, option]);
    }
  };
  const placeSelectedPj = (event : MouseEvent<HTMLDivElement>) => {
    if (pjSelected > -1 && mapRef.current) {
      const currentItem = [...currentPos];
      currentItem[pjSelected] = {
        x: (event.pageX-mapRef.current.offsetLeft-12)/
          (mapRef.current.clientWidth),
        y: (event.pageY-mapRef.current.offsetTop-12)/
          (mapRef.current.clientHeight),
        map: mapName,
      };
      setCurrentPos(currentItem);
    }
  };
  const createTokens = () => {
    pjs.forEach((pj, index) => {
      if (mapRef?.current && currentPos[index]) {
        if (currentPos[index]?.map === mapName) {
          tokens[index] =
          <Token
            setContexMenu={(e) => openContextMenu(e, index)}
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
            pos={currentPos[index] || {x: 0, y: 0}}
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
          onContextMenu={(e) => openContextMenu(e)}
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
                      (selectedPj) => selectedPj === pj.player)) ||
                  (!!currentPos[index] && currentPos[index]?.map === mapName)
              }
              onClick={() => {
                const pjPos = formatPjToPos(pj);
                if (pjPos) {
                  const currentPosTemp = [...currentPos];
                  currentPosTemp[index] = pjPos;
                  setCurrentPos(currentPosTemp);
                }
                setPjSelected(index);
              }}
              key={pj.name}
              name={pj.name}
              picture={pj.img}
            />
          );
        })}
      </div>
      {contexMenu !== null && <ContextMenu
        data={contextMenu}
        handleChange={handleContextMenuChange}
        pjIndex={contexMenu.pjIndex}
        y={contexMenu.y}
        x={contexMenu.x}
        close={() => setContextMenu(null)}
      />}
    </>
  );
};

export default Map;
