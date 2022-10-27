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
	type?: 'secondary' | 'primary';
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
	type = 'primary',
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectRef = useOutsideClicker(() => setIsOpen(false));
	const defineValues = values.filter((value) => value !== undefined) as number[];

	const selectAnOption = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
		e.stopPropagation();
		setIsOpen(false);
		if (!defineValues.includes(index)) {
			handleSelect(isMultiselect ? [index, ...defineValues] : [index]);
			return;
		}
		const valueWhithoutValue = defineValues.filter((value) => value !== index);
		if (required && !valueWhithoutValue.length) return;
		handleSelect(valueWhithoutValue);
	};
	return (
		<div
			className={cn(`flex flex-col ${className}`, {
				['relative z-20']: isOpen,
			})}
		>
			<label className={cn('pl-3 text-brown', { ['hidden']: !title })}>
				{title}
				{required && '*'}
			</label>
			<div
				className={'w-full flex-1 text-brown text-center text-2xl drop-shadow font-inter'}
				ref={selectRef}
			>
				<div
					onClick={() => {
						setIsOpen(!isOpen);
					}}
					className={cn('m-0 h-full flex justify-between items-center px-5 bg-white rounded-2xl', {
						['p-1.5 bg-slate-300 rounded-lg px-3 text-base font-bold']: type === 'secondary',
						['rounded-b-none']: isOpen,
					})}
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
					className={cn('overflow-scroll max-h-60 w-full rounded-b-2xl absolute', {
						['hidden']: !isOpen,
					})}
				>
					{options.map((option, index) => (
						<Option
							key={index}
							name={option}
							selectAnOption={(e) => selectAnOption(e, index)}
							isSelected={defineValues.includes(index)}
							type={type}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default InputSelect;
