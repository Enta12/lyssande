import React, {useEffect, useRef, useState} from 'react';
import {ReactComponent as PersonIcon} from '../../../assets/person.svg';
import {GroupData, PjType} from '../../../types';
import TokenImg from './tokenImg';

type Props = {
  ungroupToken: (value: number) => void;
  groupData: GroupData;
  setEntityDrag: (value : {entityId: number, group: boolean}) => void;
  groupTokens: (id: number, group: boolean) => void;
  placeEntity: (
    entitySelected: number,
    event: (React.DragEvent<HTMLDivElement> |
      React.DragEvent<HTMLImageElement>),
    group: boolean) => void
  charactersData?: PjType[];
  index: number;
};

const TokenGroups = ({
  index,
  ungroupToken,
  charactersData,
  groupData,
  setEntityDrag,
  groupTokens,
  placeEntity,
}: Props) => {
  const tokenRef = useRef<HTMLDivElement>(null);
  const [showCharacters, setShowCharaters] = useState(false);
  const [pjDrag, setPjDrag] = useState(false);
  useEffect(() => {
    const onClickOutside = () => {
      setShowCharaters(false);
      setPjDrag(false);
    };
    const handleClickOutside = (event: any) => {
      if (tokenRef.current && !tokenRef.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [tokenRef]);
  return (
    <div
      onClick={() => {
        if (!showCharacters) {
          setShowCharaters(true);
        }
      }}
      ref={tokenRef}
    >
      {
          showCharacters ?
          <div
            style={{
              marginLeft: `-${(groupData.members.length+1) *50}%`,
            }}
            className={`
              min-w-max
              p-2
              z-10
              rounded-full
              flex
              gap-1
              justify-center
              items-center
              absolute
              border-2
              border-black
              bg-brown
              mt-[-90%]
              transition-opacity
              ${pjDrag && 'opacity-50'}
          `}
          >
            {
              charactersData &&
                  groupData.members.map((characterID, index) => {
                    return (
                      <TokenImg
                        key={index}
                        groupTokens={
                          () => {
                            groupTokens(characterID, false);
                          }
                        }
                        handleDragEnd={() => setPjDrag(false)}
                        setPjDrag={() => {
                          setEntityDrag(
                              {entityId: characterID, group: false});
                          setPjDrag(true);
                        }}
                        handleOnDrag={(e) => {
                          ungroupToken(characterID);
                          placeEntity(characterID, e, false);
                        }}
                        pj={charactersData[characterID]}
                      />
                    );
                  },
                  )
            }
          </div> :
          <div
            draggable
            onDragStart={() => setEntityDrag(
                {entityId: index, group: true},
            )}
            onDragEnd={(e) => placeEntity(index, e, true)}
            onDrop={() => {
              groupTokens(index, true);
            }}
            className={`
              relative
              h-6
              w-6
              rounded-xl
              border
              border-black
              z-30
              flex
              flex-col
              justify-center
              items-center
              bg-lightBrown
          `}
          >
            <div className='relative'>
              <PersonIcon
                className='w-4 h-4'
              />
              <span
                className='
                z-40
                absolute
                top-[-3px]
                text-[10px]
                left-[5px]
                text-orange
                font-semibold
              '
              >
                {groupData.members.length}
              </span>
            </div>
          </div>
      }
    </div>
  );
};

export default TokenGroups;
