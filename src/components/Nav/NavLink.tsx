import React from 'react';

type Props = React.PropsWithChildren<{
    children: string,
    href: string
  }>

const NavLink = ({
  children,
  href,
}: Props) => {
  return (
    <a href={href} className="
          text-gray-300
          mx-2.5
          font-semibold
          text-2xl
      ">
      {children}
    </a>
  );
};

export default NavLink;
