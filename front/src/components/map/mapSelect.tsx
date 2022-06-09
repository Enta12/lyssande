import { Player } from "../../types"
import {ReactComponent as OpenIcon} from "../../assets/OpenInputSelect.svg"

type Props ={
    players : Player[];
    value: string[];
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
const MapSelect = ({players, handleChange, value}: Props) => {
    return (
        <div className="relative">
            <div>Filtrer par joueur </div>
            <div className="absolute">
                {players.map((player, index) => {
                    return (
                        <div key={index}>{player.name}</div>
                    )
                })}
            </div>
        </div>
    )
}
export default MapSelect