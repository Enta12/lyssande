import React, {ChangeEvent, useState} from 'react';
import {PrimaryButton, Title} from '../../components';
import {FightPhaseData, Protagonist} from '../../types';
import FightLine from './fightLine';
import ProtagonistListForm from './ProtagonistListForm';

const FightPage = () => {
  const [protagonistList, setProtagonistList] =
    useState<Protagonist[]>([]);
  const [fightElementData, setFightElementData] =
    useState<FightPhaseData[]>([]);
  const [turnSelected, setTurnSelected] = useState(0);

  const nextSelected = () => {
    if (fightElementData.length) {
      if (turnSelected + 1 === fightElementData.length) {
        setTurnSelected(0);
      } else setTurnSelected(turnSelected + 1);
    }
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
  const getOrderIndex = (index: number, lenght: number) => {
    const test = turnSelected + index < lenght ?
        turnSelected + index :
        turnSelected + index - lenght;
    console.log('test', lenght);
    return test;
  };
  const updateProtagonists = (
      action: 'add' | 'update' | 'delete',
      protagonist?: Protagonist,
      index?: number,
  ) => {
    let protagonistsTemp = [...protagonistList];
    const fightElementDataTemp = [...fightElementData];
    if (action === 'add' && protagonist) {
      protagonistsTemp.push(protagonist);
      fightElementDataTemp.push({
        protagonistA: protagonistsTemp.length-1,
        protagonistB: protagonistsTemp.length-1,
        local: 'random',
      });
    } else if (action === 'update' && protagonist && index !== undefined) {
      protagonistsTemp[index] = protagonist;
    } else if (action === 'delete' && index !== undefined) {
      protagonistsTemp = protagonistsTemp.filter(
          (protagonist, currentIndex) => index !== currentIndex);
      fightElementDataTemp.forEach((data) => {
        if (data.protagonistA === index) data.protagonistA = data.protagonistB;
        else if (data.protagonistB === index) {
          data.protagonistB = data.protagonistA;
        }
        if (data.protagonistA > index) data.protagonistA--;
        if (data.protagonistB > index) data.protagonistB--;
      });
      // update all fight elemnt where prota > index
    }
    // on delete and add check if turn have start and edit turn if it needed
    setFightElementData(fightElementDataTemp);
    setProtagonistList(protagonistsTemp);
  };


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
      <div className='flex-col mx-7 gap-2 flex min-w-[856px]'>
        <Title title={'Combat'} />
        {
          fightElementData.map( (data, index) => {
            return (
              <>
                <FightLine
                  firstLine={!index}
                  protagonistList={protagonistList}
                  data={
                    fightElementData[
                        getOrderIndex(index, fightElementData.length)
                    ]
                  }
                  handleChange={handleChange}
                  handleSupress={handleSupress}
                  index={getOrderIndex(index, fightElementData.length)}
                  key={getOrderIndex(index, fightElementData.length)}
                />
                {
                  !index &&
                  <PrimaryButton
                    className="ml-60"
                    onClick={nextSelected}
                    text='Tour suivant'
                  />
                }
              </>

            );
          })
        }
        {
          /* fightTurnSorted.filter((data, index) => index > 0) */
        }
        <button onClick={addFightElement}>Ajouter un tour</button>
        {/* <button onClick = {filterByCourage}>Filtrer par courage</button> */}
      </div>
      <ProtagonistListForm
        protagonists={protagonistList}
        handleaAddProtagonist={
          (protagonist: Protagonist) => updateProtagonists('add', protagonist)}
        handleDeleteProtagonist={
          (index) => updateProtagonists('delete', undefined, index)}
        handleUpdateProtagonist={
          (protagonist, index) =>
            updateProtagonists('update', protagonist, index)}
      />
    </div>
  );
};

export default FightPage;
