import React from 'react';
type Props = {
    name: string;
    picture: string;
    handleOnDrag: (e: React.DragEvent<HTMLImageElement>) => void;
    hidden: boolean;
}

const MapButton = ({hidden, name, picture, handleOnDrag}: Props) => {
  return (
    <div
      className={
        `relative
                border-darkBrown
                rounded-full
                cursor-pointer
                ${hidden && 'hidden'}`
      }
    >
      <img
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
