export type PcType = {
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
    quest?: string,
    player: string,
    story: string
    alignment: {
        moral: string,
        law: string
    },
    gold: number,
    id: string,
};
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
    date: Date,
    moment: 'soirée' | 'journée'
}
export type Auth = {
    token: string;
    user?: string;
    id?: number;
    role?: string;
}
export type Role = 'admin' | 'gm' | 'player';
export type UserInfo = {
    id: string;
    role: Role;
    name: string;
    email?: string;
}
export type GroupData = {
    position: {
        x: number,
        y: number,
        map: string,
    }
    members: number[];
}

export type Platform = 'none' |
                       'online' |
                       'just-irl' |
                       'irl-or-online' |
                       'in-game' |
                       'rest';

export type Availability = {
    platform: Platform,
    at: PossibleDate,
}

export type Session = {
    id: string;
    date: string,
    title?: string,
    description?: string,
    gm?: string,
    characters: PcType[],
    moment: 'journée' | 'soirée',
    platform: 'online' | 'just-irl';
}
