import { locals } from 'moockedData';
import { FightPhaseData, LocalKey, Protagonist } from 'types';

type LocalStat = {
	name: string;
	prd: number;
	at: number;
};

const localData = {
	head: {
		name: 'tête',
		prd: 0,
		at: -5,
	},
	arm: {
		name: 'bras',
		prd: -1,
		at: 1,
	},
	leg: {
		name: 'jambes',
		prd: -1,
		at: -1,
	},
	genitals: {
		name: 'parties génitales',
		prd: 0,
		at: -5,
	},
	torso: {
		name: 'Torse',
		prd: 0,
		at: 2,
	},
	swordArm: {
		name: 'Bras armé',
		prd: 0,
		at: 1,
	},
};

export const getAllLocalTrad = () =>
	locals.map((local) => {
		if (local === 'random') return 'random';
		return localData[local].name;
	});

const standardizeData = (value: number) => (value < 0 ? 0 : value > 21 ? 21 : value);

const getStatEditByLocal = (protagonist: Protagonist, stat: 'at' | 'prd', localStat: LocalStat) =>
	protagonist[stat] - 1 + localStat[stat];

const getRandomLocal = () => {
	let roll10 = Math.floor(Math.random() * 10);
	if (roll10 > 7) {
		roll10 = 5;
	} else if (roll10 > 3) {
		roll10 = 4;
	}
	return localData[locals[roll10] as LocalKey];
};

export const getOpponents = (protagonistList: Protagonist[], data: FightPhaseData) => {
	const list = protagonistList
		.filter((temp, index) => index !== data.protagonistA)
		.map((elt) => elt.name);
	if (list.length > 0) return list;
	else return ['Aucune cible'];
};

export const getLocal = (local: LocalKey | 'random') =>
	local === 'random' ? getRandomLocal() : localData[local];

export const getStatValue = (
	data: FightPhaseData,
	protagonistList: Protagonist[],
	firstLocal: LocalStat,
	secondLocal: LocalStat
) => {
	const characterSecondAt = protagonistList[data.protagonistA].secondAt;
	return {
		activeCharacter: {
			at: standardizeData(getStatEditByLocal(protagonistList[data.protagonistA], 'at', firstLocal)),
			at2:
				characterSecondAt &&
				standardizeData(getStatEditByLocal(protagonistList[data.protagonistA], 'at', secondLocal)),
		},
		opponents: {
			prdOfCharacterB: standardizeData(
				getStatEditByLocal(protagonistList[data.protagonistB], 'prd', firstLocal)
			),
			prdOfCharacterC: standardizeData(
				getStatEditByLocal(protagonistList[data.protagonistC], 'prd', secondLocal)
			),
		},
	};
};
