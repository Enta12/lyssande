import { PcType } from 'types';
import React from 'react';
import { ReactComponent as EditButton } from 'assets/icon/editButton.svg';
import { useAuth } from 'hooks';

type Props = {
	pcData: PcType;
	onEdit: () => void;
};

const DetailPcCard = ({ pcData, onEdit }: Props) => {
	const auth = useAuth();

	return (
		<div
			className="
      w-96
      border-orange
      border-8
      rounded-2xl
      font-bubblegum
      bg-beige
      text-swamp
      relative"
		>
			<div
				className="
        bg-orange
        my-1
        justify-center
        flex
      "
			>
				{pcData.name}
			</div>
			<div className="h-60 border-orange border-y-8 overflow-hidden">
				<img
					className="
            min-w-full
            min-h-full
            object-cover"
					alt={pcData.name}
					src={pcData.img}
				/>
			</div>
			<div
				className="
          flex
          flex-col
          mx-1.5
          py-4"
			>
				<span className="flex justify-between w-full">
					<Field name="RACE" value={pcData.race} />
					<Field name="NIVEAU" value={pcData.level.toString()} />
				</span>
				<Field name="CLASSE" value={pcData.job || 'Aucun'} />
				<Field name="ALIGNEMENT" value={`${pcData.alignment.law} ${pcData.alignment.moral}`} />
				<Field name="OR" value={pcData.gold.toString()} />
				<div className="w-full h-1 rounded-b-full bg-orange my-4" />
				<Field name="LIEU" value="Bientôt disponible" />
				<Field name="DATES" value="Bientôt disponible" />
				<div className="w-full h-1 rounded-b-full bg-orange mb-10 my-4" />
			</div>
			{auth?.user.info?.id === pcData.player && (
				<EditButton className="bottom-0 right-0 absolute cursor-pointer" onClick={onEdit} />
			)}
		</div>
	);
};

export default DetailPcCard;

const Field = ({ name, value }: { name: string; value: string }) => {
	return (
		<div className="text-brown flex gap-2">
			{name}
			<div className="text-swamp">{value}</div>
		</div>
	);
};
