export type PjType = {
    name: string,
    img: string,
    job: Job,
    race: Race,
    level: number,
    position?: Pos
};

export type Pos = {x: number, y: number}
export type Job = 'Pirate' | 'Menestrel' | 'Mage de Tzintch' | 'Mage' | 'Noble' | 'Ingénieur';
export type Race = 'Nain' | 'Humain' | 'Demie-elfe' | 'Elfe-noire' | 'Hobbit';
export type Local = 'head' | 'torso' | 'arm' | 'swordArm' | 'leg' | 'genitals' | 'locals' | 'random';
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