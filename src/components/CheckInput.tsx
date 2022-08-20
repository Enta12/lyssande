import React from 'react';

type Props = {
  checked: boolean,
  onChange: () => void,
  name?: string,
}

const CheckInput = ({
  checked,
  onChange: handleChange,
  name,
} : Props) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!checked) {
      handleChange();
    }
  };
  return (
    <div className="flex gap-5 text-swamp">
      <div className="relative flex items-center">
        <input
          value={name}
          className="
              border-swamp
              cursor-pointer
              relative
              z-10
              border-2
              appearance-none
              w-6
              h-6
              rounded-full"
          type="checkbox"
          onChange={(e) => onChange(e)}
        />
        {checked &&
            <div className="
              absolute
              inset-0
              bg-[#D9D9D9]
              border-brown
              h-6
              border-4
              rounded-full"
            />}
      </div>
      {name}
    </div>
  );
};

export default CheckInput;
