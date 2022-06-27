/* import ReactTooltip from 'react-tooltip'; */
import {PjType, Pos} from '../../types';
/* import PjCard from '../pjCard'; */
import React from 'react';

type Props = {
    hidden: boolean;
    showMouvement?: boolean;
    img: string;
    pj: PjType;
    pos: Pos;
    mouvement: number;
    handleOnDrag: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    setContexMenu: (e: React.MouseEvent<HTMLImageElement, MouseEvent>,
                    pjTODO: boolean) => void;
}

const Token = ({
  hidden,
  img,
  pj,
  pos,
  handleOnDrag,
  setContexMenu,
  mouvement,
  showMouvement = true,
} : Props) => {
  const handleContextMenu =
  (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setContexMenu(e, true);
  };
  const position = {
    top: `${pos.y* 100}%`,
    left: `${pos.x*100}%`,
  };
  return (
    <>
      <div
        className='absolute'
        style={
          showMouvement?
          {
            width: `${mouvement*100}%`,
            ...position,
          }:
          {
            width: '24px',
            ...position,
          }
        }
      >
        <div
          className={`
          z-10
          rounded-full
          flex
          justify-center
          items-center
          absolute
          border-dashed
          border-blue-500
          ${hidden && 'hidden'}
          ${showMouvement && 'border-2 ml-[-50%] mt-[-50%] bg-blue-500/[.2]'}
          w-full
          aspect-square
        `}
        >
          <img
            onContextMenu={(e) => handleContextMenu(e)}
            data-tip
            data-for={`${pj.name}RegisterTip`}
            src={img}
            alt={pj.name}
            onDragEnd={(e) => handleOnDrag(e)}
            className={`
              relative
              h-6
              w-6
              object-cover
              rounded-xl
              border
              border-black
              z-30
              ${!showMouvement &&
                'top-[-9px] left-[-12px]'}
            `}
          />
        </div>
      </div>
      {/* <ReactTooltip
        id={`${pj.name}RegisterTip`}
        place='right'
        effect='solid'
        backgroundColor='none'
        delayShow={500}
      >
        <PjCard pjData={pj} />
      </ReactTooltip>*/}
    </>
  );
};

export default Token;
