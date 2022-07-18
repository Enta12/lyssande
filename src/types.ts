export type PjType = {
    name: string,
    img: string,
    job?: Job,
    culte?: string,
    race: Race,
    level: number,
    positions?:{
        coordonate : {
            x: number,
            y: number;
        },
        map: string;
        group: number;
    },
    quest?: number,
    player: number,
    story: string
    alignement: {
        moral: string,
        law: string
    },
    gold: number,
    id: number,
};
export type Player ={
    name: string,
    id: number
}
export type WorldMap = {
    name: string;
    mapLink: string;
    scale: number;
}
export type Pos = {x: number, y: number};
export type Job =
    'Pirate' |
    'Menestrel' |
    'Mage de Tzintch' |
    'Mage' |
    'Noble' |
    'Ingénieur';
export type Race =
    'Nain' |
    'Humain' |
    'Demie-elfe' |
    'Elfe-noire' |
    'Hobbit';
export type Local =
    'head' |
    'torso' |
    'arm' |
    'swordArm' |
    'leg' |
    'genitals' |
    'random';
export type Protagonist = {
    name: string;
    at: number;
    prd: number;
    cou: number;
}
export type FightPhaseData = {
    protagonistA : number;
    protagonistB : number;
    local: Local;
}
export type PossibleDate = {
    date?: Date,
    day?: number,
    moment: 'soirée' | 'journée'
}
export type Auth = {
    token: string;
    user?: string;
    id?: number;
    role?: string;
}
export type User = {
    userId: number;
}
export type GroupData = {
    position: {
        x: number,
        y: number,
        map: string,
    }
    members: number[];
}
