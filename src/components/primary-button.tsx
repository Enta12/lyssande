import React, {ComponentPropsWithoutRef} from 'react';

type Props = ComponentPropsWithoutRef<'button'> & {
    text: string;
    width?: string;
    height?: string;
    alterButton?: boolean;
    short?: boolean;
    onClick?: () => void;
}

const PrimaryButton = ({
  text,
  alterButton,
  height,
  width,
  short = false,
  onClick,
  className,
} : Props) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
      className={`
        font-bubblegum
        align-center
        bg-brown
        rounded-3xl
        ${short ? 'text-lg rounded-md border-4' :
        'text-2xl border-8'}
        ${height || 'h-24'}
        ${width || 'w-80'}
        ${alterButton ?
          'bg-red-600' :
          'text-lightGrey'}
        ${className && className}
      `}>
      <span className={ alterButton ?
        'text-transparent bg-clip-text bg-gradient-to-b from-black to-red-900' :
        ''}
      >
        {text}
      </span>
    </button>
  );
};

export default PrimaryButton;
