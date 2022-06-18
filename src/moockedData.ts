/* eslint-disable max-len */
import {PjType, Player, WorldMap} from './types';
import fanghMap from './assets/maps/fangh.jpg';
import CaladieMap from './assets/maps/caladie.jpg';
import FrostMap from './assets/maps/frost.jpg';
import JungleMap from './assets/maps/ammouka-sungul.jpg';
import mongboloMap from './assets/maps/mongbolo.jpg';
import fernolMap from './assets/maps/fernol.jpg';
export const racesMoocked : string[]= [
  'elfe-sylvain',
  'haut-elfe',
  'elfe-noir',
  'demi-elfe',
  'nain',
  'humain',
  'barbare',
  'gnome',
  'ogre',
  'orc',
  'gobelin',
];
export const jobsMoocked : string[]= [
  'Guerrier/Gladiateur',
  'Pretre',
  'Magicien',
  'Voleur',
  'Ninja/Assassin',
  'Menestrel',
  'Noble/Bourgeois',
  'Paladin',
];
export const culteMoocked : string[]= [
  'Malgar',
  'Tzintch',
  'Adathie',
  'Niourgl',
  'Youclidth',
  'Khornettoh',
  'Slanoush',
  'Lafoune',
];
export const pjsMoocked : PjType[]= [
  {
    name: 'Fluffy',
    img: 'https://static0.cbrimages.com/wordpress/wp-content/uploads/2021/12/Luffy-during-Onigashima-raid.jpg',
    job: 'Pirate',
    race: 'Hobbit',
    level: 4,
    positions: {
      coordonate: {
        x: 0.5,
        y: 0.5,
      },
      map: 'Terre de Fangh',
    },
    gold: 12,
    player: 0,
    story:
        'TS2322: Type name: string; img: string; job: Hobbit;level: number; positionFangh: { x: number; y: number; }; player: number; story: string; } is not assignable to type PjType.Object literal may only specify known properties, and story does not exist in type PjType.',
    alignement: {
      moral: 'good',
      law: 'choatic',
    },
    id: 0,
  },
  {
    name: 'Jeanne D\'orc',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Contemporaine_afb_jeanne_d_arc.png/280px-Contemporaine_afb_jeanne_d_arc.png',
    job: 'Mage',
    race: 'Humain',
    level: 3,
    positions: {
      coordonate: {
        x: 0.6,
        y: 0.6,
      },
      map: 'Terre de Fangh',
    },
    quest: 1,
    player: 0,
    alignement: {
      moral: 'good',
      law: 'choatic',
    },
    gold: 12,
    id: 1,
    story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In elementum odio ac eros rutrum, vel accumsan augue facilisis. Maecenas malesuada, enim quis sodales dictum, mauris eros congue neque, ut rhoncus nibh dolor ut turpis. Sed varius, libero non convallis luctus, libero neque lacinia mi, a vestibulum ex ex non quam. Morbi hendrerit nec arcu sed ultrices. Aliquam tincidunt nulla vel est placerat, sit amet blandit quam hendrerit. Etiam scelerisque risus nunc, vel iaculis ante eleifend id. Aliquam eget dictum quam, sed elementum quam. Vestibulum vehicula nulla et velit auctor ultrices. Fusce malesuada commodo eros, quis malesuada velit congue ac. Aliquam erat volutpat. Integer id erat gravida, sagittis leo nec, mattis sapien. Curabitur nisl sapien, suscipit id rhoncus a, suscipit vitae arcu. Quisque et ornare mauris, et ultricies erat. Fusce tempus dolor orci, eu faucibus erat rutrum sed. Etiam porttitor, neque in elementum pellentesque, est arcu luctus libero, a imperdiet diam leo in ex. ',
  },
  {
    name: 'Mélanchon',
    img: 'http://www.letarnlibre.com/static/img/2014/04/15/jean_luc_melenchon_avril_2012.jpg',
    job: 'Noble',
    race: 'Humain',
    id: 2,
    level: 13,
    positions: {
      coordonate: {
        x: 0.7,
        y: 0.7,
      },
      map: 'Terre de Fangh',
    },
    quest: 0,
    player: 0,
    alignement: {
      moral: 'good',
      law: 'choatic',
    },
    gold: 12,
    story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In elementum odio ac eros rutrum, vel accumsan augue facilisis. Maecenas malesuada, enim quis sodales dictum, mauris eros congue neque, ut rhoncus nibh dolor ut turpis. Sed varius, libero non convallis luctus, libero neque lacinia mi, a vestibulum ex ex non quam. Morbi hendrerit nec arcu sed ultrices. Aliquam tincidunt nulla vel est placerat, sit amet blandit quam hendrerit. Etiam scelerisque risus nunc, vel iaculis ante eleifend id. Aliquam eget dictum quam, sed elementum quam. Vestibulum vehicula nulla et velit auctor ultrices. Fusce malesuada commodo eros, quis malesuada velit congue ac. Aliquam erat volutpat. Integer id erat gravida, sagittis leo nec, mattis sapien. Curabitur nisl sapien, suscipit id rhoncus a, suscipit vitae arcu. Quisque et ornare mauris, et ultricies erat. Fusce tempus dolor orci, eu faucibus erat rutrum sed. Etiam porttitor, neque in elementum pellentesque, est arcu luctus libero, a imperdiet diam leo in ex. ',
  },
  {
    name: 'Clodo',
    img: 'https://i.servimg.com/u/f65/11/55/65/81/moine_18.jpg',
    job: 'Ingénieur',
    race: 'Humain',
    player: 1,
    id: 3,
    level: 1,
    positions: {
      coordonate: {
        x: 0.4,
        y: 0.5,
      },
      map: 'Terre de Fangh',
    },
    quest: 1,
    alignement: {
      moral: 'good',
      law: 'choatic',
    },
    gold: 12,
    story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In elementum odio ac eros rutrum, vel accumsan augue facilisis. Maecenas malesuada, enim quis sodales dictum, mauris eros congue neque, ut rhoncus nibh dolor ut turpis. Sed varius, libero non convallis luctus, libero neque lacinia mi, a vestibulum ex ex non quam. Morbi hendrerit nec arcu sed ultrices. Aliquam tincidunt nulla vel est placerat, sit amet blandit quam hendrerit. Etiam scelerisque risus nunc, vel iaculis ante eleifend id. Aliquam eget dictum quam, sed elementum quam. Vestibulum vehicula nulla et velit auctor ultrices. Fusce malesuada commodo eros, quis malesuada velit congue ac. Aliquam erat volutpat. Integer id erat gravida, sagittis leo nec, mattis sapien. Curabitur nisl sapien, suscipit id rhoncus a, suscipit vitae arcu. Quisque et ornare mauris, et ultricies erat. Fusce tempus dolor orci, eu faucibus erat rutrum sed. Etiam porttitor, neque in elementum pellentesque, est arcu luctus libero, a imperdiet diam leo in ex. ',
  },

];
export const playerMoocked : Player[]= [
  {
    name: 'Baptiste',
    id: 0,
  },
  {
    name: 'Dwayne',
    id: 1,
  },
];
export const mapsMoocked : WorldMap[] = [
  {
    name: 'Terre de Fangh',
    mapLink: fanghMap,
  },
  {
    name: 'Caladie',
    mapLink: CaladieMap,
  },
  {
    name: 'Confins du givres',
    mapLink: FrostMap,
  },
  {
    name: 'Jungles D\'Ammouka & Sungul',
    mapLink: JungleMap,
  },
  {
    name: 'Ile Mong-Bolo',
    mapLink: mongboloMap,
  },
  {
    name: 'Fernol',
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
    speed: 1,
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
    speed: 70,
  },
  {
    name: 'Galere',
    speed: 60,
  },
  {
    name: 'Gallion',
    speed: 100,
  },
];
