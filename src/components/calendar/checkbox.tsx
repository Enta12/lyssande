import avalabilityNone from '../../assets/availabilityNone.svg';
import avalabilityIrl from '../../assets/availabilityIrl.svg';
import avalabilityIrlOrIl from '../../assets/availabilityIrlOrIl.svg';
import avalabilityIl from '../../assets/availabilityIl.svg';
import React from 'react';
import {Platform} from '../../types';

type Props = {
    checkboxState: 'none' | 'online' | 'just-irl' | 'irl-or-online';
    onChange?: (newPlatform: Platform) => void;
}

const checkbox = {
  'none': avalabilityNone,
  'online': avalabilityIl,
  'just-irl': avalabilityIrl,
  'irl-or-online': avalabilityIrlOrIl,
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
      <button
        onClick={onClick}
        onContextMenu={rightClick}
      >
        <img src={checkbox[checkboxState]} alt={checkboxState}/>
      </button>
    </td>
  );
};

export default Checkbox;
