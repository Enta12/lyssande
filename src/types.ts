export type PjType = {
    name: string,
    img: string,
    job?: Job,
    culte?: string,
    race: Race,
    level: number,
    positions?:{
        coordinates : {
            x: number,
            y: number;
        },
        map: string;
        group: number;
    },
    quest?: number,
    player: number,
    story: string
    alignment: {
        moral: string,
        law: string
    },
    gold: number,
    id: string,
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
    secondAt?: number;
    prd: number;
    cou: number;
    npc: boolean;
    id: number;
}
export type FightPhaseData = {
    protagonistA : number;
    protagonistB : number;
    protagonistC : number;
    local: number;
    secondLocal: number;
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
    userId: string;
    role: 'admin' | 'gm' | 'player';
}
export type GroupData = {
    position: {
        x: number,
        y: number,
        map: string,
    }
    members: number[];
}
