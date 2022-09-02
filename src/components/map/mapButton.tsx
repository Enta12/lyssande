import React from 'react';
type Props = {
    name: string;
    picture: string;
    hidden: boolean;
    setPjDrag: () => void;
}

const MapButton = ({
  hidden,
  name,
  picture,
  setPjDrag,
}: Props) => {
  return (
    <div
      className={`
        flex
        flex-col
        items-center
        ${hidden ? 'hidden' : ''}
      `}
    >
      <img
        onDragStart={setPjDrag}
        className="
            w-20
            h-20
            rounded-full
            border-4
            object-cover
            border-darkBrown
            bg-lightBrown
            z-10
            relative"
        src={picture}
        alt={name}
      />
      <div
        className="
          text-orange
          p-3
          pt-10
          text-center
          bottom-[40px]
          relative
          rounded-t-[400px]
          rounded-b-[100px]
          min-w-[80px]
          max-w-[200px]
          bg-darkBrown
          min-h-8
          z-0"
      >
        {name}
      </div>
    </div>
  );
};

export default MapButton;
