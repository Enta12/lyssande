import React, { useState } from 'react';
import iconOpen from 'assets/icon/openInputSelect.svg';
import { useOutsideClicker } from 'hooks';
import cn from 'classnames';

type Props = {
	width?: string;
	height?: string;
	options: string[];
	title?: string;
	onChange: (value: number) => void;
	value?: number;
	className?: string;
	emptyValue?: string;
	onResetValue?: () => void;
};

const InputSelect = ({
	className = '',
	title = '',
	options,
	width,
	height,
	onChange: handleChange,
	value,
	emptyValue = '',
	onResetValue: handleResetValue,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectRef = useOutsideClicker(() => setIsOpen(false));
	const selectAnOption = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
		e.stopPropagation();
		setIsOpen(false);
		if (index === value && handleResetValue) handleResetValue();
		else handleChange(index);
	};
	return (
		<div
			className={`
                h-${height || '12'}
                w-${width || '3/4'}
                relative
                text-brown
                text-center
                text-2xl
                font-inter
                ${className}
            `}
			ref={selectRef}
		>
			<div
				onClick={() => {
					setIsOpen(!isOpen);
				}}
				className={`
                    m-0
                    h-${height || '12'}
                    ${isOpen ? 'rounded-t-2xl' : 'rounded-2xl'}
                    flex
                    justify-between
                    items-center
                    px-5
                    bg-white
                    `}
			>
				{`${title} ${(value !== undefined && options[value]) || emptyValue}`}
				<img
					className={isOpen ? 'rotate-180 transition-transform' : 'transition-transform'}
					src={iconOpen}
					alt="open select"
				/>
			</div>
			<div
				className="
                    overflow-scroll
                    absolute
                    max-h-60
                    w-full
                    z-20
                    rounded-b-2xl
                "
			>
				{options.map((option, index) => (
					<Option
						height={height || '12'}
						last={index === options.length - 1}
						key={`${title}${index}`}
						name={option || emptyValue}
						display={isOpen}
						selectAnOption={(e) => selectAnOption(e, index)}
					/>
				))}
			</div>
			<input readOnly type="hidden" value={value ? options[value] : ''} />
		</div>
	);
};

type OptionProps = {
	height: string;
	last: boolean;
	name: string;
	display: boolean;
	selectAnOption: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Option = ({ height, name, display, selectAnOption, last }: OptionProps) => {
	const classNames = display
		? `h-${height}
            border-t
            cursor-pointer
            flex
            justify-center
            items-center
            bg-white`
		: 'hidden';
	return (
		<div className={classNames} onClick={(e) => selectAnOption(e)}>
			{name}
		</div>
	);
};

export default InputSelect;
