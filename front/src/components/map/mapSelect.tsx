import {Player} from '../../types';
import {ReactComponent as OpenIcon} from '../../assets/openInputSelect.svg';
import {useEffect, useRef, useState} from 'react';
import React from 'react';


type Props ={
    players : Player[];
    value: number[];
    handleChange: (values : number[]) => void
}

const MapSelect = ({players, handleChange, value}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLInputElement>(null);
  const handleClick= (option: number) => {
    if (value.some((selectedPj) => selectedPj === option)) {
      handleChange(value.filter((selectedPj) => {
        return selectedPj !== option;
      }));
    } else {
      handleChange([...value, option]);
    }
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
                Filtrer par joueur
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
        {players.map((player, index) => {
          return (
            <div
              onClick={(e) => handleClick(player.id)}
              key={index}
              className={
                `${value.some((selectedPj) =>
                  selectedPj === player.id) && 'bg-blue-400'}
                p-1.5
                cursor-pointer
                ${index=== 0 && 'rounded-t-lg'} 
              ${index=== players.length-1 && 'rounded-b-lg'}`}
            >
              {player.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MapSelect;
