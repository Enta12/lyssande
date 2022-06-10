import { PjType, Player, WorldMap } from "./types";
import fanghMap from './assets/maps/fangh.jpg'
import CaladieMap from './assets/maps/caladie.jpg'
import FrostMap from './assets/maps/frost.jpg'
import JungleMap from './assets/maps/ammouka-sungul.jpg'
import mongboloMap from './assets/maps/mongbolo.jpg'
import fernolMap from './assets/maps/fernol.jpg'
export const racesMocked : string[]= ["elfe-sylvain", "haut-elfe", "elfe-noir", "demi-elfe", "nain", "humain", "barbare", "gnome", "ogre", "orc", "gobelin", ];
export const jobsMocked : string[]= ["Guerrier/Gladiateur", "Pretre", "Magicien", "Voleur", "Ninja/Assassin", "Menestrel", "Noble/Bourgeois", "Paladin", ];
export const pjsMocked : PjType[]= [
    {
        name : "Fluffy",
        img : "https://static0.cbrimages.com/wordpress/wp-content/uploads/2021/12/Luffy-during-Onigashima-raid.jpg",
        job: "Pirate",
        race: "Hobbit",
        level: 4,
        positionFangh: {
            x: 0.5,
            y: 0.5,
        },
        gold: 12,
        player: 0,
        story: "TS2322: Type '{ name: string; img: string; job: Pirate; race: Hobbit; level: number; positionFangh: { x: number; y: number; }; player: number; story: string; }' is not assignable to type 'PjType'.Object literal may only specify known properties, and 'story' does not exist in type 'PjType'.",
        alignement:{
            moral: "good",
            law: "choatic"
        }
    },
    {
        name : "Jeanne D'orc",
        img : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Contemporaine_afb_jeanne_d_arc.png/280px-Contemporaine_afb_jeanne_d_arc.png",
        job: "Mage",
        race: "Humain",
        level: 3,
        positionFangh: {
            x: 0.6,
            y: 0.6,
        },
        player: 0,
        alignement:{
            moral: "good",
            law: "choatic"
        },
        gold: 12,
        story: "TS2322: Type '{ name: string; img: string; job: Pirate; race: Hobbit; level: number; positionFangh: { x: number; y: number; }; player: number; story: string; }' is not assignable to type 'PjType'.Object literal may only specify known properties, and 'story' does not exist in type 'PjType'."
    },
    {
        name : "Mélanchon",
        img : "http://www.letarnlibre.com/static/img/2014/04/15/jean_luc_melenchon_avril_2012.jpg",
        job: "Noble",
        race: "Humain",
        level: 13,
        positionFangh: {
            x: 0.7,
            y: 0.7,
        },
        player: 0,
        alignement:{
            moral: "good",
            law: "choatic"
        },
        gold: 12,
        story: "TS2322: Type '{ name: string; img: string; job: Pirate; race: Hobbit; level: number; positionFangh: { x: number; y: number; }; player: number; story: string; }' is not assignable to type 'PjType'.Object literal may only specify known properties, and 'story' does not exist in type 'PjType'."
    },
    {
        name : "Clodo",
        img : "https://i.servimg.com/u/f65/11/55/65/81/moine_18.jpg",
        job: "Ingénieur",
        race: "Humain",
        player: 1,
        level: 1,
        positionFangh: {
            x: 0.4,
            y: 0.5,
        },
        alignement:{
            moral: "good",
            law: "choatic"
        },
        gold: 12,
        story: "TS2322: Type '{ name: string; img: string; job: Pirate; race: Hobbit; level: number; positionFangh: { x: number; y: number; }; player: number; story: string; }' is not assignable to type 'PjType'.Object literal may only specify known properties, and 'story' does not exist in type 'PjType'."
    },
    
];
export const playerMocked : Player[]= [
    {
        name: "Baptiste",
        id: 0
    },
    {
        name: "Dwayne",
        id: 1
    }
];
export const mapsMoocked : WorldMap[] = [
    {
        name: "Terre de Fangh",
        mapLink: fanghMap
    },
    {
        name: "Caladie",
        mapLink: CaladieMap
    },
    {
        name: "Confins du givres",
        mapLink: FrostMap
    },
    {
        name: "Jungles D\'Ammouka & Sungul",
        mapLink: JungleMap
    },
    {
        name: "Ile Mong-Bolo",
        mapLink: mongboloMap
    },
    {
        name: "Fernol",
        mapLink: fernolMap
    }
];
