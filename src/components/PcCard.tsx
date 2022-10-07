import {PcType} from 'types';
import React from 'react';

type Props = {
    pcData: PcType;
    onClick?: (
        pcId: string,
        e: React.MouseEvent<HTMLDivElement,
        MouseEvent>) => void
    selectable?: boolean,
    suposed?: boolean,
    selected?: boolean,
}
const PcCard = ({
  selected=false,
  pcData,
  onClick,
  selectable=false,
  suposed=false,
} : Props) => {
  return (
    <div onClick={(e) => {
      onClick && onClick(pcData.id, e);
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
        {pcData.name}
      </div>
      <div className='h-72 border-orange border-y-8 overflow-hidden'>
        <img
          className="
            min-w-full
            min-h-full
            object-cover"
          alt={pcData.name}
          src={pcData.img}
        />
      </div>
      <div className="flex justify-between mx-1.5 font-bubblegum">
        <span>{pcData.race}</span>
        <span>Niveau {pcData.level}</span>
      </div>
    </div>
  );
};

export default PcCard;
