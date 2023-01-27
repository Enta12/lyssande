import availabilityNone from 'assets/icon/availabilityNone.svg';
import availabilityIrl from 'assets/icon/availabilityIrl.svg';
import availabilityIrlOrIl from 'assets/icon/availabilityIrlOrIl.svg';
import availabilityIl from 'assets/icon/availabilityIl.svg';
import availabilityIG from 'assets/icon/availabilityIG.svg';
import availabilityRest from 'assets/icon/availabilityRest.svg';
import { ReactComponent as SunIcon } from 'assets/icon/sun.svg';
import { ReactComponent as MoonIcon } from 'assets/icon/moon.svg';
import React from 'react';
import { Platform } from 'types';

type Props = {
	checkboxState: Platform;
	onChange: (newPlatform: Platform) => void;
	moment: 'day' | 'evenning';
};

const checkbox = {
	none: availabilityNone,
	online: availabilityIl,
	'just-irl': availabilityIrl,
	'irl-or-online': availabilityIrlOrIl,
	rest: availabilityRest,
	'in-game': availabilityIG,
};

const Checkbox = ({ checkboxState, moment, onChange: handleChange }: Props) => {
	const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (handleChange) {
			switch (checkboxState) {
				case 'none':
					handleChange('irl-or-online');
					break;
				case 'online':
					handleChange('just-irl');
					break;
				case 'just-irl':
					handleChange('none');
					break;
				case 'irl-or-online':
					handleChange('online');
					break;
			}
		}
	};
	const rightClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (handleChange) {
			switch (checkboxState) {
				case 'none':
					handleChange('just-irl');
					break;
				case 'online':
					handleChange('irl-or-online');
					break;
				case 'just-irl':
					handleChange('online');
					break;
				case 'irl-or-online':
					handleChange('none');
					break;
			}
		}
	};
	return (
		<div className="flex flex-col items-center justify-center">
			{moment === 'day' ? (
				<SunIcon className="relative top-2 h-7" />
			) : (
				<MoonIcon className="relative top-2 h-7" />
			)}
			<div className="px-1 text-center flex justify-center relative z-10">
				{checkboxState === 'in-game' || checkboxState === 'rest' ? (
					<img className="cursor-no-drop" src={checkbox[checkboxState]} alt={checkboxState} />
				) : (
					<button onClick={onClick} onContextMenu={rightClick}>
						<img src={checkbox[checkboxState]} alt={checkboxState} />
					</button>
				)}
			</div>
		</div>
	);
};

export default Checkbox;
