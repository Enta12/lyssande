import { PjType } from "./types";
export const racesMocked : string[]= ["elfe-sylvain", "haut-elfe", "elfe-noir", "demi-elfe", "nain", "humain", "barbare", "gnome", "ogre", "orc", "gobelin", ];
export const jobsMocked : string[]= ["Guerrier/Gladiateur", "Pretre", "Magicien", "Voleur", "Ninja/Assassin", "Menestrel", "Noble/Bourgeois", "Paladin", ];
export const pjsMocked : PjType[]= [
    {
        name : "Fluffy",
        img : "https://static0.cbrimages.com/wordpress/wp-content/uploads/2021/12/Luffy-during-Onigashima-raid.jpg",
        job: "Pirate",
        race: "Hobbit",
        level: 4,
        position: {
            x: 0.5,
            y: 0.5,
        },
        player: 0,
    },
    {
        name : "Jeanne D'orc",
        img : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Contemporaine_afb_jeanne_d_arc.png/280px-Contemporaine_afb_jeanne_d_arc.png",
        job: "Mage",
        race: "Humain",
        level: 3,
        position: {
            x: 0.6,
            y: 0.6,
        },
        player: 0
    },
    {
        name : "Mélanchon",
        img : "http://www.letarnlibre.com/static/img/2014/04/15/jean_luc_melenchon_avril_2012.jpg",
        job: "Noble",
        race: "Humain",
        level: 13,
        position: {
            x: 0.7,
            y: 0.7,
        },
        player: 0
    },
    {
        name : "Clodo",
        img : "https://i.servimg.com/u/f65/11/55/65/81/moine_18.jpg",
        job: "Ingénieur",
        race: "Humain",
        player: 1,
        level: 1,
        position: {
            x: 0.4,
            y: 0.5,
        }
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
]