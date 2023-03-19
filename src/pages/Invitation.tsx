import React from 'react';
import background from 'assets/images/bg-invitation.png';
import { ReactComponent as HobbitIcon } from 'assets/icon/hobbit.svg';
import { ReactComponent as HobbitIcon2 } from 'assets/icon/hobbit2.svg';
import { ReactComponent as VolcanIcon } from 'assets/icon/volcan.svg';
import { ReactComponent as BulletPoint } from 'assets/icon/bulletPoint.svg';
import { ReactComponent as Hiker } from 'assets/icon/hiker.svg';
import dayjs from 'dayjs';

const Invitation = () => {
	return (
		<div className="sm:py-32 relative min-h-screen min-w-screen flex flex-col sm:justify-center items-center overflow-hidden font-Merriweather gap-4 sm:gap-16">
			<div className="w-full sm:max-w-[600px] md:max-w-[700px] sm:rounded-2xl bg-[#E2E9C8] relative z-10 flex items-center gap-2 sm:w-fit p-4 drop-shadow sm:text-3xl text-xl">
				<HobbitIcon />
				Fiançailles de Yasmine et Baptiste
			</div>
			<div className="sm:max-w-[400px] md:max-w-[600px] flex flex-col gap-4 rounded-2xl sm:bg-[#E2E9C8] relative z-10 w-fit p-4 drop-shadow">
				<p>Merci de remplir le formulaire suivant pour nous informer de votre présence :</p>
				<ListItem link="https://docs.google.com/forms/d/e/1FAIpQLSfdRQF744mLgalfUu-jzEF3c2wJhcf2lks0uKtzU0sKDOvVYQ/viewform?usp=pp_url" description="J'informe de ma présence" />
				<p>Afin d’avoir un buffet diversifié, si vous ramenez un plat merci d’indiquer lequel :</p>
				<ListItem
					link="https://docs.google.com/spreadsheets/d/15zHLTd4iaq45uJsM4nBa7UFiOyF9HkJpq1hGOKKQDOM/edit?usp=sharing"
					description="Je ramène..."
				/>
				<p>Enfin, si vous souhaitez participer à la cagnotte :</p>
				<ListItem link="https://lydia-app.com/pots?id=22413-fiancailles-baptiste-et-yasmine" description="Je participe !" />
			</div>
			<div className="min-h-screen absolute w-full h-full bg-white">
				<img
					src={background}
					alt="Session"
					className="sm:opacity-25 opacity-10 absolute min-h-screen w-screen object-cover"
				/>
			</div>
			<HobbitIcon2 className="absolute bottom-0 left-0 hidden sm:block" />
			<Hiker
				style={{
					left: `${getAvancement()}%`,
				}}
				className="absolute bottom-0 hidden sm:block"
			/>
			<VolcanIcon className="absolute bottom-[-5px] right-0 hidden sm:block" />
		</div>
	);
};

export default Invitation;

const ListItem = ({ link, description }: { link: string; description: string }) => {
	return (
		<a
			className="flex gap-4 cursor-pointer text-[#2D809A] underline"
			href={link}
			target="_blank"
			rel="noreferrer"
		>
			<BulletPoint className="min-w-fit mt-1" />
			{description}
		</a>
	);
};

const getAvancement = () => {
	const start = dayjs('3/3/2023');
	const end = dayjs('9/30/2024');
	const today = dayjs();
	const total = start.diff(end, 'day');
	const current = today.diff(end, 'day');
	return 100 - Math.floor((current / total) * 100);
};
