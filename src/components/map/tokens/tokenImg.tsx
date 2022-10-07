
import React from 'react';
import {PcType} from 'types';

type Props = {
    setIsGrouping: () => void;
    groupTokens: () => void;
    setPcDrag: () => void;
    pc: PcType;
    handleOnDrag?: (e:(React.DragEvent<HTMLDivElement> |
      React.DragEvent<HTMLImageElement>)) => void;
    handleDragEnd?: () => void;
}

const TokenImg = (
    {
      groupTokens,
      pc,
      setPcDrag,
      handleOnDrag,
      handleDragEnd,
      setIsGrouping,
    } : Props,
) => {
  return (
    <img
      onDrop={() => {
        groupTokens();
        setIsGrouping();
      }}
      data-tip
      data-for={`${pc.name}RegisterTip`}
      src={pc.img}
      alt={pc.name}
      onDragStart={setPcDrag}
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
