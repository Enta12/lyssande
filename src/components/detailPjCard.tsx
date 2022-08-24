import {PjType} from '../types';
import React, {useContext} from 'react';
import {ReactComponent as EditButton} from '../assets/editButton.svg';
import {AuthContext} from '../AppRoute';

type Props = {
  pjData: PjType;
  onEdit: () => void
}

const DetailPjCard = ( {pjData, onEdit} : Props) => {
  const {user} = useContext(AuthContext);
  return (
    <div className="
      w-96
      border-orange
      border-8
      rounded-2xl
      font-bubblegum
      bg-beige
      text-swamp
      relative"
    >
      <div className="
        bg-orange
        my-1
        justify-center
        flex
      ">
        {pjData.name}
      </div>
      <img
        className="
          min-w-full
          h-60
          object-cover
          border-y-8
          border-orange"
        alt={pjData.name}
        src={pjData.img}/>
      <div
        className="
          flex
          flex-col
          mx-1.5
          py-4"
      >
        <span
          className="flex justify-between w-full"
        >
          <Field name="RACE" value={pjData.race}/>
          <Field name="NIVEAU" value={pjData.level.toString()} />
        </span>
        <Field name="CLASSE" value={pjData.job || 'Aucun'}/>
        <Field name="ALIGNEMENT"
          value={`${pjData.alignment.law} ${pjData.alignment.moral}`}/>
        <Field name="OR" value={pjData.gold.toString()}/>
        <div className="w-full h-1 rounded-b-full bg-orange my-4" />
        <Field name="LIEU" value="Bientôt disponible"/>
        <Field name="DATES" value="Bientôt disponible"/>
        <div className="w-full h-1 rounded-b-full bg-orange mb-10 my-4" />
      </div>
      {
        user?.userId === pjData.player &&
        <EditButton
          className='bottom-0 right-0 absolute cursor-pointer'
          onClick={onEdit}
        />
      }
    </div>
  );
};

export default DetailPjCard;

const Field = ({name, value} : {name: string, value: string}) => {
  return (
    <div className="text-brown flex gap-2">
      {name}
      <div className="text-swamp">{value}</div>
    </div>
  );
};
