import React from 'react';

type Props = {
  firstLine: string,
  secondLine?: string
}

const HeaderCase = ({firstLine, secondLine} : Props) => {
  return (
    <th className="w-40 flex-col justify-center items-center">
      {firstLine}
      {
        secondLine && <><br/>{secondLine}</>
      }
    </th>
  );
};

export default HeaderCase;
