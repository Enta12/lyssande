import React, { useState } from 'react';
import { ReactComponent as DownArrow } from 'assets/icon/down-arrow.svg';
import Navlink from './NavLink';
import { useOutsideClicker } from 'hooks';
import cn from 'classnames';

type Props = {
	title: string;
	navlinks: Array<{
		name: string;
		url: string;
	}>;
};

const NavContainer = ({ title, navlinks }: Props) => {
	const [isClick, setIsClick] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const isOpen = isClick || isHover;
	const ref = useOutsideClicker(() => setIsClick(false));
	return (
		<div
			ref={ref}
			onClick={() => setIsClick(true)}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<span
				className={cn('text-gray-300 mx-2.5 font-semibold text-2xl flex items-center gap-4', {
					['underline']: isOpen,
				})}
			>
				{title}
				<DownArrow className={cn('transition-transform', { ['rotate-180']: isOpen })} />
			</span>
			{isOpen && (
				<div className="pt-4 absolute">
					<div className="flex-col flex bg-gray-300/[.8] p-4 rounded-xl items-center">
						{navlinks.map((navlink, index) => (
							<Navlink swamp key={index} href={navlink.url}>
								{navlink.name}
							</Navlink>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default NavContainer;
