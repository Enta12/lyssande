/* import ReactTooltip from 'react-tooltip'; */
import {PjType, Pos} from '../../types';
/* import PjCard from '../pjCard'; */
import React from 'react';

type Img = {
    xStart: number;
    width: number;
    yStart: number;
    height: number;
}

type Props = {
    hidden: boolean,
    img: string,
    pj: PjType,
    pos: Pos,
    imgCoord: Img,
    handleClick: () => void
    setContexMenu: (e: React.MouseEvent<HTMLImageElement, MouseEvent>,
                    pjTODO: boolean) => void
}

const Token = (
    {hidden, img, pj, pos, imgCoord, handleClick, setContexMenu} : Props) => {
  const handleContextMenu =
  (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setContexMenu(e, true);
  };
  return (
    <>
      <div className='
        bg-blue-100[.8]
      '>
        <img
          onClick={handleClick}
          onContextMenu={(e) => handleContextMenu(e)}
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
              top: `${pos.y* 100}%`,
              left: `${pos.x*100}%`,
            }
          }
        />
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
