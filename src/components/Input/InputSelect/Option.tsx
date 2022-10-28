import React from 'react';
import cn from 'classnames';

type Props = {
	name: string;
	selectAnOption: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	isSelected: boolean;
	type?: 'primary' | 'secondary';
};

const Option = ({ name, selectAnOption, isSelected, type = 'primary' }: Props) => {
	return (
		<div
			className={cn('h-16 border-t cursor-pointer flex justify-center items-center bg-white ', {
				['bg-blue-400']: isSelected,
				['h-10']: type === 'secondary',
			})}
			onClick={(e) => selectAnOption(e)}
		>
			{name}
		</div>
	);
};

export default Option;
