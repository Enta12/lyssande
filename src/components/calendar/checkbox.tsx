import avalabilityNone from '../../assets/availabilityNone.svg';
import avalabilityIrl from '../../assets/availabilityIrl.svg';
import avalabilityIrlOrIl from '../../assets/availabilityIrlOrIl.svg';
import avalabilityIl from '../../assets/availabilityIl.svg';
import avalabilityIG from '../../assets/availabilityIG.svg';
import avalabilityRest from '../../assets/availabilityRest.svg';
import React from 'react';
import {Platform} from '../../types';

type Props = {
    checkboxState: Platform;
    onChange?: (newPlatform: Platform) => void;
}

const checkbox = {
  'none': avalabilityNone,
  'online': avalabilityIl,
  'just-irl': avalabilityIrl,
  'irl-or-online': avalabilityIrlOrIl,
  'rest': avalabilityRest,
  'in-game': avalabilityIG,
};

const Checkbox = ({
  checkboxState,
  onChange: handleChange,
}: Props) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (handleChange) {
      switch (checkboxState) {
        case 'none':
          handleChange('irl-or-online');
          break;
        case 'online':
          handleChange('just-irl');
          break;
        case 'just-irl':
          handleChange('none');
          break;
        case 'irl-or-online':
          handleChange('online');
          break;
      }
    }
  };
  const rightClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (handleChange) {
      switch (checkboxState) {
        case 'none':
          handleChange('just-irl');
          break;
        case 'online':
          handleChange('irl-or-online');
          break;
        case 'just-irl':
          handleChange('online');
          break;
        case 'irl-or-online':
          handleChange('none');
          break;
      }
    }
  };
  return (
    <td className="w-40 text-center flex justify-center">
      {
        (
          checkboxState === 'in-game' ||
          checkboxState === 'rest'
        ) ?
        <img
          className='cursor-no-drop'
          src={checkbox[checkboxState]}
          alt={checkboxState}/> :
        <button
          onClick={onClick}
          onContextMenu={rightClick}
        >
          <img src={checkbox[checkboxState]} alt={checkboxState}/>
        </button>
      }
    </td>
  );
};

export default Checkbox;
