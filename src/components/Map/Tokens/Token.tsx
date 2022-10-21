import { GroupData, PcType, Pos } from 'types';
import React from 'react';
import TokenImg from './TokenImg';
import TokenGroups from './TokenGroup';
import ReactTooltip from 'react-tooltip';
import PcCard from 'components/PcCard';

type Style = {
	top: string;
	left: string;
	width?: string;
	height?: string;
	marginTop?: string;
	marginLeft?: string;
};

type Props = {
	onGroup: () => void;
	charactersData?: PcType[];
	pc?: PcType;
	groupData?: GroupData;
	groupTokens: (entityId: number, group?: boolean) => void;
	hidden: boolean;
	showMouvement?: boolean;
	pos: Pos;
	onEntityDrag: (value: { entityId: number; group: boolean }) => void;
	index: number;
	mouvement: number;
	placeEntity: (event: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLImageElement>) => void;
	onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, onPc: boolean) => void;
};

const Token = ({
	charactersData,
	groupData,
	groupTokens,
	hidden,
	pc,
	index,
	pos,
	onContextMenu,
	onGroup: handleGroup,
	placeEntity,
	mouvement,
	showMouvement = true,
	onEntityDrag: handleEntityDrag,
}: Props) => {
	const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		onContextMenu(e, true);
	};
	const style: Style = {
		top: `${pos.y * 100}%`,
		left: `${pos.x * 100}%`,
	};
	if (showMouvement) {
		style.width = `${mouvement * 100}%`;
	} else {
		style.width = '24px';
		style.marginTop = '-12px';
		style.marginLeft = '-12px';
	}

	return (
		<>
			<div
				onContextMenu={(e) => {
					if (handleContextMenu && pc) handleContextMenu(e);
				}}
				onDrag={(e) => e.preventDefault()}
				onDragEnter={(e) => e.preventDefault()}
				onDragOver={(e) => e.preventDefault()}
				onDrop={(e) => {
					e.preventDefault();
					placeEntity(e);
				}}
				className="absolute z-10"
				style={style}
			>
				<div
					className={`
            cursor-grab
            aspect-square
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
          `}
				>
					{pc && (
						<TokenImg
							onGroup={handleGroup}
							groupTokens={() => groupTokens(index)}
							onPcDrag={() => handleEntityDrag({ entityId: index, group: false })}
							pc={pc}
						/>
					)}
					{groupData && (
						<TokenGroups
							onGroup={handleGroup}
							charactersData={charactersData}
							groupTokens={(id: number, group: boolean) => groupTokens(id, group)}
							groupData={groupData}
							onEntityDrag={(value: { entityId: number; group: boolean }) =>
								handleEntityDrag(value)
							}
							index={index}
						/>
					)}
				</div>
			</div>

			{pc && (
				<ReactTooltip
					id={`${pc.name}RegisterTip`}
					place="right"
					effect="solid"
					backgroundColor="none"
					delayShow={500}
				>
					<PcCard pcData={pc} />
				</ReactTooltip>
			)}
		</>
	);
};

export default Token;
