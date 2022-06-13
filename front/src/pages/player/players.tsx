import {PlayerCard, Title} from '../../components';
import {playerMoocked} from '../../moockedData';
import React from 'react';

const Players = () => {
  const players = playerMoocked;
  return (
    <div className='pt-8 w-full flex flex-col'>
      <Title title="LES JOUEURS" />
      <div className="mt-8 grid grid-cols-3 grid-flow-rows gap-8 ">
        {
          players.map((player, index) =>
            <PlayerCard key={index} player={player} />)
        }
      </div>
    </div>
  );
};

export default Players;
