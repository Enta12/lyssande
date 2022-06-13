import React, {useState} from 'react';
import {PjSessionSelector, PrimaryButton} from '../components';
import {pjsMoocked, playerMoocked} from '../moockedData';

const CreateSession = () => {
  const players = playerMoocked;
  const pjs = pjsMoocked;
  const [selectedPjs, setSelectedPjs] = useState<number[]>([]);
  const [lastQuest, setLastQuest] = useState(-1);
  const setSelectedPj = (playerIndex: number, pjIndex: number ) => {
    const selectedPjsTemp = [...selectedPjs];
    selectedPjsTemp[playerIndex] = pjIndex;
    setSelectedPjs(selectedPjsTemp);
    setLastQuest(selectedPjs.some(
        (element) => (
          pjs[element].quest !== pjs[pjIndex].quest &&
                    pjs[pjIndex].quest !== undefined &&
                    pjs[element].quest !== undefined)) ?
                -1 :
                (pjs[pjIndex].quest || lastQuest ));
  };
  return (
    <div className="w-full flex items-center flex-col gap-4">
      {players.map((player, index) => {
        return (
          <PjSessionSelector
            quest={lastQuest}
            selectedPj={selectedPjs[index]}
            setSelectedPj={setSelectedPj}
            playerIndex={index}
            key={index}
            pjs={pjs.filter((pj) => pj.player === player.id)}
            playerName={player.name} />
        );
      })}
      <PrimaryButton text={'Create Session'} />
    </div>
  );
};

export default CreateSession;
