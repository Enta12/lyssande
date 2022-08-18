import React, {useRef, useEffect} from 'react';
import {ReactComponent as OpenIcon} from '../assets/openInputSelect.svg';

type Props = React.PropsWithChildren<{
    disable?: boolean;
    header: React.ReactNode;
    isOpen: boolean;
    handleOpen: (value: boolean) => void;
}>

const UnfoldingCard = ({
  disable= false,
  header,
  handleOpen,
  isOpen,
  children,
}: Props) => {
  const selectRef = useRef<HTMLInputElement>(null);
  const onCardClick = () => {
    handleOpen(!isOpen);
  };
  useEffect(() => {
    const onClickOutside = () => {
      handleOpen(false);
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
    <div
      ref={selectRef}
      onClick={() => !disable && onCardClick()}
      className={`
        ${!disable && isOpen? 'bg-darkBrown' : 'bg-brown'}
        ${disable && !isOpen && 'bg-bladeBrown cursor-not-allowed' }
        p-2
        w-full
        rounded-lg
        flex
        flex-col
        gap-4
      `} >
      <div
        className="
          flex
          justify-between
          w-full
          font-bubblegum
          text-white
          text-lg
          items-center
          gap-4"
        onClick={() => !disable && handleOpen(!isOpen)}
      >
        {header}
        <OpenIcon className={
            isOpen? 'rotate-180 transition-transform' :
            'transition-transform'}
        />
      </div>
      <div className={`${!isOpen && 'hidden'}`}>
        {children}
      </div>
    </div>
  );
};

export default UnfoldingCard;


