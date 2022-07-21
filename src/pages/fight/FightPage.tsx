import React, {useState} from 'react';
import {PrimaryButton, Title} from '../../components';
import {locals} from '../../moockedData';
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
      local: 0,
    });
    setFightElementData(fightElementDataTemp);
  };
  const handleSupress = (indexToSupress : number) => {
    const fightElementDataTemp = fightElementData.filter((el, index) => {
      return index !== indexToSupress;
    });
    setFightElementData(fightElementDataTemp);
  };
  const updateProtagonistB = (
      index: number,
      newProtagonistB: number,
  ) => {
    const fightElementDataTemp = [...fightElementData];
    fightElementDataTemp[index].protagonistB = newProtagonistB;
    setFightElementData(fightElementDataTemp);
  };
  const updateLocal = (
      index: number,
      newLocal: number,
  ) => {
    const fightElementDataTemp = [...fightElementData];
    fightElementDataTemp[index].local = newLocal;
    setFightElementData(fightElementDataTemp);
  };
  const getOrderIndex = (index: number, lenght: number) => {
    const test = turnSelected + index < lenght ?
        turnSelected + index :
        turnSelected + index - lenght;
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
        protagonistB: 0,
        local: locals.length-1,
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
              <React.Fragment key={index}>
                <FightLine
                  firstLine={!index}
                  protagonistList={protagonistList}
                  data={
                    fightElementData[
                        getOrderIndex(index, fightElementData.length)
                    ]
                  }
                  updateProtagonistB={
                    (newProtagonistB) =>
                      updateProtagonistB(
                          getOrderIndex(index, fightElementData.length),
                          newProtagonistB,
                      )
                  }
                  updateLocal={
                    (newLocal) => updateLocal(
                        getOrderIndex(index, fightElementData.length),
                        newLocal,
                    )}
                  handleSupress={handleSupress}
                  index={getOrderIndex(index, fightElementData.length)}
                />
                {
                  !index &&
                  <PrimaryButton
                    className="ml-60"
                    onClick={nextSelected}
                    text='Tour suivant'
                  />
                }
              </React.Fragment>

            );
          })
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
