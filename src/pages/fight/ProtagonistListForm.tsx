import React from 'react';
import {Protagonist} from '../../types';
import ProtagonistForm from './ProtagonistForm';
import {ReactComponent as AddIcon} from '../../assets/whiteAdd.svg';
import {Title} from '../../components';

type Props = {
    protagonists: Protagonist[],
    handleaAddProtagonist: (protagonist: Protagonist) => void;
    handleDeleteProtagonist: (index: number) => void;
    handleUpdateProtagonist: (protagonist: Protagonist, index: number) => void;
}

const ProtagonistListForm = ({
  protagonists,
  handleaAddProtagonist,
  handleDeleteProtagonist,
  handleUpdateProtagonist,
}: Props) => {
  const addProtagonist = (npc : boolean) => {
    handleaAddProtagonist({
      name: '',
      at: 10,
      prd: 10,
      cou: 10,
      ambidexterity: false,
      npc,
    });
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
      <Title reverse title={'PJ'}/>
      <div
        className="
          gap-4
          justify-center
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
                (protagonist) => handleUpdateProtagonist(protagonist, index)
              }
              handleDelete={() => handleDeleteProtagonist(index)}
            />
          );
        })}
        <div
          onClick={() => addProtagonist(false)}
          className='
            cursor-pointer
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
