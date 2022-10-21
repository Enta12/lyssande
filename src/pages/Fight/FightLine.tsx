/* eslint-disable sonarjs/cognitive-complexity */
import React from 'react';
import cn from 'classnames';
import { InputSelect } from 'components';
import { FightPhaseData, Protagonist } from 'types';
import { ReactComponent as TargetIcon } from 'assets/icon/target.svg';
import { ReactComponent as Blowup } from 'assets/icon/blowup.svg';
import { ReactComponent as SwordIcon } from 'assets/icon/sword.svg';
import { ReactComponent as ReverseMarginMiddle } from 'assets/reverseBorder/double13px.svg';
import { ReactComponent as ReverseMarginY } from 'assets/reverseBorder/corner.svg';
import { ReactComponent as HandTopIcon } from 'assets/icon/handTop.svg';
import { ReactComponent as HandBottomIcon } from 'assets/icon/handBottom.svg';
import { locals } from 'moockedData';

type Props = {
	firstLine: boolean;
	index: number;
	protagonistList: Protagonist[];
	data: FightPhaseData;
	onChangeOpposing: (oposing: number, protagonistB: boolean) => void;
	onChangeLocal: (newLocal: number, firstLocal: boolean) => void;
	onDelete: (indexToDelete: number) => void;
};
const matrice = [
	[
		'1',
		'3',
		'5',
		'7',
		'9',
		'11',
		'13',
		'15',
		'17',
		'19',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
	],
	[
		'1',
		'2',
		'4',
		'6',
		'8',
		'10',
		'12',
		'14',
		'16',
		'18',
		'19',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
	],
	[
		'1',
		'2',
		'3',
		'5',
		'7',
		'9',
		'11',
		'13',
		'15',
		'17',
		'18',
		'19',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
	],
	[
		'EA',
		'1',
		'2',
		'4',
		'6',
		'8',
		'10',
		'12',
		'14',
		'16',
		'18',
		'18',
		'19',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
	],
	[
		'EA',
		'1',
		'2',
		'4',
		'5',
		'7',
		'9',
		'11',
		'13',
		'15',
		'17',
		'18',
		'18',
		'19',
		'19',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
	],
	[
		'EA',
		'EA',
		'1',
		'3',
		'5',
		'6',
		'8',
		'10',
		'12',
		'14',
		'16',
		'17',
		'18',
		'18',
		'19',
		'19',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
	],
	[
		'EA',
		'EA',
		'1',
		'3',
		'4',
		'6',
		'7',
		'9',
		'11',
		'13',
		'15',
		'17',
		'17',
		'18',
		'18',
		'19',
		'19',
		'RA',
		'RA',
		'RA',
		'RA',
		'RA',
	],
	[
		'EA',
		'EA',
		'EA',
		'2',
		'4',
		'5',
		'7',
		'8',
		'10',
		'12',
		'14',
		'16',
		'17',
		'17',
		'18',
		'18',
		'19',
		'19',
		'RA',
		'RA',
		'RA',
		'RA',
	],
	[
		'EA',
		'EA',
		'EA',
		'2',
		'3',
		'5',
		'7',
		'8',
		'9',
		'11',
		'13',
		'15',
		'16',
		'17',
		'17',
		'18',
		'18',
		'19',
		'19',
		'RA',
		'RA',
		'RA',
	],
	[
		'EA',
		'EA',
		'EA',
		'1',
		'3',
		'4',
		'6',
		'8',
		'8',
		'10',
		'12',
		'14',
		'15',
		'16',
		'17',
		'17',
		'18',
		'18',
		'19',
		'19',
		'RA',
		'RA',
	],
	[
		'EA',
		'EA',
		'EA',
		'1',
		'2',
		'4',
		'6',
		'7',
		'8',
		'9',
		'11',
		'13',
		'14',
		'15',
		'16',
		'16',
		'17',
		'17',
		'18',
		'18',
		'19',
		'RA',
	],
	[
		'EA',
		'EA',
		'EA',
		'EA',
		'2',
		'3',
		'5',
		'7',
		'7',
		'9',
		'11',
		'11',
		'13',
		'14',
		'15',
		'15',
		'16',
		'16',
		'17',
		'17',
		'18',
		'18',
	],
	[
		'EA',
		'EA',
		'EA',
		'EA',
		'1',
		'3',
		'5',
		'6',
		'7',
		'8',
		'10',
		'11',
		'12',
		'13',
		'14',
		'15',
		'15',
		'16',
		'16',
		'17',
		'17',
		'18',
	],
	[
		'EA',
		'EA',
		'EA',
		'EA',
		'1',
		'2',
		'4',
		'6',
		'6',
		'8',
		'10',
		'10',
		'12',
		'12',
		'13',
		'14',
		'14',
		'15',
		'15',
		'16',
		'16',
		'17',
	],
	[
		'EA',
		'EA',
		'EA',
		'EA',
		'EA',
		'2',
		'4',
		'5',
		'6',
		'7',
		'9',
		'10',
		'11',
		'12',
		'13',
		'14',
		'14',
		'15',
		'15',
		'16',
		'16',
		'17',
	],
	[
		'EA',
		'EA',
		'EA',
		'EA',
		'EA',
		'1',
		'3',
		'5',
		'5',
		'7',
		'9',
		'9',
		'10',
		'11',
		'13',
		'13',
		'14',
		'14',
		'15',
		'15',
		'16',
		'17',
	],
	[
		'EA',
		'EA',
		'EA',
		'EA',
		'EA',
		'1',
		'3',
		'4',
		'5',
		'6',
		'8',
		'8',
		'9',
		'10',
		'12',
		'13',
		'14',
		'14',
		'15',
		'15',
		'16',
		'17',
	],
	[
		'EA',
		'EA',
		'EA',
		'EA',
		'EA',
		'EA',
		'2',
		'4',
		'4',
		'6',
		'8',
		'8',
		'9',
		'10',
		'11',
		'12',
		'14',
		'14',
		'15',
		'15',
		'16',
		'16',
	],
	[
		'EA',
		'EA',
		'EA',
		'EA',
		'EA',
		'EA',
		'2',
		'3',
		'4',
		'5',
		'7',
		'7',
		'8',
		'19',
		'11',
		'11',
		'13',
		'14',
		'15',
		'15',
		'16',
		'16',
	],
	[
		'EA',
		'EA',
		'EA',
		'EA',
		'EA',
		'EA',
		'1',
		'3',
		'3',
		'5',
		'6',
		'7',
		'7',
		'8',
		'10',
		'11',
		'12',
		'13',
		'15',
		'15',
		'16',
		'16',
	],
	[
		'EA',
		'EA',
		'EA',
		'EA',
		'EA',
		'EA',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'6',
		'7',
		'9',
		'10',
		'11',
		'12',
		'14',
		'15',
		'16',
		'16',
	],
	[
		'EA',
		'EA',
		'EA',
		'EA',
		'EA',
		'EA',
		'EA',
		'2',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'11',
		'13',
		'15',
		'16',
		'16',
	],
];

const localsTrad = {
	head: 'tête',
	arm: 'bras',
	leg: 'jambes',
	genitals: 'parties génitales',
	torso: 'Torse',
	swordArm: 'Bras armé',
	random: 'Au hasard !',
};
const localModif = {
	head: {
		def: 0,
		at: -5,
	},
	torso: {
		def: 0,
		at: 2,
	},
	arm: {
		def: -1,
		at: 1,
	},
	swordArm: {
		def: 0,
		at: 1,
	},
	leg: {
		def: -1,
		at: -1,
	},
	genitals: {
		def: 0,
		at: -5,
	},
};

const FightLine = ({
	protagonistList,
	data,
	firstLine,
	onChangeLocal: handleLocalChange,
	onChangeOpposing: handleOpposingChange,
}: Props) => {
	const getOpponentList = () => {
		const list = protagonistList
			.filter((temp, index) => {
				return index !== data.protagonistA;
			})
			.map((elt) => elt.name);
		if (list.length > 0) return list;
		else return ['Aucune cible'];
	};
	let roll10 = Math.floor(Math.random() * 10);
	if (roll10 > 7) {
		roll10 = 5;
	} else if (roll10 > 3) {
		roll10 = 4;
	}
	const local = locals[data.local] === 'random' ? locals[roll10] : locals[data.local];
	const secondLocal =
		locals[data.secondLocal] === 'random' ? locals[roll10] : locals[data.secondLocal];
	let at = 10;
	let at2 = 10;
	let prdB = 10;
	let prdC = 10;
	if (
		(local === 'head' ||
			local === 'torso' ||
			local === 'swordArm' ||
			local === 'arm' ||
			local === 'genitals' ||
			local === 'leg') &&
		(secondLocal === 'head' ||
			secondLocal === 'torso' ||
			secondLocal === 'swordArm' ||
			secondLocal === 'arm' ||
			secondLocal === 'genitals' ||
			secondLocal === 'leg')
	) {
		const secondAt = protagonistList[data.protagonistA].secondAt;
		at = protagonistList[data.protagonistA].at - 1 + localModif[local].at;
		if (secondAt) {
			at2 = secondAt - 1 + localModif[secondLocal].at;
		}
		prdB = protagonistList[data.protagonistB].prd - 1 + localModif[local].def;
		prdC = protagonistList[data.protagonistC].prd - 1 + localModif[local].def;
	}

	if (at > 21) at = 21;
	else if (at < 0) at = 0;
	if (prdB > 21) prdB = 21;
	else if (prdB < 0) prdB = 0;
	if (prdC > 21) prdC = 21;
	else if (prdC < 0) prdC = 0;

	return (
		<div
			className={cn('text-xl flex text-brown relative', {
				['my-[46px]']: protagonistList[data.protagonistA].secondAt,
			})}
		>
			<div
				className={`
        flex
        h-20
        ${protagonistList[data.protagonistA].npc ? 'bg-bladeBrown' : 'bg-brown'}
        w-[177px]
        rounded-l-2xl
        p-3
        items-center
        justify-around`}
			>
				<div className="w-[157px] h-[50px] bg-white rounded-2xl flex items-center justify-center">
					{protagonistList[data.protagonistA].name || 'Nom indéfinie'}
				</div>
			</div>
			{protagonistList[data.protagonistA].secondAt && (
				<>
					<div
						className={`
          flex
          h-20
          ${protagonistList[data.protagonistA].npc ? 'bg-bladeBrown' : 'bg-brown'}
          w-[467px]
          absolute
          top-[47px] 
          left-[165px]
          rounded-2xl
          p-3
          items-center
          justify-around`}
					>
						<HandBottomIcon />
						<span className="font-bubblegum text-swamp text-2xl">
							~ <span className="font-bubblegum text-orange">VS</span> ~
						</span>
						<InputSelect
							emptyValue="cible sans nom"
							className="text-xl"
							width="[157px]"
							height="[50px]"
							options={getOpponentList()}
							onChange={(protagonist) => handleOpposingChange(protagonist, false)}
							value={data.protagonistC}
						/>
						<div className="relative w-48">
							<TargetIcon className="absolute" />
							<InputSelect
								className="text-xl absolute top-0 left-10"
								width="[157px]"
								height="[50px]"
								options={locals.map((elt) => localsTrad[elt])}
								onChange={(local) => handleLocalChange(local, false)}
								value={data.secondLocal}
							/>
						</div>
					</div>
					<ReverseMarginMiddle
						className={`
              ${protagonistList[data.protagonistA].npc ? 'fill-bladeBrown' : 'fill-brown'}
              top-[23px]
              relative`}
					/>
					<ReverseMarginY
						className={`
            ${protagonistList[data.protagonistA].npc ? 'fill-bladeBrown' : 'fill-brown'}
              right-[38px]
              bottom-[12px]
              relative`}
					/>
					<ReverseMarginY
						className={`
              ${protagonistList[data.protagonistA].npc ? 'fill-bladeBrown' : 'fill-brown'}
              top-[70px]
              rotate-[269deg]
              right-[62px]
              relative`}
					/>
					{firstLine && (
						<Result
							local={localsTrad[secondLocal]}
							at={at2}
							prd={prdC}
							position={protagonistList[data.protagonistA].secondAt ? 'bottom' : 'center'}
						/>
					)}
				</>
			)}
			<div
				className={`
        flex
        h-20
        ${protagonistList[data.protagonistA].npc ? 'bg-bladeBrown' : 'bg-brown'}
        ${
					protagonistList[data.protagonistA].secondAt
						? 'bottom-[46px] left-[165px] absolute rounded-2xl w-[467px]'
						: 'rounded-r-2xl w-[455px]'
				}
        rounded-r-2xl
        p-3
        items-center
        justify-around`}
			>
				{protagonistList[data.protagonistA].secondAt && <HandTopIcon />}
				<span className="font-bubblegum text-swamp text-2xl">
					~ <span className="font-bubblegum text-orange">VS</span> ~
				</span>
				<InputSelect
					emptyValue="cible sans nom"
					className="text-xl"
					width="[157px]"
					height="[50px]"
					options={getOpponentList()}
					onChange={(protagonist) => handleOpposingChange(protagonist, true)}
					value={data.protagonistB}
				/>
				<div className="relative w-48">
					<TargetIcon className="absolute" />
					<InputSelect
						className="text-xl absolute top-0 left-10"
						width="[157px]"
						height="[50px]"
						options={locals.map((elt) => localsTrad[elt])}
						onChange={(local) => handleLocalChange(local, true)}
						value={data.local}
					/>
				</div>
			</div>
			{firstLine && (
				<Result
					local={localsTrad[local]}
					at={at}
					prd={prdB}
					position={protagonistList[data.protagonistA].secondAt ? 'top' : 'center'}
				/>
			)}
		</div>
	);
};

export default FightLine;

const Result = ({
	local,
	prd,
	at,
	position,
}: {
	local: string;
	prd: number;
	at: number;
	position: 'top' | 'center' | 'bottom';
}) => {
	return (
		<div
			className={`
      ${position === 'top' ? 'left-[167px] bottom-[45px]' : ''}
      ${position === 'bottom' ? 'left-[407px] top-[45px]' : ''}
      ${position === 'center' ? 'left-[10px]' : ''}
      relative w-60`}
		>
			<SwordIcon className="absolute top-2 left-0 w-16 opacity-50" />
			<div
				className="
          absolute
          text-xl
          left-9
          flex
          h-20
          border-8
          border-brown
          bg-white
          rounded-2xl
          p-3
          items-center
          justify-around
          w-32"
			>
				{local}
			</div>
			<span className=" left-[174px] font-extrabold absolute z-10 top-6">{matrice[prd][at]} </span>
			<Blowup className=" left-[154px] absolute top-1" />
		</div>
	);
};
