import {useRef, useEffect} from 'react';

const useOutsideClicker = (onOutsideClick: () => void) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = onOutsideClick;
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (
        wrapperRef?.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        handleOutsideClick();
      }
    };
    document.addEventListener('mousedown', clickHandler);
    return () => {
      document.removeEventListener('mousedown', clickHandler);
    };
  }, [wrapperRef, handleOutsideClick]);

  return wrapperRef;
};

export default useOutsideClicker;
