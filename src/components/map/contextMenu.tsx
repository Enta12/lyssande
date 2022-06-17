import React, {useEffect, useRef} from 'react';
import ShortSelect from '../shortSelect';

type Props = {
  y: string;
  x: string;
  close: () => void;
  pjTODO: boolean;
}

const ContextMenu = ({y, x, close}: Props) => {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (contextMenuRef.current &&
         !contextMenuRef.current.contains(event.target)) {
        close();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [contextMenuRef]);
  return (
    <div
      ref={contextMenuRef}
      className='absolute bg-brown rounded-2xl p-5 flex flex-col gap-4'
      style={{
        top: y,
        left: x,
      }}
    >
      <ShortSelect
        value={[0]}
        showValue
        options={[]}
        handleChange={(e) => console.log(e)}
      />
      <ShortSelect
        value={[0]}
        showValue
        options={[]}
        handleChange={(e) => console.log(e)}
      />
      <ShortSelect
        value={[0]}
        showValue
        options={[]}
        handleChange={(e) => console.log(e)}
      />
    </div>
  );
};

export default ContextMenu;
