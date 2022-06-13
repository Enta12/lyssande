import React, {ComponentPropsWithoutRef} from 'react';

type Props = ComponentPropsWithoutRef<'button'> & {
    text: string;
}

const PrimaryButton = ({text, ...props} : Props) => {
  return (

    <button
      {...props}
      className="
        font-bubblegum
        align-center
        bg-brown
        rounded-2xl
        h-24
        w-80
        border-8
        text-2xl
        text-lightGrey
      ">
      {text}
    </button>
  );
};

export default PrimaryButton;
