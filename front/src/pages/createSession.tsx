import React, {useState} from 'react';
import {ShortSelect} from '../components';
import PjSessionSelector from '../components/pjSessionSelector';
import PrimaryButton from '../components/primary-button';
import {pjsMoocked, playerMoocked} from '../moockedData';

const CreateSession = () => {
  const players = playerMoocked;
  const pjs = pjsMoocked;
  const [selectedPjs, setSelectedPjs] = useState<number[]>([]);
  const [lastQuest, setLastQuest] = useState(-1);
  const [selectedDate, setSelectedDate] = useState(0);
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
  const handleChange = (value : number) => {
    setSelectedDate(value);
  };
  const dates = ['22/23 journnée', '24/23 journnée'];
  return (
    <div className="w-full flex items-center flex-col gap-4">
      <span className='
        w-full
        flex
        font-bubblegum
        text-brown
        items-center
        gap-5
        text-lg
      '>
        Selectionner la date
        <ShortSelect
          showValue
          options={dates}
          handleChange={handleChange}
          value={[selectedDate]}
        />
      </span>
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
