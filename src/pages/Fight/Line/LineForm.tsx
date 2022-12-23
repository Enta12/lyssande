import React from 'react';
import { ReactComponent as TargetIcon } from 'assets/icon/target.svg';
import { ReactComponent as ReverseMarginMiddle } from 'assets/reverseBorder/double13px.svg';
import { ReactComponent as ReverseMarginY } from 'assets/reverseBorder/corner.svg';
import { ReactComponent as HandTopIcon } from 'assets/icon/handTop.svg';
import { ReactComponent as HandBottomIcon } from 'assets/icon/handBottom.svg';
import { InputSelect } from 'components';
import { locals } from 'moockedData';
import cn from 'classnames';
import { getAllLocalTrad } from '../helper';

type Props = {
	isNpc: boolean;
	position: 'center' | 'top' | 'bottom';
	oponnents: string[];
	oponnent: {
		onChange: (newOposing: number[]) => void;
		value: number;
	};
	local: {
		onChange: (newLocal: number[]) => void;
		value: number;
	};
};

const LineForm = ({ isNpc, position, oponnents, oponnent, local }: Props) => {
	const fillProps = isNpc ? 'fill-bladeBrown' : 'fill-brown';
	return (
		<div>
			<div
				className={cn(
					`
                    flex
                    relative
                    h-20
                    ${isNpc ? 'bg-bladeBrown' : 'bg-brown'}
                    w-[521px]
                    rounded-2xl
                    p-3
                    gap-2
                    items-center`,
					{
						'rounded-l-none': position === 'center',
						'rounded-tl-none': position === 'bottom',
						'rounded-bl-none': position === 'top',
					}
				)}
			>
				{position === 'top' && <HandTopIcon />}
				{position === 'bottom' && <HandBottomIcon />}
				<div className="flex-1 flex items-center gap-2">
					<span className="font-bubblegum text-swamp text-2xl min-w-[51px]">
						~ <span className="font-bubblegum text-orange">VS</span> ~
					</span>
					<InputSelect
						required
						placeholder="cible sans nom"
						className={`text-xl h-[50px] ${position === 'center' ? 'w-[200px]' : 'w-[186px]'}`}
						options={oponnents}
						onSelectValue={oponnent.onChange}
						values={[oponnent.value]}
					/>
				</div>
				<div className="relative w-48 flex-1 items-center pl-8">
					<TargetIcon className="absolute left-0" />
					<InputSelect
						required
						className={`text-xl h-[50px] ${position === 'center' ? 'w-[200px]' : 'w-[186px]'}`}
						options={getAllLocalTrad()}
						onSelectValue={local.onChange}
						values={[local.value]}
					/>
				</div>
			</div>
			{position !== 'center' && (
				<ReverseMarginY
					className={cn(
						`
                            ${fillProps}
                            absolute`,
						{
							'bottom-[34px] left-[166px] rotate-[-75deg]': position === 'bottom',
							'left-[166px] bottom-[118px]': position === 'top',
						}
					)}
				/>
			)}
			{position === 'top' && (
				<ReverseMarginMiddle
					className={`
                            ${fillProps}
                            top-[69px]
                            absolute`}
				/>
			)}
		</div>
	);
};

export default LineForm;
