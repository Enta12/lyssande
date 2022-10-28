import React from 'react';
import { PrimaryButton, InputSelect } from 'components';
import { ReactComponent as BackArrow } from 'assets/icon/back.svg';
import { ReactComponent as Hike } from 'assets/icon/hike.svg';
import { useOutsideClicker } from 'hooks';

type Props = {
	y: string;
	x: string;
	onChange: (action: string, index: number) => void;
	data: {
		speed: {
			options: string[];
			value: number;
		};
		land: {
			options: string[];
			value: number;
		};
		duration: {
			options: string[];
			value: number;
		};
	};
	onClose: () => void;
	pcIndex?: number;
};

const ContextMenu = ({
	y,
	x,
	onClose: handleClose,
	pcIndex,
	data,
	onChange: handleChange,
}: Props) => {
	const contextMenuRef = useOutsideClicker(handleClose);
	return (
		<div
			ref={contextMenuRef}
			className="absolute bg-brown rounded-2xl p-5 flex flex-col gap-4 z-50"
			style={{
				top: y,
				left: x,
			}}
		>
			<InputSelect
				required
				values={[data.speed.value]}
				options={data.speed.options}
				onSelectValue={(value) => handleChange('speed', value[0])}
				className="w-3/4 h-16"
			/>
			<InputSelect
				required
				values={[data.duration.value]}
				options={data.duration.options}
				onSelectValue={(value) => handleChange('duration', value[0])}
				className="w-3/4 h-16"
			/>
			<InputSelect
				required
				values={[data.land.value]}
				options={data.land.options}
				onSelectValue={(value) => handleChange('land', value[0])}
				className="w-3/4 h-16"
			/>
			{pcIndex !== undefined && (
				<>
					<div className="relative">
						<BackArrow className="w-10" />
						<PrimaryButton
							onClick={() => handleChange('resetToken', pcIndex)}
							className="absolute right-0 top-0"
							text="Reinitialisé sa position"
							width="w-11/12"
							height="h-10"
							short
						/>
					</div>
					<div className="relative">
						<Hike className="w-10 h-10" />
						<PrimaryButton
							onClick={() => handleChange('showMouvement', pcIndex)}
							className="absolute right-0 top-0"
							text="distance isochrone ON/OFF"
							width="w-10/12"
							height="h-10"
							short
						/>
					</div>
					<PrimaryButton
						onClick={() => handleChange('deleteToken', pcIndex)}
						text="Retirer de la carte"
						alterButton
						width="w-full"
						height="h-10"
						short
					/>
				</>
			)}
		</div>
	);
};

export default ContextMenu;
