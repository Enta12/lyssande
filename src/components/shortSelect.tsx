import {ReactComponent as OpenIcon} from '../assets/openInputSelect.svg';
import {useEffect, useRef, useState} from 'react';
import React from 'react';


type Props ={
    options : string[];
    value: number[];
    showValue?: boolean;
    textEmpty?: string;
    handleChange: (values : number) => void
}

const ShortSelect = ({
  showValue,
  textEmpty,
  options,
  handleChange,
  value}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLInputElement>(null);
  const handleClick = (index: number) => {
    setIsOpen(false);
    handleChange(index);
  };
  useEffect(() => {
    const onClickOutside = () => {
      setIsOpen(false);
    };
    const handleClickOutside = (event: any) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [selectRef]);
  return (
    <div ref={selectRef} className="relative">
      <div
        className="flex justify-between p-1.5 bg-slate-300 w-64 rounded-lg"
        onClick={() =>setIsOpen(!isOpen)}
      >
        <span className='text-swamp'>
          {showValue? options[value[0]]: textEmpty}
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
