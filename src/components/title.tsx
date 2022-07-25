import React, {ComponentPropsWithoutRef} from 'react';

type Props = ComponentPropsWithoutRef<'h1'> & {
  title : string,
  reverse?: boolean,
  subtitle?: boolean,
}

const Title = ({
  title,
  subtitle = false,
  reverse = false,
  className,
} : Props) => {
  return (
    <h1
      className={`
          font-bubblegum
          ${reverse ? 'text-orange' : 'text-swamp'}
          ${subtitle ? 'text-2xl' : 'text-3xl'}
          ${className || ''}`
      }
    >
      ~ {title} ~
    </h1>
  );
};

export default Title;
