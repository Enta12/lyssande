import { ChangeEvent, useState } from "react";
type Protagonist = {
    name: string;
    at: number;
    prd: number;
    cou: number;
}

const protaTest = {
    name: "fluffy",
    at: 12,
    prd: 12,
    cou: 13,
}

function FightPage() {
    const [protagonistList, setProtagonistList] = useState<Protagonist[]>([protaTest]);
    return (
        <>


            <ProtagonistListForm protagonistList={protagonistList} setProtagonistList={setProtagonistList} />  
        </>
    );
}

export default FightPage

const FightLine = ({protagonists, index}: {protagonists : Protagonist[], index: number}) => {
    
}

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

const ProtagonistForm = ({protagonist, handleChange, index}: {protagonist: Protagonist, handleChange: (index: number, e: ChangeEvent<HTMLInputElement>) => void, index: number}) => {
    return (
        <div className="m-1">
            <div>
                <label htmlFor="name">Nom :</label>
                <label htmlFor="cou">Cour :</label>
            </div>
            <div>
                <input value={protagonist.name} onChange={ e => handleChange(index, e)} name="name" type="text"></input>
                <input value={protagonist.cou} onChange={ e => handleChange(index, e)} name="cou" type="number"></input>
            </div>
            <div>
                <label htmlFor="at">AT :</label>
                <label htmlFor="prd">PRD :</label>
            </div>
            <div>
                <input value={protagonist.at} onChange={ e => handleChange(index, e)} type="number" name="at"></input>
                <input value={protagonist.prd} onChange={ e => handleChange(index, e)} type="number" name="prd"></input>
            </div>
        </div>
    )
}