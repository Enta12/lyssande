import React, {ChangeEvent} from 'react';
import {Protagonist} from '../../types';

type Props = {
    protagonist: Protagonist,
    handleChange: (index: number, e: ChangeEvent<HTMLInputElement>) => void,
    index: number
}

const ProtagonistForm = ({protagonist, handleChange, index}: Props) => {
  return (
    <div className="m-1">
      <div>
        <label htmlFor="name">Nom :</label>
        <label htmlFor="cou">Cour :</label>
      </div>
      <div>
        <input
          value={protagonist.name}
          onChange={ (e) => handleChange(index, e)}
          name="name"
          type="text"
        />
        <input
          value={protagonist.cou}
          onChange={ (e) => handleChange(index, e)}
          name="cou"
          type="number"
        />
      </div>
      <div>
        <label htmlFor="at">AT :</label>
        <label htmlFor="prd">PRD :</label>
      </div>
      <div>
        <input
          value={protagonist.at}
          onChange={ (e) => handleChange(index, e)}
          type="number"
          name="at"
        />
        <input
          value={protagonist.prd}
          onChange={ (e) => handleChange(index, e)}
          type="number"
          name="prd"
        />
      </div>
    </div>
  );
};

export default ProtagonistForm;
