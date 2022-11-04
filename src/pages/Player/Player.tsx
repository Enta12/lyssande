import PcCard from 'components/PcCard';
import SubTitle from 'components/SubTitle';
import Title from 'components/Title';
import addIcon from 'assets/icon/add.svg';
// import Calendar from 'components/calendar/calendar';
import { UserInfo, PcType } from 'types';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import { useData } from 'hooks';
import { DataCastingContainer } from 'components';
import { getStatus } from 'hooks/useData';

//const availabilities : Availability[] = [];

type Props = {
	userId?: string;
};

/*
const setDates = () => {
  new Array(7).fill('').forEach((value, index) => {
    availabilities.push({
      at: {
        date: new Date(),
        moment: 'journée',
      },
      platform: (index === 0 || index === 6 ? 'irl-or-online' : 'none'),
    });
    availabilities.push({
      at: {
        date: new Date(),
        moment: 'soirée',
      },
      platform: (index === 0 || index === 6 ? 'irl-or-online' : 'none'),
    });
  });
};
*/

//setDates();

const Player = ({ userId }: Props) => {
	const params = useParams();
	const navigate = useNavigate();
	const id = params.id || userId;
	if (!id) navigate('404');
	const { status: playerStatus, data: playerSelected } = useData<UserInfo | undefined>(
		'Impossible de récupérer les informations du joueur',
		undefined,
		`/users/${id}`
	);
	const { status: characterStatus, data: characters } = useData<PcType[] | undefined>(
		'Impossible de récupérer les personnages',
		undefined,
		`/users/${id}/characters`
	);

	return (
		<DataCastingContainer
			status={getStatus(playerStatus, characterStatus)}
			dataElements="informations du personnages"
		>
			{playerSelected && characters && (
				<div
					className="
                        pt-8
                        w-full
                        flex
                        flex-col
                        gap-8
                    "
				>
					<Title title={playerSelected.name} />
					<SubTitle title="PERSONNAGES" />
					<div
						className="
                            grid
                            grid-cols-auto-fill-220
                            grid-flow-rows
                            gap-4
                            w-full
                        "
					>
						{characters.map((characterData, index) => (
							<PcCard
								key={index}
								pcData={characterData}
								onClick={() => navigate(`/pc/${characterData.id}`)}
							/>
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
					<SubTitle title="PREFERENCES" />
					<div className="font-bubblegum text-swamp">Bientôt disponible</div>
					{/*
                    remove comment when preferences will be add on back-end
                    <form >
                    <Calendar
                        availabilities={availabilities}
                        setAvailability={
                        (platform: Platform, index: number) => console.log('TODO')}
                    />
                    </form>
                    */}
				</div>
			)}
		</DataCastingContainer>
	);
};

export default Player;
