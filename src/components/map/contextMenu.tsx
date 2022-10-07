import React from 'react';
import {PrimaryButton, ShortSelect} from 'components';
import {ReactComponent as BackArrow} from 'assets/icon/back.svg';
import {ReactComponent as Hike} from 'assets/icon/hike.svg';
import {useOutsideClicker} from 'hooks';

type Props = {
  y: string;
  x: string;
  handleChange: (action: string, index: number) => void;
  data: {
    speed: {
      options: string[],
      value: number,
    },
    land: {
      options: string[],
      value: number,
    },
    duration: {
      options: string[],
      value: number,
    }
  }
  close: () => void;
  pcIndex?: number;
}

const ContextMenu = ({y, x, close, pcIndex, data, handleChange}: Props) => {
  const contextMenuRef = useOutsideClicker(() => close());
  return (
    <div
      ref={contextMenuRef}
      className='absolute bg-brown rounded-2xl p-5 flex flex-col gap-4 z-50'
      style={{
        top: y,
        left: x,
      }}
    >
      <ShortSelect
        value={[data.speed.value]}
        showValue
        options={data.speed.options}
        handleChange={(index) => handleChange('speed', index)}
      />
      <ShortSelect
        value={[data.duration.value]}
        showValue
        options={data.duration.options}
        handleChange={(index) => handleChange('duration', index)}
      />
      <ShortSelect
        value={[data.land.value]}
        showValue
        options={data.land.options}
        handleChange={(index) => handleChange('land', index)}
      />
      {
        pcIndex!== undefined &&
        <>
          <div className='relative'>
            <BackArrow className='w-10'/>
            <PrimaryButton
              onClick={() => handleChange('resetToken', pcIndex)}
              className='absolute right-0 top-0'
              text="Reinitialisé sa position"
              width='w-11/12'
              height='h-10'
              short
            />
          </div>
          <div className='relative'>
            <Hike className='w-10 h-10'/>
            <PrimaryButton
              onClick={() => handleChange(
                  'showMouvement',
                  pcIndex,
              )}
              className='absolute right-0 top-0'
              text='distance isochrone ON/OFF'
              width='w-10/12'
              height='h-10'
              short
            />
          </div>
          <PrimaryButton
            onClick={() => handleChange('supressToken', pcIndex)}
            text="Retirer de la carte"
            alterButton width='w-full'
            height='h-10'
            short
          />
        </>
      }
    </div>
  );
};

export default ContextMenu;
