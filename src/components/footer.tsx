import React from 'react';

const Footer = () => {
  return (
    <footer
      className="
        h-12
        px-16
        bg-swamp
        flex
        items-center
        justify-center
        text-white
        font-bubblegum
      "
    >
      Fait par Karen, Valentin, Baptiste, Yasmine.
      Pour toutes questions, veuillez contacter
      <span className='text-sky-500 underline ml-1'>
        contact.lyssande@gmail.com
      </span>
    </footer>
  );
};

export default Footer;
