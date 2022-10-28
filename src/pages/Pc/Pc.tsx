import addIcon from 'assets/icon/add.svg';
import PcCard from 'components/PcCard';
import React from 'react';
import { PcType } from 'types';
import { useNavigate } from 'react-router-dom';
import { useData } from 'hooks';
import { DataCastingContainer } from 'components';

const Pc = () => {
	const navigate = useNavigate();
	const { status, data: pcData } = useData<PcType[]>(
		'Impossible de récupérer les personnages',
		[],
		'/characters'
	);

	return (
		<DataCastingContainer status={status} dataElements="personnages">
			<div
				className="
                    grid
                    grid-cols-auto-fill-220
                    grid-flow-rows
                    w-full
                    gap-4
                "
			>
				{pcData.map((pcData, index) => (
					<PcCard key={index} pcData={pcData} onClick={(id, e) => navigate(`/pc/${id}`)} />
				))}
				<a href="/pc/add">
					<button
						className="
                            border-dashed
                            h-96
                            w-56
                            border-orange
                            border-8
                            rounded-2xl
                            flex
                            justify-center
                            items-center
                        "
					>
						<img className="max-h-20" alt="add pc" src={addIcon} />
					</button>
				</a>
			</div>
		</DataCastingContainer>
	);
};

export default Pc;
