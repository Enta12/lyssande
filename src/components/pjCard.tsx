import {PjType} from '../types';
import React from 'react';

type Props = {
    pjData: PjType;
    onClick?: (
        pjId: string,
        e: React.MouseEvent<HTMLDivElement,
        MouseEvent>) => void
    selectable?: boolean,
    suposed?: boolean,
    selected?: boolean,
}
const PjCard = ({
  selected=false,
  pjData,
  onClick,
  selectable=false,
  suposed=false,
} : Props) => {
  return (
    <div onClick={(e) => {
      onClick && onClick(pjData.id, e);
    }} className={`
      h-96
      w-full
      max-w-[400px]
      border-orange
      border-8
      rounded-2xl
      bg-beige
      text-swamp
      ${selectable && 'cursor-pointer hover:animate-pulse'}
      ${selected && 'animate-pulse'}
      ${suposed && !selected && 'animate-bounce'}
      ${onClick && 'cursor-pointer'}
    `}>
      <div className="
        bg-orange
        my-1
        justify-center
        flex
      ">
        {pjData.name}
      </div>
      <div className='h-72 border-orange border-y-8 overflow-hidden'>
        <img
          className="
            min-w-full
            min-h-full
            object-cover"
          alt={pjData.name}
          src={pjData.img}
        />
      </div>
      <div className="flex justify-between mx-1.5 font-bubblegum">
        <span>{pjData.race}</span>
        <span>Niveau {pjData.level}</span>
      </div>
    </div>
  );
};

export default PjCard;
