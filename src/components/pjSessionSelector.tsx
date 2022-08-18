import React, {useState} from 'react';
import {PjType, Platform} from '../types';
import PjCard from './pjCard';
import availabilityIrl from '../assets/availabilityIrl.svg';
import availabilityIl from '../assets/availabilityIl.svg';
import UnfoldingCard from './UnfoldingCard';

type Props = {
    pjs: PjType[];
    playerName: string;
    selectedPj: string | null;
    playerIndex: number;
    setSelectedPj: (playerIndex: number, pjID: string) => void;
    quest: number;
    disable?: boolean;
    platform: Platform;
}

const PjSessionSelector = ({
  quest,
  pjs,
  playerName,
  selectedPj,
  setSelectedPj,
  playerIndex,
  disable= false,
  platform,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick= (
      pjIndex: string,
      e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setSelectedPj(playerIndex, pjIndex);
    setIsOpen(false);
    e.stopPropagation();
  };
  const selectedPjData = pjs.filter((pj) => pj.id === selectedPj)[0];
  return (
    <UnfoldingCard
      isOpen={isOpen}
      handleOpen={setIsOpen}
      header={
        <div className='flex justify-between flex-1'>
          <div className='flex items-center gap-3'>
            {playerName}
            <div className='flex gap-2'>
              {(platform === 'irl-or-online' || platform === 'just-irl') &&
                <img src={availabilityIrl} alt="en vraie"/>
              }
              {(platform === 'irl-or-online' || platform === 'online') &&
                  <img src={availabilityIl} alt="en ligne"/>
              }
            </div>
          </div>
          <div className="flex justify-end gap-28">
            {selectedPj &&
              <SelectedPj
                level={selectedPjData.level}
                name={selectedPjData.name} />
            }
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-4 grid-flow-rows gap-5 w-[62rem]">
        {pjs.map((pjData, index) =>
          <PjCard
            selected={pjData.id === selectedPj}
            suposed={quest === pjData.quest}
            onClick={handleClick}
            selectable key={index}
            pjData={pjData}
          />,
        )}
      </div>
    </UnfoldingCard>
  );
};

export default PjSessionSelector;

const SelectedPj = ({name, level}: {name: string, level: number}) => {
  return (
    <div className="flex gap-10 items-center">
      <div className="flex flex-col w-24 items-center">
        <div className="w-full h-1 rounded-t-full bg-orange" />
        {name}
        <div className="w-full h-1 rounded-b-full bg-orange" />
      </div>
      <div>
        {`NIVEAU ${level}`}
      </div>
    </div>

  );
};
