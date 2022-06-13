import React from 'react';
const SubTitle = ({title}: {title: string}) => {
  return (
    <div className="max-w-fit">
      <h2 className="font-bubblegum text-brown text-xl">~ {title} ~</h2>
      <div className="w-full h-1 rounded-b-full bg-orange" />
    </div>
  );
};

export default SubTitle;
