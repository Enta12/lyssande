import React, {useState} from 'react';
import {PrimaryButton, Title} from '../../components';
import {locals} from '../../moockedData';
import {FightPhaseData, Protagonist} from '../../types';
import FightLine from './fightLine';
import ProtagonistListForm from './ProtagonistListForm';
import {
  ReactComponent as BlowUpButtonRight,
} from '../../assets/blowUpBoutonRight.svg';
import {
  ReactComponent as BlowUpButtonLeft,
} from '../../assets/blowUpBoutonLeft.svg';

const FightPage = () => {
  const [protagonistList, setProtagonistList] =
    useState<Protagonist[]>([]);
  const [haveStart, setHaveStart] =
    useState(false);
  const [fightElementData, setFightElementData] =
    useState<FightPhaseData[]>([]);
  const [turnSelected, setTurnSelected] = useState(0);
  const [protagonistsLenght, setProtagonistsLenght] = useState(0);

  const nextSelected = () => {
    if (fightElementData.length) {
      if (turnSelected + 1 === fightElementData.length) {
        setTurnSelected(0);
      } else setTurnSelected(turnSelected + 1);
    }
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
  const supressToken = (
      protagonistsTemp: Protagonist[],
      fightElementDataTemp: FightPhaseData[],
      index: number,
  ) => {
    protagonistsTemp.splice(index, 1);
    fightElementDataTemp.splice(index, 1);
    fightElementDataTemp.forEach((data) => {
      if (data.protagonistB === index) {
        data.protagonistB = data.protagonistA;
      }
      if (data.protagonistA > index) data.protagonistA--;
      if (data.protagonistB > index) data.protagonistB--;
    });
    if (
      !protagonistsTemp.some((elt) => !elt.npc) ||
      !protagonistsTemp.some((elt) => elt.npc)) {
      setTurnSelected(0);
      setHaveStart(false);
    }
  };
  const addTurnIntoCorrectPlace = (
      protagonist: Protagonist,
      protagonistsTemp : Protagonist[],
      fightElementDataTemp: FightPhaseData[],
  ) => {
    let isAdd = false;
    let newIndex: number;
    for (let i = 0; i<fightElementDataTemp.length; i++) {
      const currentIndex = getOrderIndex(i, fightElementData.length);
      if (
        protagonist.cou > protagonistList[currentIndex].cou) {
        newIndex = (!i && haveStart) ? currentIndex+1 : currentIndex;
        protagonistsTemp.splice(newIndex, 0, protagonist);
        fightElementDataTemp.splice(newIndex, 0, {
          protagonistA: newIndex,
          protagonistB: 0,
          local: locals.length-1,
        });
        isAdd = true;
        break;
      }
    }
    if (!isAdd) {
      protagonistsTemp.push(protagonist);
      fightElementDataTemp.push({
        protagonistA: protagonistsTemp.length-1,
        protagonistB: 0,
        local: locals.length-1,
      });
    }
    fightElementDataTemp.forEach((elt, index) => {
      if (elt.protagonistA > newIndex && index !== newIndex) {
        elt.protagonistA++;
      }
      if (elt.protagonistB === -1) {
        elt.protagonistB = newIndex || protagonistList.length-1;
      }
    });
  };
  const updateProtagonists = (
      action: 'add' | 'update' | 'delete',
      protagonist?: Protagonist,
      index?: number,
      cou?: boolean,
  ) => {
    const protagonistsTemp = [...protagonistList];
    const fightElementDataTemp = [...fightElementData];
    if (action === 'add' && protagonist) {
      addTurnIntoCorrectPlace(
          protagonist,
          protagonistsTemp,
          fightElementDataTemp,
      );
    } else if (
      action === 'update' &&
      protagonist &&
      index !== undefined ) {
      if (cou) {
        fightElementDataTemp.forEach((elt) => {
          if (elt.protagonistB === index) elt.protagonistB = -1;
        });
        supressToken(protagonistsTemp, fightElementDataTemp, index);
        addTurnIntoCorrectPlace(
            protagonist,
            protagonistsTemp,
            fightElementDataTemp,
        );
      } else {
        protagonistsTemp[index] = protagonist;
      }
    } else if (action === 'delete' && index !== undefined) {
      supressToken(protagonistsTemp, fightElementDataTemp, index);
    }
    setFightElementData(fightElementDataTemp);
    setProtagonistList(protagonistsTemp);
  };


  return (
    <div
      className={
        `${haveStart ? 'absolute top-[112px]' : 'relative'}
        py-7
        flex
        w-screen
        left-0`}
    >
      <div className='flex-col mx-7 flex min-w-[856px] gap-4'>
        <Title title={'Combat'} />
        {
          !haveStart &&
          protagonistList.some((elt) => !elt.npc) &&
          protagonistList.some((elt) => elt.npc) &&
          <div className='mx-auto relative mb-6'>
            <BlowUpButtonLeft
              className='
                absolute
                top-[-26px]
                left-[-70px]
                h-[141px]
                w-[175px]'
            />
            <PrimaryButton
              className='relative z-10'
              text='Commencer le combat'
              onClick={() => setHaveStart(true)}
            />
            <BlowUpButtonRight
              className='absolute
                        top-[-26px]
                        right-[-70px]
                        h-[141px]
                        w-[175px]'
            />
          </div>
        }
        {
          fightElementData.map( (data, index) => {
            return (
              <React.Fragment key={index}>
                <FightLine
                  firstLine={!index && haveStart}
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
                  !index && haveStart &&
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
      </div>
      <ProtagonistListForm
        protagonistsLenght={protagonistsLenght}
        protagonists={protagonistList}
        handleaAddProtagonist={
          (protagonist: Protagonist) => {
            updateProtagonists('add', protagonist);
            setProtagonistsLenght(protagonistsLenght+1);
          }}
        handleDeleteProtagonist={
          (index) => updateProtagonists('delete', undefined, index)}
        handleUpdateProtagonist={
          (protagonist, index, cou) =>
            updateProtagonists('update', protagonist, index, cou)}
      />
    </div>
  );
};

export default FightPage;
