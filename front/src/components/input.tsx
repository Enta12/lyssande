import React from 'react';

interface Props {
    placeholder?: string;
    type: string;
    width?: string;
    height?: string;
}

const Input = ({placeholder, type, width= '3/4', height = '12'} : Props) => {
  return (
    <input
      className={`
        rounded-2xl
        px-5 text-2xl
        placeholder-brown
        font-inter
        h-${height}
        w-${width}
      `}
      placeholder={placeholder}
      type={type}>
    </input>
  );
};

export default Input;
