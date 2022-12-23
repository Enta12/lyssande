import React from 'react';

type Props = React.PropsWithChildren<{
	children: string;
	href: string;
	swamp?: boolean;
}>;

const NavLink = ({ children, href, swamp = false }: Props) => {
	return (
		<a
			href={href}
			className={`
          mx-2.5
          font-semibold
          text-2xl
          hover:underline
          drop-shadow
          ${swamp ? 'text-swamp' : 'text-gray-300'}
        `}
		>
			{children}
		</a>
	);
};

export default NavLink;
