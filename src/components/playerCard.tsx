import {UserInfo} from '../types';
import React from 'react';

type Props = {
    player: UserInfo;
}

const PlayerCard = ({player}: Props) => {
  return (
    <a href={`player/${player.id}`} className="
            text-lg
            h-24
            w-full
            font-bubblegum
            text-white
            bg-brown
            rounded-xl
            p-5
            flex
            items-center
        ">
      {player.name}
    </a>
  );
};

export default PlayerCard;
