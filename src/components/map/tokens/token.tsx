import {GroupData, PjType, Pos} from '../../../types';
import React from 'react';
import TokenImg from './tokenImg';
import TokenGroups from './tokenGroup';
/* import ReactTooltip from 'react-tooltip';
import PjCard from '../pjCard'; */

type Style = {
  top: string;
  left: string;
  width?: string;
  height?: string;
  marginTop?: string;
  marginLeft?: string;
};
type Props = { /* TODO sort */
    ungroupToken?: (value: number) => void;
    charactersData?: PjType[]
    pj?: PjType;
    groupData?: GroupData;
    groupTokens: (entityId: number, group?: boolean)
        => void
    hidden: boolean;
    showMouvement?: boolean;
    pos: Pos;
    setEntityDrag: (value: {entityId: number, group: boolean}) => void;
    index: number;
    mouvement: number;
    placeEntity: (
      entitySelected: number,
      event: (React.DragEvent<HTMLDivElement> |
        React.DragEvent<HTMLImageElement>),
      group: boolean) => void
    setContexMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>,
                    onPj: boolean) => void;
}

const Token = ({
  ungroupToken,
  charactersData,
  groupData,
  groupTokens,
  hidden,
  pj,
  index,
  pos,
  placeEntity,
  setContexMenu,
  mouvement,
  showMouvement = true,
  setEntityDrag,
} : Props) => {
  const handleContextMenu =
  (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setContexMenu(e, true);
  };
  const style: Style = {
    top: `${pos.y* 100}%`,
    left: `${pos.x*100}%`,
  };
  if (showMouvement) {
    style.width = `${mouvement*100}%`;
  } else {
    style.width = '24px';
    style.marginTop = '-12px';
    style.marginLeft = '-12px';
  }

  return (
    <>
      <div
        onDrag={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        className='absolute z-10'
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
          {
            pj &&
              <TokenImg
                handleContextMenu={handleContextMenu}
                groupTokens={() => groupTokens(index)}
                setPjDrag={() => setEntityDrag({entityId: index, group: false})}
                pj={pj}
                handleOnDrag={(e) => placeEntity(index, e, false)}
              />
          }
          {
            groupData &&
              <TokenGroups
                ungroupToken={(value: number) => {
                  if (ungroupToken) ungroupToken(value);
                }}
                charactersData={charactersData}
                groupTokens={(id: number, group: boolean) =>
                  groupTokens(id, group)}
                groupData={groupData}
                setEntityDrag={(value : {entityId: number, group: boolean}) =>
                  setEntityDrag(value)
                }
                placeEntity={placeEntity}
                index={index}
              />
          }
        </div>
      </div>

      {
        /*
        <ReactTooltip
        id={`${pj.name}RegisterTip`}
        place='right'
        effect='solid'
        backgroundColor='none'
        delayShow={500}
      >
        <PjCard pjData={pj} />
      </ReactTooltip>*/
      }
    </>
  );
};

export default Token;
