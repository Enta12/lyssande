import { PjType } from "../types"

const PjCard = (props : {pjData: PjType}) => {
    const {pjData} = props
    return (
        <div className="h-96 w-56 border-orange border-8 rounded-2xl bg-beige text-swamp">
            <div className="bg-orange my-1 justify-center flex">{pjData.name}</div>
            <img className="min-w-full h-72 object-cover border-y-8 border-orange" alt={pjData.name} src={pjData.img}/>
            <div className="flex justify-between mx-1.5 font-bubblegum">
                <span>{pjData.race}</span>
                <span>Niveau {pjData.level}</span>
            </div>
        </div>
    )
}

export default PjCard