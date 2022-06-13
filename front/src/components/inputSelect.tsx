import React, {useEffect, useRef, useState} from 'react';
import iconOpen from '../assets/openInputSelect.svg';

interface Props {
    width?: string;
    height?: string;
    options: string[];
    title: string;
}

const InputSelect = ({title, options, width= '3/4', height = '12'} : Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [optionSelected, setOptionSelected] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);
  const selectAnOption = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen(false);
    setOptionSelected(e.currentTarget.innerHTML);
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
    <div className={`w-${width} text-brown text-center text-2xl font-inter`}>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`
          m-0
          h-${height}
          ${isOpen? 'rounded-t-2xl' : 'rounded-2xl'}
          flex
          justify-between
          items-center
          px-5
          bg-white
        `}
      >
        {`${title}: ${optionSelected}`}
        <img
          className={isOpen?
            'rotate-180 transition-transform' :
            'transition-transform'}
          src={iconOpen}
          alt="open select"
        />
      </div>
      {options.map((option, index) => <Option
        height={height}
        last={index===options.length-1}
        key={`${title}${index}`}
        name={option}
        display={isOpen}
        selectAnOption={(e) => {
          selectAnOption(e);
        }}
      />)}
      <input readOnly type="hidden" value={optionSelected}/>
    </div>
  );
};

type OptionProps = {
  height: string,
  last: boolean,
  name: string,
  display: boolean,
  selectAnOption: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Option = ({
  height,
  name,
  display,
  selectAnOption,
  last,
} : OptionProps) => {
  const classNames = display?
  `h-${height}
  z-10
  border-t
  flex
  justify-center
  items-center
  ${last?'rounded-b-2xl' : ''}
  bg-white` :
  'hidden';
  return (
    <div className={classNames} onClick={(e) => selectAnOption(e)}>{name}</div>
  );
};

export default InputSelect;
