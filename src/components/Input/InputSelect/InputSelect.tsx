import React, { ComponentPropsWithoutRef, useState } from 'react';
import iconOpen from 'assets/icon/openInputSelect.svg';
import { useOutsideClicker } from 'hooks';
import Option from './Option';
import cn from 'classnames';

type Props = ComponentPropsWithoutRef<'select'> & {
	options: string[];
	onSelectValue: (value: Array<number>) => void;
	values: Array<number | undefined>;
	isMultiselect?: boolean;
};

const InputSelect = ({
	title = '',
	onSelectValue: handleSelect,
	values,
	options,
	required,
	placeholder = 'Aucun',
	isMultiselect = false,
	className,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectRef = useOutsideClicker(() => setIsOpen(false));
	const defineValues = values.filter((value) => value !== undefined) as number[];

	const selectAnOption = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
		e.stopPropagation();
		console.log('index', index);

		setIsOpen(false);
		if (!defineValues.includes(index)) {
			handleSelect(isMultiselect ? [index, ...defineValues] : [index]);
			return;
		}
		const valueWhithoutValue = defineValues.filter((value) => value !== index);
		console.log('hello', valueWhithoutValue);
		if (required && !valueWhithoutValue.length) return;
		handleSelect(valueWhithoutValue);
	};
	return (
		<div className="w-3/4">
			<label className="pl-3 text-brown">
				{title}
				{required && '*'}
			</label>
			<div
				className={`
                    h-16
                    w-full
                    relative
                    text-brown
                    text-center
                    text-2xl
                    drop-shadow
                    font-inter
                    z-20
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
                        h-16
                        ${isOpen ? 'rounded-t-2xl' : 'rounded-2xl'}
                        flex
                        justify-between
                        items-center
                        px-5
                        bg-white
                        `}
				>
					<span className="truncate">
						{defineValues
							.map((index) => options[index])
							.toString()
							.replace(',', ' ') || placeholder}
					</span>
					<img
						className={isOpen ? 'rotate-180 transition-transform' : 'transition-transform'}
						src={iconOpen}
						alt="open select"
					/>
				</div>
				<div
					className={cn('overflow-scroll absolute max-h-60 w-full z-20 rounded-b-2xl', {
						['hidden']: !isOpen,
					})}
				>
					{options.map((option, index) => (
						<Option
							key={index}
							name={option}
							selectAnOption={(e) => selectAnOption(e, index)}
							isSelected={defineValues.includes(index)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default InputSelect;
