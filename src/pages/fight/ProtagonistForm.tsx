import React from 'react';
import {Protagonist} from 'types';
import {ReactComponent as TwoHandsIcon} from 'assets/icon/twoHands.svg';
import {PrimaryButton} from 'components';

type Props = {
    protagonist: Protagonist,
    handleChange: (
      protagonist: Protagonist,
      cou: boolean,
      ambidexterity: boolean
    ) => void,
    handleDelete: () => void,
}

const ProtagonistForm = ({protagonist, handleChange, handleDelete}: Props) => {
  const onNameChange = (newValue: string) => {
    const protagonistTemp = protagonist;
    protagonistTemp.name = newValue;
    handleChange(protagonistTemp, false, false);
  };
  const onStatChange = (
      action: 'prd' | 'at' | 'cou' | 'secondAt',
      newValue: number,
  ) => {
    const protagonistTemp = protagonist;
    protagonistTemp[action] = newValue;
    handleChange(protagonistTemp, action==='cou', false);
  };
  const onAmbidextryChange = () => {
    const protagonistTemp = protagonist;
    protagonistTemp.secondAt = protagonistTemp.secondAt ? undefined : 10;
    handleChange(protagonistTemp, false, true);
  };
  return (
    <div
      className='bg-orange p-2 h-56 w-[147px] rounded-2xl'
    >
      <div
        className='
            rounded-2xl
            bg-beige
            text-brown'
      >
        <input
          placeholder='Name'
          type='text'
          onChange={(e) => onNameChange(e.target.value)}
          value={protagonist.name}
          className='
            text-swamp
            my-1
            pb-1
            pl-2
            bg-orange
            font-lg
            font-bold
            w-[134px]
            focus:outline-none'
        />
        <div className="flex justify-between mx-1.5 text-bubblegum">
            COU
          <ProtagonistInput
            type='text'
            handleChange={(e)=>onStatChange('cou', parseInt(e.target.value)||0)}
            value={protagonist.cou}
          />
        </div>
        <div className="flex justify-between items-center mx-1.5 ">
            AT
          <div className="flex justify-between items-center">
            {
              protagonist.secondAt !== undefined &&
              <ProtagonistInput
                type='text'
                handleChange={
                  (e)=>onStatChange('secondAt', parseInt(e.target.value)||0)}
                value={protagonist.secondAt}
              />
            }
            <ProtagonistInput
              type='text'
              handleChange={
                (e)=>onStatChange('at', parseInt(e.target.value)||0)}
              value={protagonist.at}
            />
          </div>
        </div>
        <div className="flex justify-between items-center mx-1.5 ">
            PRD
          <ProtagonistInput
            type='number'
            handleChange={
              (e) => onStatChange('prd', parseInt(e.target.value)||0)}
            value={protagonist.prd}
          />
        </div>
      </div>
      <div className='flex flex-col bg-orange py-1.5 gap-2'>
        <div className='flex justify-end gap-1 '>
          <TwoHandsIcon />
          <div
            onClick={onAmbidextryChange}
            className={`
                cursor-pointer
                w-6
                h-6
                border-4
                ${protagonist.secondAt ?
                  'bg-green-500' : 'bg-brown'}
                border-white
                rounded-lg`}
          />
        </div>
        <PrimaryButton
          onClick={handleDelete}
          text='Suprimer'
          alterButton
          short
          width='32'
          height='7'
        />
      </div>
    </div>
  );
};

export default ProtagonistForm;

const ProtagonistInput = (
    {
      handleChange, type, value,
    }:
  {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type: string,
    value: string | number,
  },
) => {
  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      className='
      text-swamp
        w-5
        bg-transparent
        font-lg
        font-bold
        m-1
        focus:outline-none'
    />
  );
};
