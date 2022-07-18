import React, {ChangeEvent, useEffect, useState} from 'react';
import {PrimaryButton, Title} from '../../components';
import {FightPhaseData, Protagonist} from '../../types';
import FightLine from './fightLine';
import ProtagonistListForm from './ProtagonistListForm';

const protaTest = {
  name: 'fluffy',
  at: 12,
  prd: 12,
  cou: 13,
};

const FightPage = () => {
  const [fightTurnSorted, setFightTurnSorted] = useState<JSX.Element[]>([]);
  const [protagonistList, setProtagonistList] =
    useState<Protagonist[]>([protaTest]);
  const [fightElementData, setFightElementData] =
    useState<FightPhaseData[]>([]);
  const [turnSelected, setTurnSelected] = useState(0);
  const nextSelected = () => {
    if (turnSelected + 1 === fightElementData.length) {
      setTurnSelected(0);
    } else setTurnSelected(turnSelected + 1);
  };
  /* const filterByCourage = () => {
    const fightElementDataTemp = [...fightElementData];
    fightElementDataTemp.sort((a, b) => {
      return protagonistList[b.protagonistA].cou -
        protagonistList[a.protagonistA].cou;
    });
    setFightElementData(fightElementDataTemp);
  }; */
  const addFightElement = () => {
    const fightElementDataTemp = [...fightElementData];
    fightElementDataTemp.push({
      protagonistA: 0,
      protagonistB: 0,
      local: 'torso',
    });
    setFightElementData(fightElementDataTemp);
  };
  const handleSupress = (indexToSupress : number) => {
    const fightElementDataTemp = fightElementData.filter((el, index) => {
      return index !== indexToSupress;
    });
    setFightElementData(fightElementDataTemp);
  };
  const handleChange = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    const fightElementDataTemp = [...fightElementData];
    if (e.target.name === 'protagonistA' || e.target.name === 'protagonistB') {
      fightElementDataTemp[index][e.target.name] = parseInt(e.target.value);
    }
    if (e.target.name === 'local' && (
      e.target.value === 'torso' ||
             e.target.value === 'head' ||
             e.target.value === 'arm' ||
             e.target.value === 'swordArm' ||
             e.target.value === 'leg' ||
             e.target.value === 'random' ||
             e.target.value === 'genitals')) {
      fightElementDataTemp[index][e.target.name] = e.target.value;
    }
    setFightElementData(fightElementDataTemp);
  };
  useEffect(()=> {
    const fightTurnSortedTemp: JSX.Element[] = [];
    let backToStart = 0;
    fightElementData.forEach((element, index) => {
      if (!(turnSelected + index < fightElementData.length)) {
        backToStart = index + turnSelected;
      }
      const turnIndex = index + turnSelected - backToStart;
      fightTurnSortedTemp.push(
          <FightLine
            protagonistList={protagonistList}
            data={fightElementData[turnIndex]}
            handleChange={handleChange}
            handleSupress={handleSupress}
            index={turnIndex}
            key={turnIndex}
          />,
      );
    });
    setFightTurnSorted([...fightTurnSortedTemp]);
  }, [fightElementData, turnSelected, protagonistList]);

  return (
    <div
      className='
        py-7
        flex
        absolute
        w-screen
        top-[112px]
        left-0'
    >
      <div className='flex-1 flex-col px-7 gap-2 flex'>
        <Title title={'Combat'} />
        {
          fightTurnSorted[0]
        }
        <PrimaryButton
          className="ml-60"
          onClick={nextSelected}
          text='Tour suivant'
        />
        {
          fightTurnSorted.filter((data, index) => index > 0)
        }
        <button onClick={addFightElement}>Ajouter un tour</button>
        {/* <button onClick = {filterByCourage}>Filtrer par courage</button> */}
      </div>
      <div className='bg-darkBrown w-537 rounded-l-xl'>
        <ProtagonistListForm
          protagonistList={protagonistList}
          setProtagonistList={setProtagonistList}
        />
      </div>
    </div>
  );
};

export default FightPage;
