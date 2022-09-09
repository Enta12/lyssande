import {ReactComponent as OpenIcon} from '../assets/openInputSelect.svg';
import {useState} from 'react';
import React from 'react';
import {useOutsideClicker} from '../hook';


type Props ={
    options : string[];
    value: number[];
    showValue?: boolean;
    textEmpty?: string;
    handleChange: (values : number) => void
    width?: string;
}

const ShortSelect = ({
  width = '64',
  showValue,
  textEmpty,
  options,
  handleChange,
  value}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useOutsideClicker(() => setIsOpen(false));
  const handleClick = (index: number) => {
    setIsOpen(false);
    handleChange(index);
  };
  return (
    <div ref={selectRef} className="relative">
      <div
        className={`
          flex
          justify-between
          p-1.5
          bg-slate-300
          w-${width}
          rounded-lg`
        }
        onClick={() =>setIsOpen(!isOpen)}
      >
        <span className='text-swamp'>
          {showValue && value.length? options.filter(
              (el, index) => value.includes(index)).reduce(
              (a, b) => a.concat(' ', b), ''): textEmpty}
        </span>
        <OpenIcon
          className={
            isOpen?
            'rotate-180 transition-transform' :
            'transition-transform'}
        />
      </div>
      <div
        className={`
          text-brown
          bg-slate-50
          rounded-lg
          w-full
          absolute
          ${!isOpen && 'hidden'} z-20`
        }>
        {options.map((option, index) => {
          return (
            <div
              onClick={(e) => handleClick(index)}
              key={index}
              className={
                `${value.some((selectedPj) =>
                  selectedPj === index) && 'bg-blue-400'}
                p-1.5
                cursor-pointer
                ${index=== 0 && 'rounded-t-lg'} 
              ${index=== options.length-1 && 'rounded-b-lg'}`}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ShortSelect;
