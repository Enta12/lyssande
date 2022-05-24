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