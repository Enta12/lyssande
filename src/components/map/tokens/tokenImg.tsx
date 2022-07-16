
import React from 'react';
import {PjType} from '../../../types';

type Props = {
    setIsGrouping: () => void;
    groupTokens: () => void;
    setPjDrag: () => void;
    pj: PjType;
    handleOnDrag?: (e:(React.DragEvent<HTMLDivElement> |
      React.DragEvent<HTMLImageElement>)) => void;
    handleDragEnd?: () => void;
    handleContextMenu?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) =>
        void;
}

const TokenImg = (
    {
      handleContextMenu,
      groupTokens,
      pj,
      setPjDrag,
      handleOnDrag,
      handleDragEnd,
      setIsGrouping,
    } : Props,
) => {
  return (
    <img
      onContextMenu={(e) => {
        if (handleContextMenu) handleContextMenu(e);
      }}
      onDrop={() => {
        console.log('A');
        groupTokens();
        console.log('AA');
        setIsGrouping();
        console.log('AAA');
      }}
      data-tip
      data-for={`${pj.name}RegisterTip`}
      src={pj.img}
      alt={pj.name}
      onDragStart={setPjDrag}
      onDragEnd={(e) => {
        if (handleDragEnd) handleDragEnd();
        if (handleOnDrag) handleOnDrag(e);
      }}
      className={`
        relative
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
