import React from 'react';
type Props = {
    height? : string;
    width?: string;
    placeholder?: string;
    value: string;
    setValue: (newValue: string) => void;
};


const TextInput = ({width= 'full', height = '52', placeholder, value, setValue}
: Props) => {
  return (
    <div className={`bg-white p-1.5 rounded-2xl w-${width}`}>
      <textarea
        className={`
          outline-none
          text-2xl
          p-1
          placeholder-brown
          font-inter
          h-${height}
          w-full`
        }
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default TextInput;
