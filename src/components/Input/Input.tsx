import React, { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'input'> & {
	label: string;
};

const Input = ({
	value,
	label,
	placeholder,
	type,
	onChange: handleChange,
	required = false,
}: Props) => {
	return (
		<div className={`flex flex-col w-3/4`}>
			<label className="text-brown ml-3">
				{label}
				{required && '*'}
			</label>
			<input
				required={required}
				className="
                    outline-none
                    rounded-2xl
                    px-5 text-2xl
                    placeholder-bladeBrown
                    drop-shadow
                    font-inter
                    focus:border-2
                    border-swamp
                    h-16"
				placeholder={placeholder}
				type={type}
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
};

export default Input;
