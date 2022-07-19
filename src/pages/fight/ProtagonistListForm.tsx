import React from 'react';
import {Protagonist} from '../../types';
import ProtagonistForm from './ProtagonistForm';
import {ReactComponent as AddIcon} from '../../assets/whiteAdd.svg';
import {Title} from '../../components';

type Props = {
    protagonists: Protagonist[],
    setProtagonistList: React.Dispatch<React.SetStateAction<Protagonist[]>>
}

const ProtagonistListForm = ({protagonists, setProtagonistList}: Props) => {
  const addProtagonist = (npc : boolean) => {
    const protagonistListTemp = [...protagonists];
    protagonistListTemp.push({
      name: 'name',
      at: 10,
      prd: 10,
      cou: 10,
      ambidexterity: false,
      npc,
    });
    setProtagonistList(protagonistListTemp);
  };
  const updateProtagonist =
    (index: number, newProtagoniste: Protagonist) => {
      const protagonistListTemp = [...protagonists];
      protagonistListTemp[index] = newProtagoniste;
      setProtagonistList([...protagonistListTemp]);
    };
  return (
    <div
      className="
        gap-4
        flex
        flex-col
        flex-1
        p-4
        bg-darkBrown
        rounded-l-xl"
    >
      <Title title={'PJ'}/>
      <div
        className="
          gap-4
          grid
          auto-rows-min
          auto-cols-[40px]
          grid-cols-auto-fit-140"
      >
        {protagonists.map((protagonist, index) => {
          return (
            <ProtagonistForm
              key={index}
              protagonist={protagonist}
              handleChange={
                (protagonist) => updateProtagonist(index, protagonist)
              }
            />
          );
        })}
        <div
          onClick={() => addProtagonist(false)}
          className='
            border-dashed
            h-[224px]
            w-[147px]
            border-orange
            border-4
            rounded-2xl
            flex
            pt-12
            text-xl
            text-orange
            items-center
            flex-col'
        >
          <AddIcon/>
          Ajouter un Pj
        </div>
      </div>
    </div>
  );
};

export default ProtagonistListForm;
