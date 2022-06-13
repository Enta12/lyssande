import checkboxMaybe from '../../assets/checkboxMaybe.svg';
import checkboxNo from '../../assets/checkboxNo.svg';
import checkboxYes from '../../assets/CheckboxYes.svg';
import React from 'react';

type Props = {
    isEditable: boolean,
    checkboxState: 'maybe' | 'no' | 'yes'
}

const checkbox = {
  maybe: checkboxMaybe,
  no: checkboxNo,
  yes: checkboxYes,
};

const Checkbox = ({isEditable, checkboxState}: Props) => {
  return (
    <td className="w-40 text-center flex justify-center">
      {
            isEditable?
            <button>
              <img src={checkbox[checkboxState]} alt={checkboxState}/>
            </button> :
            <img src={checkbox[checkboxState]} alt={checkboxState}/>
      }
    </td>
  );
};

export default Checkbox;
