import React from 'react';

const Notif = (props : {children: string}) => {
  const {children} = props;
  return (
    <div className="
      w-full
      h-9
      mt-px
      bg-brown/[.8]
      flex
      items-center
      pl-28
      text-white
    ">
      {children}
    </div>
  );
};

export default Notif;
