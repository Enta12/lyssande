import React, { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'textarea'> & {
	label: string;
};

const TextInput = ({ placeholder, value, onChange: handleChange, label, required }: Props) => {
	return (
		<div className="flex flex-col">
			<label className="pl-3 text-brown">
				{label}
				{required && '*'}
			</label>
			<textarea
				className="
                    p-1.5
                    drop-shadow
                    rounded-2xl
                    bg-white 
                    outline-none
                    focus:border-2
                    border-swamp
                    text-2xl
                    placeholder-bladeBrown
                    text-brown
                    font-inter
                    h-52
                    whitespace-pre-wrap
                    w-full"
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
};

export default TextInput;
