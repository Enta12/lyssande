import React, { useState } from 'react';
import { DataCastingContainer, ErrorPage, SessionCard } from 'components';
import { useData } from 'hooks';
import { Session, UserInfo } from 'types';
import { getStatus } from 'hooks/useData';

const SessionPage = () => {
	const [pastSession, setPastSession] = useState(false);
	const { status: userStatus, data: users } = useData<UserInfo[]>(
		'Impossible de récupérer les informations du joueur',
		[],
		'/users'
	);
	const { status: sessionStatus, data: sessions } = useData<Session[]>(
		'Impossible de récupérer les informations du joueur',
		[],
		'/sessions'
	);
	const sessionFiltered = sessions.filter((sessionEl) =>
		pastSession ? new Date(+sessionEl.date) <= new Date() : new Date(+sessionEl.date) > new Date()
	);
	return (
		<DataCastingContainer status={getStatus(sessionStatus, userStatus)} dataElements="sessions">
			<div className="flex flex-col gap-3 w-full">
				<div
					className="
                        flex
                        justify-around
                        font-bold
                        font-bubblegum
                        text-2xl
                        mb-8
                    "
				>
					<button
						onClick={() => setPastSession(true)}
						className={`
                            hover:underline hover:text-brown
                            ${pastSession ? 'text-brown underline' : 'text-gray-500'}
                        `}
					>
						Parties passées
					</button>
					<button
						onClick={() => setPastSession(false)}
						className={`
                            hover:underline hover:text-brown
                            ${!pastSession ? 'text-brown underline' : 'text-gray-500'}
                        `}
					>
						Parties à venir
					</button>
				</div>
				{!sessionFiltered && (
					<ErrorPage
						text={{
							title: `AUCUNE SESSIONS ${pastSession ? 'PASSEES' : 'A VENIR'}`,
							firstLine: `Vous n'avez ${
								pastSession ? 'fait aucune session' : 'pas de sessions a venir'
							}`,
							secondLine: pastSession
								? undefined
								: 'Pensez a mettre vos disponibilités et/ou motivé votre équipe !',
						}}
					/>
				)}
				{sessionFiltered &&
					sessionFiltered.map((sessionEl, index) => (
						<SessionCard key={index} data={sessionEl} users={users} />
					))}
			</div>
		</DataCastingContainer>
	);
};

export default SessionPage;
