import React from 'react';
import {CheckInput} from 'components';
import {lawsMoocked, moralsMoocked} from 'moockedData';

type Category = 'moral' | 'law';
type Props = {
    width?: string;
    height?: string;
    moral: number;
    law: number;
    setMoral: (newMoral: number) => void;
    setLaw: (newLaw: number) => void;
}
const status = {
  moral: moralsMoocked,
  law: lawsMoocked,
};


const AlignmentInput = ({
  width= '3/4', moral, law, setLaw, setMoral}
: Props) => {
  const handleChange =
  (newValue: string, category: Category) => {
    let value = -1;
    switch (newValue) {
      case 'GOOD':
        value=0;
        break;
      case 'LAWFUL':
        value=0;
        break;
      case 'NEUTRAL':
        value=1;
        break;
      case 'EVIL':
        value=2;
        break;
      case 'CHAOTIC':
        value=2;
        break;
    }
    if (value !== -1) {
      category === 'law' ? setLaw(value) : setMoral(value);
    }
  };

  return (
    <div className={`
    bg-white
      rounded-2xl
      w-${width}
      p-5
      flex
      flex-col
      justify-between
    `}>
      <span className="mb-4 text-brown text-2xl font-inter">Alignement</span>
      <div className="flex items-center justify-center w-full">
        <Column
          category="moral"
          value={moral}
          onChange={(newValue) => handleChange(newValue, 'moral')}
          left
        />
        <Column
          category="law"
          value={law}
          onChange={(newValue) => handleChange(newValue, 'law')}/>
      </div>

    </div>
  );
};

export default AlignmentInput;

type ColumnProps = {
  left?: boolean,
  category: Category,
  value: number,
  onChange: (value: string) => void
}
const Column = ({
  category,
  value,
  onChange: handleChange,
  left=false,
} : ColumnProps) => {
  return (
    <div className={`
      flex
      flex-col
      justify-between
      w-full
      h-36
      ${left? 'border-r-4 border-orange':'px-5'}
    `}>
      {status[category].map((element, index) =>
        <CheckInput
          key={element}
          name={element}
          onChange={() => handleChange(element)}
          checked={index === value}
        />)}
      <input name={category} value={status[category][value]} type="hidden" />
    </div>
  );
};
