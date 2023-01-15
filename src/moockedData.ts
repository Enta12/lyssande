import { WorldMap } from './types';
import fanghMap from './assets/maps/fangh.jpg';
import CaladieMap from './assets/maps/caladie.jpg';
import FrostMap from './assets/maps/frost.jpg';
import JungleMap from './assets/maps/ammouka-sungul.jpg';
import mongboloMap from './assets/maps/mongbolo.jpg';
import fernolMap from './assets/maps/fernol.jpg';
export const racesMoocked: string[] = [
	'Elfe-sylvain',
	'Haut-elfe',
	'Elfe-noir',
	'Demi-elfe',
	'Hobbit',
	'Nain',
	'Humain',
	'Barbare',
	'Gnome',
	'Ogre',
	'Orque',
	'Demi-orque',
	'Gobelin',
	'Nain de la mafia',
	'Chaman de la jungle',
	'Amazone Syldérienne',
];
export const jobsMoocked: string[] = [
	'Guerrier',
	'Gladiateur',
	'Prêtre',
	'Pirate',
	'Ingénieur',
	'Magicien',
	'Marchand',
	'Voleur',
	'Ninja',
	'Assassin',
	'Ménestrel',
	'Noble',
	'Bourgeois',
	'Paladin',
	'Ranger',
	'Sbire',
	'Bourreau',
];
export const culteMoocked: string[] = [
	'Malgar',
	'Tzintch',
	'Adathie',
	'Niourgl',
	'Youclidth',
	'Khornettoh',
	'Slanoush',
	'Lafoune',
	'Caddyro',
	'Dlul',
	'Crôm',
	"Braav'",
	'Picrate',
	'Lhamorale',
	"Vaar'",
	'Oboulos',
	'Delibeuk',
	'Mankdebol',
	'Peipani',
	'Yrfoul',
	'Fuhala',
	'Chakhom',
	'Bloutos',
	'Keskonspwale',
];
export const mapsMoocked: WorldMap[] = [
	{
		name: 'Terre de Fangh',
		scale: 10.7,
		mapLink: fanghMap,
	},
	{
		name: 'Caladie',
		scale: 3.9,
		mapLink: CaladieMap,
	},
	{
		name: 'Confins du givres',
		scale: 16,
		mapLink: FrostMap,
	},
	{
		name: "Jungles D'Ammouka & Sungul",
		scale: 4.4,
		mapLink: JungleMap,
	},
	{
		name: 'Ile Mong-Bolo',
		scale: 5.1,
		mapLink: mongboloMap,
	},
	{
		name: 'Fernol',
		scale: 3.9,
		mapLink: fernolMap,
	},
];
export const landsMoocked = [
	{
		name: 'Marécage',
		speedMod: 0.5,
	},
	{
		name: 'Montagne',
		speedMod: 0.5,
	},
	{
		name: 'Forêt',
		speedMod: 0.75,
	},
	{
		name: 'Collines',
		speedMod: 0.75,
	},
	{
		name: 'Routes, Plaines, Mer',
		speedMod: 1,
	},
];
export const speedMoocked = [
	{
		name: 'Normal, chariot 30km',
		speedMod: 30,
	},
	{
		name: 'barbares 55km',
		speedMod: 55,
	},
	{
		name: 'Cheval 50km',
		speedMod: 50,
	},
	{
		name: 'Diligence 70km',
		speedMod: 70,
	},
	{
		name: 'Galere',
		speedMod: 60,
	},
	{
		name: 'Gallion',
		speedMod: 100,
	},
];

export const moralsMoocked = ['GOOD', 'NEUTRAL', 'EVIL'];
export const lawsMoocked = ['LAWFUL', 'NEUTRAL', 'CHAOTIC'];

export const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
export const months = [
	'jan.',
	'fev.',
	'mars',
	'avr.',
	'mai',
	'juin',
	'juil.',
	'aout',
	'sept.',
	'oct.',
	'nov.',
	'dec.',
];

export const roles = ['player', 'gm', 'admin'];
