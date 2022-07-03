import React from 'react';
import {ReactComponent as PersonIcon} from '../../../assets/person.svg';
import {GroupData} from '../../../types';

type Props = {
  groupData: GroupData;
  setGroupDrag: () => void;
  groupTokens: () => void;
  handleOnDrag: (e: React.DragEvent<HTMLDivElement>) => void;
};

const TokenGroups = ({
  groupData,
  setGroupDrag,
  groupTokens,
  handleOnDrag,
}: Props) => {
  return (
    <>
      <div
        draggable
        onDragStart={setGroupDrag}
        onDragEnd={(e) => {
          handleOnDrag(e);
        }}
        onDrop={() => {
          groupTokens();
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
    </>
  );
};

export default TokenGroups;
