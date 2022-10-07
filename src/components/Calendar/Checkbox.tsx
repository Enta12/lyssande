import avalabilityNone from 'assets/icon/availabilityNone.svg';
import avalabilityIrl from 'assets/icon/availabilityIrl.svg';
import avalabilityIrlOrIl from 'assets/icon/availabilityIrlOrIl.svg';
import avalabilityIl from 'assets/icon/availabilityIl.svg';
import avalabilityIG from 'assets/icon/availabilityIG.svg';
import avalabilityRest from 'assets/icon/availabilityRest.svg';
import React from 'react';
import {Platform} from 'types';

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
