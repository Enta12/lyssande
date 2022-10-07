import React from 'react';

type Props = {
	placeholder?: string;
	type: string;
	width?: string;
	height?: string;
	className?: string;
	value?: number | string;
	setValueString?: (newValue: string) => void;
	setValueNumber?: (newValue: string) => void;
};

const unset = 'no SetValue';

const Input = ({
	value,
	setValueString,
	setValueNumber,
	placeholder,
	type,
	width = '3/4',
	height = '12',
}: Props) => {
	let setValue: (value: any) => void;
	if (!setValueString && !setValueNumber) {
		setValue = () => console.error(unset);
	} else {
		setValue =
			type === 'number'
				? setValueNumber || (() => console.error(unset))
				: setValueString || (() => console.error(unset));
	}
	return (
		<input
			className={`
        outline-none
        rounded-2xl
        px-5 text-2xl
        placeholder-brown
        font-inter
        h-${height}
        w-${width}
      `}
			placeholder={placeholder}
			type={type}
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
};

export default Input;
