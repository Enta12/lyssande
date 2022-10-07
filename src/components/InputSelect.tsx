import React, {useState} from 'react';
import iconOpen from 'assets/icon/openInputSelect.svg';
import {useOutsideClicker} from 'hooks';
import cn from 'classnames';

type Props = {
    width?: string;
    height?: string;
    options: string[];
    title?: string;
    handleChange: (value?: number) => void;
    value?: number;
    className?: string;
    emptyValue?: string;
}

const InputSelect = ({
  className = '',
  title,
  options,
  width,
  height,
  handleChange,
  value,
  emptyValue = '',
} : Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useOutsideClicker(() => setIsOpen(false));
  const selectAnOption = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      index?: number,
  ) => {
    e.stopPropagation();
    setIsOpen(false);
    handleChange(index);
  };
  return (
    <div
      className={`
        h-${height || '12'}
        w-${width || '3/4'}
        relative
        text-brown
        text-center
        text-2xl
        font-inter
        ${className}
      `}
      ref={selectRef}
    >
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`
          m-0
          h-${height || '12'}
          ${isOpen? 'rounded-t-2xl' : 'rounded-2xl'}
          flex
          justify-between
          items-center
          px-5
          bg-white
        `}
      >
        {`${title ? `${title} : ` : ''}
        ${(value!== undefined && options[value]) || emptyValue}`}
        <img
          className={isOpen?
            'rotate-180 transition-transform' :
            'transition-transform'}
          src={iconOpen}
          alt="open select"
        />
      </div>
      <div
        className="absolute w-full z-20"
      >
        {options.map((option, index) => <Option
          height={height || '12'}
          last={index===options.length-1}
          key={`${title}${index}`}
          name={option || emptyValue}
          display={isOpen}
          selectAnOption={(e) => {
            selectAnOption(e, index === value ? undefined : index);
          }}
        />)}
      </div>
      <input readOnly type="hidden" value={value ? options[value] : ''}/>
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
  cn(`h-${height}
    border-t
    cursor-pointer
    flex
    justify-center
    items-center
    bg-white`, {['rounded-b-2xl']: last},
  ) :
  'hidden';
  return (
    <div className={classNames} onClick={(e) => selectAnOption(e)}>{name}</div>
  );
};

export default InputSelect;