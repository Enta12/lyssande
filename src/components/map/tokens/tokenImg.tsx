
import React from 'react';
import {PjType} from '../../../types';

type Props = {
    groupTokens: () => void;
    setPjDrag: () => void;
    pj: PjType;
    handleOnDrag: (e: React.DragEvent<HTMLImageElement>) => void

}

const TokenImg = (
    {
      groupTokens,
      pj,
      setPjDrag,
      handleOnDrag,
    } : Props,
) => {
  return (
    <img
      onDrop={() => {
        groupTokens();
      }}
      data-tip
      data-for={`${pj.name}RegisterTip`}
      src={pj.img}
      alt={pj.name}
      onDragStart={setPjDrag}
      onDragEnd={(e) => {
        handleOnDrag(e);
      }}
      className={`
        absolute
        h-6
        w-6
        object-cover
        rounded-xl
        border
        border-black
        z-30
      `}
    />
  );
};

export default TokenImg;
