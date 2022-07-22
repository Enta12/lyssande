import React from 'react';
import {Protagonist} from '../../types';
import ProtagonistForm from './ProtagonistForm';
import {ReactComponent as AddIcon} from '../../assets/whiteAdd.svg';
import {Title} from '../../components';

type Props = {
    protagonists: Protagonist[],
    handleaAddProtagonist: (protagonist: Protagonist) => void;
    handleDeleteProtagonist: (index: number) => void;
    handleUpdateProtagonist: (
      protagonist: Protagonist, index: number, cou: boolean) => void;
    protagonistsLenght: number;
}

const ProtagonistListForm = ({
  protagonists,
  protagonistsLenght,
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
      id: protagonistsLenght,
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
          gap-x-8
          gap-y-4
          justify-center
          grid
          auto-rows-min
          auto-cols-[40px]
          grid-cols-auto-fit-140"
      >
        {protagonists.sort((a, b) => a.id - b.id)
            .map((protagonist, index) => !protagonist.npc ?
                <ProtagonistForm
                  key={index}
                  protagonist={protagonist}
                  handleChange={
                    (
                        protagonist,
                        cou) => handleUpdateProtagonist(protagonist, index, cou)
                  }
                  handleDelete={() => handleDeleteProtagonist(index)}
                /> :
                <React.Fragment key={index}></React.Fragment>,
            )}
        <AddProtagonist addProtagonist={addProtagonist} />
      </div>
      <Title className='mx-auto' reverse subtitle title={'VS'}/>
      <div
        className="
          gap-x-8
          gap-y-4
          justify-center
          grid
          auto-rows-min
          auto-cols-[40px]
          grid-cols-auto-fit-140"
      >
        {protagonists.sort((a, b) => a.id - b.id)
            .map((protagonist, index) => protagonist.npc ?
                <ProtagonistForm
                  key={index}
                  protagonist={protagonist}
                  handleChange={
                    (
                        protagonist,
                        cou) => handleUpdateProtagonist(protagonist, index, cou)
                  }
                  handleDelete={() => handleDeleteProtagonist(index)}
                /> :
                <React.Fragment key={index}></React.Fragment>,
            )}
        <AddProtagonist addProtagonist={addProtagonist} npc />
      </div>
    </div>
  );
};

export default ProtagonistListForm;

const AddProtagonist = (
    {addProtagonist, npc = false}:
    {addProtagonist :(npc: boolean) => void, npc?: boolean},
) => {
  return (
    <div
      onClick={() => addProtagonist(npc)}
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
        flex-col
        text-center'
    >
      <AddIcon/>
      Ajouter un {npc? 'adversaire' : 'PJ'}
    </div>
  );
};

