import { Player } from "../types";

type Props = {
    player: Player;
}

const PlayerCard = ({player}: Props) => {
    return (
        <a href={`player/${player.id}`} className="text-lg h-24 w-80 font-bubblegum text-white bg-brown rounded-xl p-5 flex items-center">
            {player.name}
        </a>
    )
}

export default PlayerCard;