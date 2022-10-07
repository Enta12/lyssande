import React, {useState} from 'react';
import {ReactComponent as PersonIcon} from 'assets/icon/person.svg';
import {useOutsideClicker} from 'hooks';
import {GroupData, PcType} from 'types';
import TokenImg from './TokenImg';

type Props = {
  groupData: GroupData;
  setEntityDrag: (value : {entityId: number, group: boolean}) => void;
  groupTokens: (id: number, group: boolean) => void;
  charactersData?: PcType[];
  index: number;
  setIsGrouping: () => void;
};

const TokenGroups = ({
  index,
  setIsGrouping,
  charactersData,
  groupData,
  setEntityDrag,
  groupTokens,
}: Props) => {
  const onClickOutside = () => {
    setShowCharaters(false);
    setPcDrag(false);
  };
  const tokenRef = useOutsideClicker(onClickOutside);
  const [showCharacters, setShowCharaters] = useState(false);
  const [pcDrag, setPcDrag] = useState(false);
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
              ${pcDrag && 'opacity-50'}
          `}
          >
            {
              charactersData &&
                  groupData.members.map((characterID, index) => {
                    return (
                      <TokenImg
                        setIsGrouping={setIsGrouping}
                        key={index}
                        groupTokens={
                          () => {
                            groupTokens(characterID, false);
                          }
                        }
                        handleDragEnd={() => setPcDrag(false)}
                        setPcDrag={() => {
                          setEntityDrag(
                              {entityId: characterID, group: false});
                          setPcDrag(true);
                        }}
                        pc={charactersData[characterID]}
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
            onDrop={() => {
              groupTokens(index, true);
              setIsGrouping();
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
