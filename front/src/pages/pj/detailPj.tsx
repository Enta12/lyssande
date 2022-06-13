import {useParams} from 'react-router-dom';
import {DetailPjCard, Title} from '../../components';
import {pjsMoocked} from '../../moockedData';
import React from 'react';

const DetailPj = () => {
  const params = useParams();
  const id = parseInt(params.id || '0');
  const selectedPj = pjsMoocked[id];
  return (
    <div className="flex w-full py-10">
      <div className="flex-1 flex flex-col gap-4">
        <Title title="LE PERSONNAGE" />
        <DetailPjCard pjData={selectedPj} />
      </div>
      <div className="flex flex-col flex-1">
        <Title title="SON HISTOIRE" />
        <p className="font-bubblegum mt-6 mb-8">
          {selectedPj.story}
        </p>
        <Title title="SES QUÊTES" />
      </div>

    </div>
  );
};

export default DetailPj;
