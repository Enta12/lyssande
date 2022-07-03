import React from 'react';
type Props = {
    name: string;
    picture: string;
    handleOnDrag: (e: React.DragEvent<HTMLImageElement>) => void;
    hidden: boolean;
    setPjDrag: () => void;
}

const MapButton = ({
  hidden,
  name,
  picture,
  handleOnDrag,
  setPjDrag,
}: Props) => {
  return (
    <div
      className={
        `relative
        border-darkBrown
        rounded-full
        cursor-grab
        ${hidden && 'hidden'}`
      }
    >
      <img
        onDragStart={setPjDrag}
        onDragEnd={(e) => handleOnDrag(e)}
        className="
            w-20
            h-20
            rounded-full
            border-4
            object-cover
            border-darkBrown
            z-10
            relative"
        src={picture}
        alt={name}
      />
      <div
        className="
          text-orange
          p-1
          flex
          flex-col-reverse
          items-center
          rounded-b-[100px]
          left-[-23px]
          top-[39px]
          absolute
          rounded-t-[200px]
          bg-darkBrown
          h-16
          w-32
          z-0"
      >
        {name}
      </div>
    </div>
  );
};

export default MapButton;
