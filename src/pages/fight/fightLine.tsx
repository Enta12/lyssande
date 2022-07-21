/* eslint-disable max-len */
import React from 'react';
import {InputSelect} from '../../components';
import {FightPhaseData, Protagonist} from '../../types';
import {ReactComponent as TargetIcon} from '../../assets/target.svg';
import {ReactComponent as Blowup} from '../../assets/blowup.svg';
import {ReactComponent as SwordIcon} from '../../assets/sword.svg';
import {locals} from '../../moockedData';

type Props = {
    firstLine: boolean;
    index: number,
    protagonistList : Protagonist[],
    data: FightPhaseData,
    updateProtagonistB: (newProtagonistB: number) => void,
    updateLocal: (newLocal: number) => void,
    handleSupress: (indexToSupress: number) => void
}
const matrice= [
  ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19', 'RA', '11', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA'],
  ['1', '2', '4', '6', '8', '10', '12', '14', '16', '18', '19', '11', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA'],
  ['1', '2', '3', '5', '7', '9', '11', '13', '15', '17', '18', '11', '19', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA'],
  ['EA', '1', '2', '4', '6', '8', '10', '12', '14', '16', '18', '11', '18', '19', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA'],
  ['EA', '1', '2', '4', '5', '7', '9', '11', '13', '15', '17', '11', '18', '18', '19', '19', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA'],
  ['EA', 'EA', '1', '3', '5', '6', '8', '10', '12', '14', '16', '11', '17', '18', '18', '19', '19', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA'],
  ['EA', 'EA', '1', '3', '4', '6', '7', '9', '11', '13', '15', '11', '17', '17', '18', '18', '19', '19', 'RA', 'RA', 'RA', 'RA', 'RA'],
  ['EA', 'EA', 'EA', '2', '4', '5', '7', '8', '10', '12', '14', '11', '16', '17', '17', '18', '18', '19', '19', 'RA', 'RA', 'RA', 'RA'],
  ['EA', 'EA', 'EA', '2', '3', '5', '7', '8', '9', '11', '13', '11', '15', '16', '17', '17', '18', '18', '19', '19', 'RA', 'RA', 'RA'],
  ['EA', 'EA', 'EA', '1', '3', '4', '6', '8', '8', '10', '12', '11', '14', '15', '16', '17', '17', '18', '18', '19', '19', 'RA', 'RA'],
  ['EA', 'EA', 'EA', '1', '2', '4', '6', '7', '8', '9', '11', '11', '13', '14', '15', '16', '16', '17', '17', '18', '18', '19', 'RA'],
  ['EA', 'EA', 'EA', 'EA', '2', '3', '5', '7', '7', '9', '11', '11', '11', '13', '14', '15', '15', '16', '16', '17', '17', '18', '18'],
  ['EA', 'EA', 'EA', 'EA', '1', '3', '5', '6', '7', '8', '10', '11', '11', '12', '13', '14', '15', '15', '16', '16', '17', '17', '18'],
  ['EA', 'EA', 'EA', 'EA', '1', '2', '4', '6', '6', '8', '10', '11', '10', '12', '12', '13', '14', '14', '15', '15', '16', '16', '17'],
  ['EA', 'EA', 'EA', 'EA', 'EA', '2', '4', '5', '6', '7', '9', '11', '10', '11', '12', '13', '14', '14', '15', '15', '16', '16', '17'],
  ['EA', 'EA', 'EA', 'EA', 'EA', '1', '3', '5', '5', '7', '9', '11', '9', '10', '11', '13', '13', '14', '14', '15', '15', '16', '17'],
  ['EA', 'EA', 'EA', 'EA', 'EA', '1', '3', '4', '5', '6', '8', '11', '8', '9', '10', '12', '13', '14', '14', '15', '15', '16', '17'],
  ['EA', 'EA', 'EA', 'EA', 'EA', 'EA', '2', '4', '4', '6', '8', '11', '8', '9', '10', '11', '12', '14', '14', '15', '15', '16', '16'],
  ['EA', 'EA', 'EA', 'EA', 'EA', 'EA', '2', '3', '4', '5', '7', '11', '7', '8', '19', '11', '11', '13', '14', '15', '15', '16', '16'],
  ['EA', 'EA', 'EA', 'EA', 'EA', 'EA', '1', '3', '3', '5', '6', '11', '7', '7', '8', '10', '11', '12', '13', '15', '15', '16', '16'],
  ['EA', 'EA', 'EA', 'EA', 'EA', 'EA', '1', '2', '3', '4', '5', '11', '6', '6', '7', '9', '10', '11', '12', '14', '15', '16', '16'],
  ['EA', 'EA', 'EA', 'EA', 'EA', 'EA', 'EA', '2', '2', '3', '4', '11', '5', '6', '7', '8', '9', '10', '11', '13', '15', '16', '16'],
];

const localsTrad = {
  head: 'tête',
  arm: 'bras',
  leg: 'jambes',
  genitals: 'parties génitales',
  torso: 'Torse',
  swordArm: 'Bras armé',
  random: 'Au hasard !',
};
const localModif={
  head: {
    def: 0,
    at: -5,
  },
  torso: {
    def: 0,
    at: 2,
  },
  arm: {
    def: -1,
    at: 1,
  },
  swordArm: {
    def: 0,
    at: 1,
  },
  leg: {
    def: -1,
    at: -1,
  },
  genitals: {
    def: 0,
    at: -5,
  },
};

const FightLine = ({protagonistList, data, firstLine, updateLocal, updateProtagonistB}: Props) => {
  const getOpponentList = () => {
    const list = protagonistList.filter((temp, index) => {
      return index !== data.protagonistA;
    }).map((elt) => elt.name);
    if (list.length > 0) return list;
    else return ['Aucune cible'];
  };
  let roll10 = Math.floor(Math.random() * 10);
  if (roll10 > 7) {
    roll10 = 5;
  } else if (roll10 > 3) {
    roll10 = 4;
  }
  const local = locals[data.local] === 'random'? locals[roll10]: locals[data.local];
  let at = 10;
  let prd = 10;
  if (
    local === 'head' ||
    local === 'torso' ||
    local === 'swordArm' ||
    local === 'arm' ||
    local === 'genitals' ||
    local === 'leg'
  ) {
    at = protagonistList[data.protagonistA].at-1 + localModif[local].at;
    prd = protagonistList[data.protagonistB].prd-1 + localModif[local].def;
  }

  if (at > 21) at = 21;
  if (prd> 21) prd = 21;
  if (at < 0) at = 0;
  if (prd < 0) prd = 0;

  return (
    <div className='text-xl flex text-brown gap-4'>
      <div className={`
        flex
        h-20
        ${protagonistList[data.protagonistA].npc ? 'bg-bladeBrown' : 'bg-brown'}
        w-[600px]
        rounded-2xl
        p-3
        items-center
        justify-around`}
      >
        <div className='w-[157px] h-[50px] bg-white rounded-2xl flex items-center justify-center'>
          {protagonistList[data.protagonistA].name || 'Nom indéfinie'} </div>
        <span className="font-bubblegum text-swamp text-2xl">~ <span className="font-bubblegum text-orange">
          VS</span> ~</span>
        <InputSelect
          emptyValue="cible sans nom"
          className='text-xl'
          width='[157px]'
          height='[50px]'
          options={getOpponentList()}
          handleChange={updateProtagonistB}
          value={data.protagonistB}
        />
        <div className='relative w-48'>
          <TargetIcon className='absolute' />
          <InputSelect
            className='text-xl absolute top-0 left-10'
            width='[157px]'
            height='[50px]'
            options={locals.map((elt) => localsTrad[elt])}
            handleChange={updateLocal}
            value={data.local}
          />
        </div>
      </div>
      {
        firstLine &&
        <div className='relative w-60'>
          <SwordIcon className='absolute top-2 left-0 w-16 opacity-50'/>
          <div
            className='
              absolute
              text-xl
              left-9
              flex
              h-20
              border-8
              border-brown
              bg-white
              rounded-2xl
              p-3
              items-center
              justify-around
              w-32'
          >
            {localsTrad[local]}
          </div>
          <span className=' left-[174px] font-extrabold absolute z-10 top-6'>{matrice[prd][at]} </span>
          <Blowup className=' left-[154px] absolute top-1' />
        </div>
      }
    </div>
  );
};

export default FightLine;
