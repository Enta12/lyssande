import Input from '../../../components/input';
import InputSelect from '../../../components/inputSelect';
import Title from '../../../components/title';
import React, {useState} from 'react';
import AlignmentInput from './AlignmentInput';
import TextInput from '../../../components/textInput';
import {
  culteMoocked,
  jobsMoocked,
  racesMoocked,
} from '../../../moockedData';
import FileInput from '../../../components/fileInput';


const AddPj = () => {
  const [culte, setCulte] = useState<number | undefined>();
  const [job, setJob] = useState(0);
  const [race, setRace] = useState(0);
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
          <InputSelect
            title={'Metier'}
            options={jobsMoocked}
            handleChange={(newValue) => setJob(newValue)}
            value={job}
          />
          <InputSelect
            title={'Race'}
            options={racesMoocked}
            handleChange={(newValue) => setRace(newValue)}
            value={race}
          />
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
          <InputSelect
            title={'Culte'}
            options={culteMoocked}
            handleChange={(newValue) => setCulte(newValue)}
            value={culte}
          />
          <TextInput />
        </div>
      </form>
    </div>
  );
};

export default AddPj;
