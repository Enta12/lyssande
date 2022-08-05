import {MouseEvent, useState, useRef, useEffect, useContext} from 'react';
import {landsMoocked, speedMoocked} from '../../moockedData';
import {GroupData, PjType, User} from '../../types';
import MapButton from './mapButton';
import ShortSelect from '../shortSelect';
import React from 'react';
import Token from './tokens/token';
import ContextMenu from './contextMenu';
import PrimaryButton from '../primary-button';
import {AuthContext} from '../../AppRoute';

type Props = {
    players: User[];
    pjs : PjType[];
    img: string;
    mapName: string;
    scale: number;
    handleSend: (value: ({
      map: string,
      group: number,
      x: number,
      y: number,
    } | undefined)[]) => void;
}

type ContextMenuProps = {
  y: string;
  x: string;
  pjIndex?: number;
}

const formatPjToTokenData = (pj :PjType) => {
  if (!pj.positions) return undefined;
  return {
    ...pj.positions.coordinates,
    map: pj.positions.map,
    showMouvement: 0,
    group: pj.positions.group,
  };
};


const Map = ({img, pjs, players, mapName, scale, handleSend}: Props) => {
  const mapRef = useRef<HTMLImageElement>(null);
  const {user} = useContext(AuthContext);

  const [initEnd, setInitEnd] = useState(false);
  const [entityDrag, setEntityDrag] = useState({entityId: -1, group: false});
  const [contexMenu, setContextMenu] =
    useState<ContextMenuProps | null>(null);
  const [groupsData, setGroupsData] = useState<(GroupData | undefined)[]>([]);
  const [tokenData, setTokenData] =
    useState<({
      map: string;
      showMouvement:
      number;
      group: number;
      x: number;
      y: number;
    } | undefined)[]>([]);
  const [pjSortedByPlayer, setPjSortedByPlayer] = useState<string[]>([]);
  const [height, setHeight] = useState(mapRef?.current?.height || 0);
  const [contextValue, setContextValue] =
      useState({speed: 0, land: 0, duration: 0});

  useEffect(() => {
    setTokenData([...pjs.map((pj, index) => formatPjToTokenData(pj))]);
  }, [setTokenData, pjs]);

  useEffect(() => {
    const defineGroups = (
        pj: PjType,
        index: number,
        groupsDataTemp: (GroupData | undefined)[],
    ) => {
      if (pj.positions) {
        if (pj.positions.group || pj.positions.group === 0) {
          const group = groupsDataTemp[pj.positions.group];
          if (group) {
            group.members.push(index);
          } else {
            groupsDataTemp[pj.positions.group] = {
              members: [index],
              position: {
                ...pj.positions.coordinates,
                map: pj.positions.map,
              },
            };
          }
        }
      }
    };
    if (!initEnd && pjs.length) {
      const groupsDataTemps = groupsData;
      pjs.forEach((pj, index) => defineGroups(pj, index, groupsDataTemps));
      setGroupsData([...groupsDataTemps]);
      setInitEnd(true);
    }
  }, [pjs, groupsData, setGroupsData, initEnd, setInitEnd]);
  const tokens: JSX.Element[] = [];
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
          (duration, index) => (index+1)%2 === 0 ?
          `${(index+1)/2} jour${(index+1)/2>1 ? 's' : ''}` :
          `${(index+1)/2 > 0.5 ? `${Math.round((index+1)/2)}
          jour${(index+1)/2>1 ? 's' : ''} et ` : ''}
          1 demie journée`,
      ),
      value: contextValue.duration,
    },
  };
  let isGrouping = false;

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
    const tokenDataTemp = tokenData;
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
    if (pjSortedByPlayer.some((selectedPj) =>
      selectedPj === players[option].name)) {
      setPjSortedByPlayer(pjSortedByPlayer.filter((selectedPj) => {
        return selectedPj !== players[option].name;
      }));
    } else {
      setPjSortedByPlayer([...pjSortedByPlayer, players[option].name]);
    }
  };
  const placeEntity = (
      event : MouseEvent<HTMLDivElement>,
  ) => {
    if (entityDrag.entityId > -1 && mapRef.current) {
      if (
        event.pageX > mapRef.current.offsetLeft &&
        event.pageX < mapRef.current.offsetLeft + mapRef.current.scrollWidth &&
        event.pageY > mapRef.current.offsetTop &&
        event.pageY < mapRef.current.offsetTop + mapRef.current.scrollHeight
      ) {
        const tokenDataTemp = tokenData;
        const x = (event.pageX-mapRef.current.offsetLeft)/
            (mapRef.current.clientWidth);
        const y = (event.pageY-mapRef.current.offsetTop)/
            (mapRef.current.clientHeight);
        if (entityDrag.group && groupsData[entityDrag.entityId]) {
          const groups = [...groupsData];
          groups[entityDrag.entityId]?.members.forEach((member) => {
            tokenDataTemp[member] = {
              x,
              y,
              map: mapName,
              showMouvement:
                  tokenDataTemp[entityDrag.entityId]?.showMouvement || 0,
              group: entityDrag.entityId,
            };
          });
          groups[entityDrag.entityId] = {
            position: {
              x,
              y,
              map: mapName,
            },
            members: groups[entityDrag.entityId]?.members || [],
          };
          setGroupsData(groups);
        } else if (!isGrouping) {
          if (tokenDataTemp[entityDrag.entityId]?.group !== -1) {
            ungroupToken(entityDrag.entityId);
          }
          tokenDataTemp[entityDrag.entityId] = {
            x,
            y,
            map: mapName,
            showMouvement:
                tokenDataTemp[entityDrag.entityId]?.showMouvement || 0,
            group: -1,
          };
        }
        setTokenData([...tokenDataTemp]);
      };
    }
  };
  const ungroupToken = (characterId: number) => {
    const tokenDataTemp = tokenData;
    const groupsDataTemp = groupsData;
    const character = tokenDataTemp[characterId];
    if (character) {
      const group = groupsDataTemp[character.group];
      if (group) {
        const characterIndex = group.members.indexOf(characterId);
        if (characterIndex !== -1) {
          group.members.splice(characterIndex, 1);
        }
      }
      if (
        groupsDataTemp[character.group]?.members.length === 1
      ) {
        const lastCharacterIndex = groupsDataTemp[character.group]?.members[0];
        if (lastCharacterIndex !== undefined) {
          const lastCharacter =
            tokenDataTemp[lastCharacterIndex];
          if (lastCharacter) lastCharacter.group = -1;
        }
        groupsData[character.group] = undefined;
      }
      character.group = -1;
    }
    setTokenData(tokenDataTemp);
    setGroupsData(groupsDataTemp);
  };
  const groupTokens = (
      entityId: number,
      group?: boolean,
  ) => {
    const tokenDataTemp = tokenData;
    const groupsDataTemp = groupsData;
    const characterB = tokenDataTemp[entityId];
    const groupB = groupsDataTemp[entityId];
    if (
      (group && entityDrag.group !== group) ||
      (
        entityId !== entityDrag.entityId &&
        ((entityDrag.group &&
          !groupsData[entityDrag.entityId]?.members.some(
              (member) => entityId === member)) ||
          !entityDrag.group
        ))) {
      if (entityDrag.group) {
        const groupA = groupsData[entityDrag.entityId];
        if (groupA) {
          if (group && groupB) {
            groupB.members.push(
                ...groupA.members);
            groupsData[entityDrag.entityId] = undefined;
            groupA.members.forEach((memberId) => {
              const member = tokenData[memberId];
              if (member) {
                member.group = entityId;
                member.x = groupB.position.x;
                member.y = groupB.position.y;
              }
            });
          } else if (characterB) {
            groupA.members.push(entityId);
            groupA.position.x = characterB.x;
            groupA.position.y = characterB.y;
            characterB.group = entityDrag.entityId;
            groupA.members.forEach((memberId) => {
              const member = tokenData[memberId];
              if (member) {
                member.x = characterB.x;
                member.y = characterB.y;
              }
            });
          }
        }
      } else {
        if (!tokenDataTemp[entityDrag.entityId]) {
          tokenDataTemp[entityDrag.entityId] = {
            x: group ? groupB?.position.x || -1 : characterB?.x || -1,
            y: group ? groupB?.position.y || -1 : characterB?.y || -1,
            map: mapName,
            showMouvement: 0,
            group: group ? entityId : -1,
          };
        }
        const characterA = tokenDataTemp[entityDrag.entityId];
        if (characterA) {
          if (group && groupB) {
            groupB.members.push(entityDrag.entityId);
            characterA.group = entityId;
            characterA.x = groupB.position.x;
            characterA.y = groupB.position.y;
          } else if (characterB) {
            for (let i =0; true; i++) {
              if (!groupsData[i]) {
                characterB.group = i;
                characterA.group = i;
                characterA.x = characterB.x;
                characterA.y = characterB.y;
                groupsDataTemp[i]={
                  members: [entityDrag.entityId, entityId],
                  position: {
                    x: characterB.x,
                    y: characterB.y,
                    map: mapName,
                  },
                };
                break;
              }
            }
          }
        }
      }
      setGroupsData([...groupsDataTemp]);
      setTokenData([...tokenDataTemp]);
      createTokens();
    }
  };
  const createTokens = () => {
    if (mapRef?.current) {
      pjs.forEach((pj, index) => {
        if (tokenData[index] && tokenData[index]?.group === -1) {
          if (tokenData[index]?.map === mapName) {
            tokens[index] =
            <Token
              setIsGrouping={() => isGrouping = true}
              placeEntity={placeEntity}
              groupTokens={groupTokens}
              index={index}
              setEntityDrag={setEntityDrag}
              showMouvement={tokenData[index]?.showMouvement === 1}
              mouvement={
                (((speedMoocked[contextValue.speed].speedMod) *
                  (landsMoocked[contextValue.land].speedMod) *
                  (contextValue.duration +1)) / (scale * 30))
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
        if (groupsData[index] && groupsData[index]?.position.map === mapName) {
          groups[index] =
          <Token
            setIsGrouping={() => isGrouping = true}
            placeEntity={placeEntity}
            charactersData={pjs}
            groupData={groupsData[index]}
            groupTokens={groupTokens}
            index={index}
            setEntityDrag={setEntityDrag}
            showMouvement={tokenData[index]?.showMouvement === 1}
            mouvement={
              (((speedMoocked[contextValue.speed].speedMod) *
                  (landsMoocked[contextValue.land].speedMod) *
                  (contextValue.duration +1)) / (scale * 30))
            }
            setContexMenu={(e) => openContextMenu(e, index)}
            hidden={
              !(pjSortedByPlayer.length===0 ||
                pjSortedByPlayer.some(
                    (currentPlayer) =>
                      groupsData[index]?.members.some(
                          (currentMember) =>
                            pjs[currentMember].player === currentPlayer,
                      ),
                ))}
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

  createTokens();
  return (
    <>
      <div
        className='relative overflow-hidden'
        ref={mapRef}
      >
        <img
          draggable={false}
          onDrag={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            placeEntity(e);
          }}
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
          options={players.map((player) => player.name)}
          value={pjSortedByPlayer.map((el) =>
            players.findIndex((player) => player.name === el))}
          handleChange={handleChange} />
      </div>
      <div className='flex gap-16 mt-4 w-full pb-5 pl-5 min-h-[100px]'>

        {pjs.map((pj, index) => {
          return (
            <MapButton
              setPjDrag={() => setEntityDrag(
                  {entityId: index, group: false},
              )}
              hidden={
                !(pjSortedByPlayer.length===0 ||
                  pjSortedByPlayer.some(
                      (selectedPj) => selectedPj === pj.player)) ||
                  (!!tokenData[index] && tokenData[index]?.map === mapName)
              }
              key={pj.name}
              name={pj.name}
              picture={pj.img}
            />
          );
        })}
      </div>
      {
        (
          user?.role === 'admin' ||
          user?.role === 'gm'
        ) &&
        <PrimaryButton
          text='Mettre à jour les placements'
          onClick={() => handleSend(tokenData)}
        />
      }
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
