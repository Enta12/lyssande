import React from 'react';
type Props = {
    height? : string;
    width?: string;
    placeholder?: string;
}


const TextInput = ({width= '3/4', height = '44', placeholder}: Props) => {
  return (
    <div className={`bg-white p-1.5 rounded-2xl w-${width}`}>
      <textarea className={
        ` text-2xl p-1 placeholder-brown font-inter h-${height} w-full`
      }
      placeholder={placeholder}>
      </textarea>
    </div>
  );
};

export default TextInput;
