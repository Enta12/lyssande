import React from 'react';
import { PcType } from 'types';

type Props = {
	onGroup: () => void;
	groupTokens: () => void;
	onPcDrag: () => void;
	pc: PcType;
	onDrag?: (e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLImageElement>) => void;
	onDragEnd?: () => void;
};

const TokenImg = ({
	groupTokens,
	pc,
	onPcDrag: handlePcDrag,
	onDrag: handleDrag,
	onDragEnd: handleDragEnd,
	onGroup: handleGroup,
}: Props) => {
	return (
		<img
			onDrop={() => {
				groupTokens();
				handleGroup();
			}}
			data-tip
			data-for={`${pc.name}RegisterTip`}
			src={pc.img}
			alt={pc.name}
			onDragStart={handlePcDrag}
			onDragEnd={(e) => {
				if (handleDragEnd) handleDragEnd();
				if (handleDrag) handleDrag(e);
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
