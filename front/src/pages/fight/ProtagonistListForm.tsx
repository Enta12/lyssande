import { ChangeEvent } from "react";
import { Protagonist } from "../../types";
import ProtagonistForm from "./ProtagonistForm";

const ProtagonistListForm = ({protagonistList, setProtagonistList}: {protagonistList: Protagonist[], setProtagonistList: React.Dispatch<React.SetStateAction<Protagonist[]>>}) => {
    const addProtagonist = () => {
        const protagonistListTemp = [...protagonistList];
        protagonistListTemp.push({
            name: "name",
            at: 10,
            prd: 10,
            cou: 10,
        });
        setProtagonistList(protagonistListTemp);
    }
    const updateProtagonist = (index: number, e : ChangeEvent<HTMLInputElement>) => {
        const protagonistListTemp = [...protagonistList];
        if(e.target.name === "name" ){
            protagonistListTemp[index][e.target.name] = e.target.value;
        }
        else if(e.target.name === "at" || e.target.name === "prd" || e.target.name === "cou" ){
            protagonistListTemp[index][e.target.name] = parseInt(e.target.value);
        }
        setProtagonistList([...protagonistListTemp]);
    }
    return (
        <>
            <div className="flex flex-wrap justify-around w-full gap-1">
                {protagonistList.map((protagonist, index) => {
                    return (
                        <ProtagonistForm key={index} protagonist={protagonist} handleChange={updateProtagonist} index={index}/>
                    )
                })}
                <button className="m-1" onClick={addProtagonist} >Ajouter un combattant</button>
            </div>
        </>
    )
}

export default ProtagonistListForm