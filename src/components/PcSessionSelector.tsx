import React, {useState} from 'react';
import {PcType, Platform} from 'types';
import PcCard from './PcCard';
import availabilityIrl from 'assets/icon/availabilityIrl.svg';
import availabilityIl from 'assets/icon/availabilityIl.svg';
import UnfoldingCard from './UnfoldingCard';

type Props = {
    pcs: PcType[];
    playerName: string;
    selectedPc: string | null;
    playerIndex: number;
    setSelectedPc: (playerIndex: number, pcID: string) => void;
    quest: string;
    disable?: boolean;
    platform: Platform;
}

const PcSessionSelector = ({
  quest,
  pcs,
  playerName,
  selectedPc,
  setSelectedPc,
  playerIndex,
  disable= false,
  platform,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick= (
      pcIndex: string,
      e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setSelectedPc(playerIndex, pcIndex);
    setIsOpen(false);
    e.stopPropagation();
  };
  const selectedPcData = pcs.filter((pc) => pc.id === selectedPc)[0];
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
                <img src={availabilityIrl} alt="IRL"/>
              }
              {(platform === 'irl-or-online' || platform === 'online') &&
                  <img src={availabilityIl} alt="en ligne"/>
              }
            </div>
          </div>
          <div className="flex justify-end gap-28">
            {selectedPc &&
              <SelectedPc
                level={selectedPcData.level}
                name={selectedPcData.name} />
            }
          </div>
        </div>
      }
    >
      <div className="
        grid
        grid-cols-auto-fill-220
        grid-flow-rows
        gap-5
        w-full"
      >
        {pcs.map((pcData, index) =>
          <PcCard
            selected={pcData.id === selectedPc}
            suposed={quest === pcData.quest}
            onClick={handleClick}
            selectable key={index}
            pcData={pcData}
          />,
        )}
      </div>
    </UnfoldingCard>
  );
};

export default PcSessionSelector;

const SelectedPc = ({name, level}: {name: string, level: number}) => {
  return (
    <div className="flex gap-10 items-center">
      <div className="flex flex-col w-fit items-center">
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
