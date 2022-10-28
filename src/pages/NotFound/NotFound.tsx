import React from 'react';

type Props = {

};

const NotFound = ({}: Props) => {
  return (
    <div
      className='
        flex
        items-center
        justify-center
        font-bubblegum
        text-bold
        text-4xl
        hover:animate-spin
        text-swamp'
    >
      <span className='animate-spin'>404</span>
      <span className='animate-ping'>Kart-Centz Kartre !</span>
      <span className='animate-spin'>404</span>
    </div>
  );
};

export default NotFound;
