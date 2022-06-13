import {Input, InputSelect, Title, TextInput} from '../../../components';
import React from 'react';
import AlignmentInput from './AlignmentInput';
import {
  culteMoocked,
  jobsMoocked,
  racesMoocked,
} from '../../../moockedData';
import FileInput from '../../../components/fileInput';


const AddPj = () => {
  return (
    <div className="
      p-8
      flex
      flex-col
      bg-orange/[.8]
      w-full
      rounded-3xl
      justify-around
      items-center
    ">
      <Title title="CREATIION D'UN PERSONNAGE"/>
      <form className='pt-8 w-full flex justify-between'>
        <div className='
          flex
          flex-col
          gap-4
          justify-between
          items-center
          flex-1
        '>
          <Input placeholder="Nom du personnage" type="text"/>
          <InputSelect title={'Classe'} options={jobsMoocked}/>
          <InputSelect title={'Race'} options={racesMoocked}/>
          <Input placeholder="Niveau du personnage" type="number"/>
          <Input placeholder="Nombre de PO" type="number"/>
          <FileInput text="PHOTO" />
        </div>
        <div className='
          flex
          flex-col
          gap-4
          justify-around
          flex-1
          h-full
        '>
          <AlignmentInput />
          <InputSelect title={'Culte'} options={culteMoocked}/>
          <TextInput />
        </div>
      </form>
    </div>
  );
};

export default AddPj;
