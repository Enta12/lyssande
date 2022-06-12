import PlayerCard from "../../components/playerCard";
import Title from "../../components/title"
import { playerMocked } from "../../moockedData"

const Players = () => {
    const players = playerMocked;
    return (
        <div className='pt-8 w-full flex flex-col'>
            <Title title="LES JOUEURS" />
            <div className="mt-8 grid grid-cols-3 grid-flow-rows gap-8 ">
                {
                    players.map(player => <PlayerCard player={player} />)
                }
            </div>
        </div>
    )
}

export default Players