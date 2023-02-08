import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { DataCastingContainer, DetailPcCard } from 'components';
import Title from 'components/Title';
import React from 'react';
import { PcType } from 'types';
import { useData } from 'hooks';

const DetailPc = () => {
	const params = useParams();
	const navigate = useNavigate();
	const { status, data: character } = useData<PcType | undefined>(
		'Impossible de récupérer le personnage',
		undefined,
		`/characters/${params.id}`
	);

	const handleEdit = () => {
		navigate(`/pc/edit/${params.id}`);
	};

	return (
		<DataCastingContainer status={status} dataElements="informations du personnage">
			{character && (
				<div className="flex w-full py-10">
					<div className="flex-1 flex flex-col gap-4">
						<Title title="LE PERSONNAGE" />
						<DetailPcCard pcData={character} onEdit={handleEdit} />
					</div>
					<div className="flex flex-col flex-1">
						<Title title="SON HISTOIRE" />
						<p className="font-bubblegum mt-6 mb-8 whitespace-pre-line">{character.story}</p>
						<Title title="SES QUÊTES" />
						<p className="font-bubblegum mt-6 mb-8">Bientôt disponible</p>
					</div>
				</div>
			)}
			{!character && <Navigate to="/404" />}
		</DataCastingContainer>
	);
};

export default DetailPc;
