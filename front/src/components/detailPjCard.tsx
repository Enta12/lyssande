import { PjType } from "../types"

const DetailPjCard = (props : {pjData: PjType}) => {
    const {pjData} = props
    return (
        <div className="w-96 border-orange border-8 rounded-2xl font-bubblegum bg-beige text-swamp">
            <div className="bg-orange my-1 justify-center flex">{pjData.name}</div>
            <img className="min-w-full h-60 object-cover border-y-8 border-orange" alt={pjData.name} src={pjData.img}/>
            <div className="flex flex-col mx-1.5  py-4">
                <span className="flex justify-between w-full"><Field name="RACE" value={pjData.race}/> <Field name="NIVEAU" value={pjData.level.toString()} /></span>
                <Field name="CLASSE" value={pjData.race}/>
                <Field name="ALIGNEMENT" value={`${pjData.alignement.law} ${pjData.alignement.moral}`}/>
                <Field name="OR" value={pjData.gold.toString()}/>
                <div className="w-full h-1 rounded-b-full bg-orange my-4" />
                <Field name="LIEU" value="Soon"/>
                <Field name="DATES" value="Soon"/>
                <div className="w-full h-1 rounded-b-full bg-orange mb-10 my-4" />
            </div>
        </div>
    )
}

export default DetailPjCard

const Field = ({name, value} : {name: string, value: string}) => {
    return(
        <div className="text-brown flex gap-2">
            {name}
            <div className="text-swamp">{value}</div>
        </div>
    )
}