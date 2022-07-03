import {MouseEvent, useState, useRef, useEffect} from 'react';
import {landsMoocked, playerMoocked, speedMoocked} from '../../moockedData';
import {GroupData, PjType} from '../../types';
import MapButton from './mapButton';
import ShortSelect from '../shortSelect';
import React from 'react';
import Token from './tokens/token';
import ContextMenu from './contextMenu';

type Props = {
    pjs : PjType[];
    img: string;
    mapName: string;
    scale: number;
}

type ContextMenuProps = {
  y: string;
  x: string;
  pjIndex?: number;
}

const formatPjToTokenData = (pj :PjType) => {
  if (!pj.positions) return undefined;
  return {
    ...pj.positions.coordonate,
    map: pj.positions.map,
    showMouvement: 0,
    group: pj.positions.group,
  };
};

const Map = ({img, pjs, mapName, scale}: Props) => {
  const mapRef = useRef<HTMLImageElement>(null);

  const [rerender, setRerender] = useState(false);
  const [entityDrag, setEntityDrag] = useState({entityId: -1, group: false});
  const [contexMenu, setContextMenu] =
    useState<ContextMenuProps | null>(null);
  const [groupsData, setGroupsData] = useState<(GroupData | undefined)[]>([]);
  const [tokenData, setTokenData] =
    useState(pjs.map((pj) => formatPjToTokenData(pj)));
  const [pjSortedByPlayer, setPjSortedByPlayer] = useState<number[]>([]);
  const [height, setHeight] = useState(mapRef?.current?.height || 0);
  const [contextValue, setContextValue] =
      useState({speed: 0, land: 0, duration: 0});
  const tokens: JSX.Element[] = []; /* TODO check refresch */
  const groups: JSX.Element[] = [];
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
      /* TODO calculer en demie journée */
      value: contextValue.duration,
    },
  };

  const handleContextMenuChange = (
      action: string,
      index: number,
  ) => {
    if (action === 'speed' ||
        action === 'land' ||
        action === 'duration') {
      const contextValueTemp = {...contextValue};
      contextValueTemp[action] = index;
      setContextValue(contextValueTemp);
      setContextMenu(null);
      return;
    }
    const tokenDataTemp = [...tokenData];
    switch (action) {
      case 'supressToken':
        tokenDataTemp[index] = undefined;
        setTokenData(tokenDataTemp);
        break;
      case 'showMouvement':
        tokenDataTemp[index] = {
          map: tokenDataTemp[index]?.map || '',
          x: tokenDataTemp[index]?.x || 0,
          y: tokenDataTemp[index]?.y || 0,
          showMouvement: tokenDataTemp[index]?.showMouvement === 1 ? 0:1,
          group: tokenDataTemp[index]?.group || -1,
        };
        setTokenData(tokenDataTemp);
        break;
      case 'resetToken':
        tokenDataTemp[index] = formatPjToTokenData(pjs[index]);
        setTokenData(tokenDataTemp);
    }
    setContextMenu(null);
  };
  const openContextMenu =(
      e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
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
  const placeEntity = (
      entitySelected: number,
      event : MouseEvent<HTMLDivElement>,
      group: boolean,
  ) => {
    if (entitySelected > -1 && mapRef.current) {
      if (
        event.pageX > mapRef.current.offsetLeft &&
        event.pageX < mapRef.current.offsetLeft + mapRef.current.scrollWidth &&
        event.pageX > mapRef.current.offsetTop &&
        event.pageY < mapRef.current.offsetTop + mapRef.current.scrollHeight
      ) {
        if (group && groupsData[entitySelected]) {
          const groups = [...groupsData];
          groups[entitySelected] = {
            position: {
              x: (event.pageX-mapRef.current.offsetLeft)/
              (mapRef.current.clientWidth),
              y: (event.pageY-mapRef.current.offsetTop)/
              (mapRef.current.clientHeight),
            },
            members: groups[entitySelected]?.members || [],
          };
          setGroupsData(groups);
        } else {
          const tokens = [...tokenData];
          tokens[entitySelected] = {
            x: (event.pageX-mapRef.current.offsetLeft)/
            (mapRef.current.clientWidth),
            y: (event.pageY-mapRef.current.offsetTop)/
            (mapRef.current.clientHeight),
            map: mapName,
            showMouvement: tokens[entitySelected]?.showMouvement || 0,
            group: tokens[entitySelected]?.group || -1,
          };
          setTokenData(tokens);
        }
      };
    }
  };
  const groupTokens = (
      entityId: number,
      group?: boolean,
  ) => {
    const tokenDataTemp = tokenData;
    const groupsDataTemp = groupsData;
    const characterB = tokenDataTemp[entityId];
    const groupB = groupsDataTemp[entityId];
    if (entityDrag.group) {
      const groupA = groupsData[entityDrag.entityId];
      if (groupA) {
        if (group && groupB) {
          groupB.members.push(
              ...groupA.members);
          groupsData[entityDrag.entityId] = undefined;
        } else if (characterB) {
          groupA.members.push(entityId);
          characterB.group = entityDrag.entityId;
        }
      }
    } else {
      const characterA = tokenDataTemp[entityDrag.entityId];
      if (characterA) {
        if (group && groupB) {
          groupB.members.push(entityDrag.entityId);
          characterA.group = entityId;
        } else if (characterB) {
          for (let i =0; true; i++) {
            if (!groupsData[i]) {
              characterB.group = i;
              characterA.group = i;
              groupsData[i]={
                members: [entityDrag.entityId, entityId],
                position: {
                  x: characterB.x,
                  y: characterB.y,
                },
              };
              break;
            }
          }
        }
      }
      setGroupsData(groupsDataTemp);
      setTokenData(tokenDataTemp);
      createTokens();
      setRerender(!rerender);
      // Have to set a state for tokens or dependecies of usesState
    }
  };
  const createTokens = () => {
    if (mapRef?.current) {
      pjs.forEach((pj, index) => {
        if (tokenData[index] && tokenData[index]?.group === -1) {
          if (tokenData[index]?.map === mapName) {
            tokens[index] =
            <Token
              groupTokens={groupTokens}
              index={index}
              setEntityDrag={setEntityDrag}
              handleOnDrag={(e) => placeEntity(index, e, false)}
              showMouvement={tokenData[index]?.showMouvement === 1}
              mouvement={
                (((speedMoocked[contextValue.speed].speedMod) *
                  (landsMoocked[contextValue.land].speedMod) *
                  (contextValue.duration +1))*2 / (scale * 30))
              }
              setContexMenu={(e) => openContextMenu(e, index)}
              hidden={
                !(pjSortedByPlayer.length===0 ||
                pjSortedByPlayer.some(
                    (selectedPj) => selectedPj === pj.player))}
              pj={pjs[index]}
              key={pj.name}
              pos={tokenData[index] || {x: 0, y: 0}}
            />;
          };
        }
      });
      groupsData.forEach((group, index) => {
        if (groupsData[index] !== undefined) {
          groups[index] =
          <Token
            groupData={groupsData[index]}
            groupTokens={groupTokens}
            index={index}
            setEntityDrag={setEntityDrag}
            handleOnDrag={(e) => placeEntity(index, e, true)}
            showMouvement={tokenData[index]?.showMouvement === 1}
            mouvement={
              (((speedMoocked[contextValue.speed].speedMod) *
                  (landsMoocked[contextValue.land].speedMod) *
                  (contextValue.duration +1))*2 / (scale * 30))
            }
            setContexMenu={(e) => openContextMenu(e, index)}
            hidden={
              !(pjSortedByPlayer.length===0 ||
                pjSortedByPlayer.some(
                    (currentCharacter) =>
                      groupsData[index]?.members.some(
                          (currentMember) =>
                            currentMember === currentCharacter))
              )}
            key={index}
            pos={groupsData[index]?.position || {x: 0, y: 0}}
          />;
        }
      });
    }
  };
  useEffect(() => {
    if (height>0) {
      createTokens();
      setContextValue({...contextValue});
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
        className='relative overflow-hidden'
        ref={mapRef}
      >
        <img
          onDrag={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
          onContextMenu={(e) => openContextMenu(e)}
          className='self-start max-h-[800px]'
          src={img}
          alt={mapName}
        />
        {tokens}
        {groups}
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
                  (!!tokenData[index] && tokenData[index]?.map === mapName)
              }
              handleOnDrag={(e) => placeEntity(index, e, false)}
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
