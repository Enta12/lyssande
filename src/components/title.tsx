import React from 'react';
const Title = ({
  title,
  reverse = false,
} : {
  title : string,
  reverse?: boolean,
}) => {
  return (
    <>
      <h1
        className={`
          font-bubblegum
          ${reverse ? 'text-orange' : 'text-swamp'}
          text-3xl`
        }
      >~ {title} ~</h1>
    </>
  );
};

export default Title;
