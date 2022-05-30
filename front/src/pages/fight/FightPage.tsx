import { ChangeEvent, useState } from "react";
type Protagonist = {
    name: string;
    at: number;
    prd: number;
    cou: number;
}

type Local = 'head' | 'torso' | 'arm' | 'swordArm' | 'leg' | 'genitals' | 'locals' | 'random'

type FightPhaseData = {
    protagonistA : number;
    protagonistB : number;
    local: Local;
}
const locals : Local[] = [
    'head' ,
    'torso',
    'arm',
    'swordArm',
    'leg',
    'genitals',
    'random'
]
const protaTest = {
    name: "fluffy",
    at: 12,
    prd: 12,
    cou: 13,
}
const matrice= [
    ["1", "3", "5", "7", "9", "11", "13", "15", "17", "19", "RA", "11", "RA", "RA", "RA", "RA", "RA", "RA", "RA", "RA", "RA", "RA", "RA"],
    ["1", "2", "4", "6", "8", "10", "12", "14", "16", "18", "19", "11", "RA", "RA", "RA", "RA", "RA", "RA", "RA", "RA", "RA", "RA", "RA"],
    ["1", "2", "3", "5", "7", "9", "11", "13", "15", "17", "18", "11", "19", "RA", "RA", "RA", "RA", "RA", "RA", "RA", "RA", "RA", "RA"],
    ["EA", "1", "2", "4", "6", "8", "10", "12", "14", "16", "18", "11", "18", "19", "RA", "RA", "RA", "RA", "RA", "RA", "RA", "RA", "RA"],
    ["EA", "1", "2", "4", "5", "7", "9", "11", "13", "15", "17", "11", "18", "18", "19", "19", "RA", "RA", "RA", "RA", "RA", "RA", "RA"],
    ["EA", "EA", "1", "3", "5", "6", "8", "10", "12", "14", "16", "11", "17", "18", "18", "19", "19", "RA", "RA", "RA", "RA", "RA", "RA"],
    ["EA", "EA", "1", "3", "4", "6", "7", "9", "11", "13", "15", "11", "17", "17", "18", "18", "19", "19", "RA", "RA", "RA", "RA", "RA"],
    ["EA", "EA", "EA", "2", "4", "5", "7", "8", "10", "12", "14", "11", "16", "17", "17", "18", "18", "19", "19", "RA", "RA", "RA", "RA"],
    ["EA", "EA", "EA", "2", "3", "5", "7", "8", "9", "11", "13", "11", "15", "16", "17", "17", "18", "18", "19", "19", "RA", "RA", "RA"],
    ["EA", "EA", "EA", "1", "3", "4", "6", "8", "8", "10", "12", "11", "14", "15", "16", "17", "17", "18", "18", "19", "19", "RA", "RA"],
    ["EA", "EA", "EA", "1", "2", "4", "6", "7", "8", "9", "11", "11", "13", "14", "15", "16", "16", "17", "17", "18", "18", "19", "RA"],
    ["EA", "EA", "EA", "EA", "2", "3", "5", "7", "7", "9", "11", "11", "11", "13", "14", "15", "15", "16", "16", "17", "17", "18", "18"],
    ["EA", "EA", "EA", "EA", "1", "3", "5", "6", "7", "8", "10", "11", "11", "12", "13", "14", "15", "15", "16", "16", "17", "17", "18"],
    ["EA", "EA", "EA", "EA", "1", "2", "4", "6", "6", "8", "10", "11", "10", "12", "12", "13", "14", "14", "15", "15", "16", "16", "17"],
    ["EA", "EA", "EA", "EA", "EA", "2", "4", "5", "6", "7", "9", "11", "10", "11", "12", "13", "14", "14", "15", "15", "16", "16", "17"],
    ["EA", "EA", "EA", "EA", "EA", "1", "3", "5", "5", "7", "9", "11", "9", "10", "11", "13", "13", "14", "14", "15", "15", "16", "17"],
    ["EA", "EA", "EA", "EA", "EA", "1", "3", "4", "5", "6", "8", "11", "8", "9", "10", "12", "13", "14", "14", "15", "15", "16", "17"],
    ["EA", "EA", "EA", "EA", "EA", "EA", "2", "4", "4", "6", "8", "11", "8", "9", "10", "11", "12", "14", "14", "15", "15", "16", "16"],
    ["EA", "EA", "EA", "EA", "EA", "EA", "2", "3", "4", "5", "7", "11", "7", "8", "19", "11", "11", "13", "14", "15", "15", "16", "16"],
    ["EA", "EA", "EA", "EA", "EA", "EA", "1", "3", "3", "5", "6", "11", "7", "7", "8", "10", "11", "12", "13", "15", "15", "16", "16"],
    ["EA", "EA", "EA", "EA", "EA", "EA", "1", "2", "3", "4", "5", "11", "6", "6", "7", "9", "10", "11", "12", "14", "15", "16", "16"],
    ["EA", "EA", "EA", "EA", "EA", "EA", "EA", "2", "2", "3", "4", "11", "5", "6", "7", "8", "9", "10", "11", "13", "15", "16", "16"],    
]

const localModif={
    head:{
        def: 0,
        at: -5
    },
    torso: {
        def: 0,
        at: 2
    },
    arm: {
        def: -1,
        at: 1
    },
    swordArm:{
        def: 0,
        at: 1
    },
    leg: {
        def: -1,
        at: -1
    },
    genitals:{
        def: 0,
        at: -5
    }
}

function FightPage() {
    const [protagonistList, setProtagonistList] = useState<Protagonist[]>([protaTest]);
    const [fightElementData, setFightElementData] = useState<FightPhaseData[]>([]);
    const [stateSelected, setStateSelected] = useState(0);
    const nextSelected = () => {
        if(stateSelected + 1 === fightElementData.length) {
            setStateSelected(0)
        }
        else setStateSelected(stateSelected + 1)
    }
    const addFightElement = () => {
        const fightElementDataTemp = [...fightElementData];
        fightElementDataTemp.push({
            protagonistA : 0,
            protagonistB : 0,
            local: 'torso'
        })
        setFightElementData(fightElementDataTemp);
    }
    const handleChange = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
        const fightElementDataTemp = [...fightElementData];
        if(e.target.name === 'protagonistA' || e.target.name === 'protagonistB'){
            fightElementDataTemp[index][e.target.name] = parseInt(e.target.value);
        }
        if(e.target.name === 'local' && (
             e.target.value === 'torso' ||
             e.target.value === 'head' ||
             e.target.value === 'arm' ||
             e.target.value === 'swordArm' ||
             e.target.value === 'leg' ||
             e.target.value === 'random' ||
             e.target.value === 'genitals')){
                fightElementDataTemp[index][e.target.name] = e.target.value;
        }
        setFightElementData(fightElementDataTemp);
    }
    return (
        <>
            {fightElementData.map((data, index)=> {
                return (
                    <FightLine isSelected={stateSelected === index} protagonistList={protagonistList} data={data} handleChange={handleChange} index={index} />
                )
            })}
            <button onClick={addFightElement}>Ajouter un tour</button>
            <button onClick={nextSelected}>Tour suivant</button>
            <ProtagonistListForm protagonistList={protagonistList} setProtagonistList={setProtagonistList} /> 
        </>
    );
}

export default FightPage

const FightLine = ({isSelected, protagonistList, data, handleChange, index}: {isSelected: boolean, index: number, protagonistList : Protagonist[], data: FightPhaseData, handleChange: (e: ChangeEvent<HTMLSelectElement>, index:number) => void}) => {
    const local = data.local === 'random'? locals[Math.floor(Math.random() * 6)]: data.local;
    let at = 10;
    let prd = 10;
    if(local === 'head' || local === 'torso' || local === 'swordArm' || local === 'arm' || local === 'genitals' || local === 'leg' ){
        at = protagonistList[data.protagonistA].at-1 + localModif[local].at
        prd = protagonistList[data.protagonistB].prd-1 + localModif[local].def
    }
   
    if (at > 21) at = 21
    if (prd> 21) prd = 21
    if (at < 0) at = 0
    if (prd < 0) prd = 0 

    return (
        <div className={"flex"}>
            {isSelected && "-------------->"}
            <select value={data.protagonistA} name="protagonistA" onChange={ e => handleChange(e, index)}>
                {protagonistList.map((protagonist, index) =>{
                    return (
                        <option key={`${index}OptionA`} value={index}>
                            {protagonist.name}
                        </option>
                    )
                })}
            </select>
            <select value={data.local} name="local" onChange={ e => handleChange(e, index)}>
                {locals.map((local, index) =>{
                    return (
                        <option key={`${index}Local`} value={local}>
                            {local}
                        </option>
                    )
                })}
            </select>
            <select  value={data.protagonistB} name="protagonistB" onChange={ e => handleChange(e, index)}>
                {protagonistList.map((protagonist, index) =>{
                    return (
                        <option key={`${index}OptionB`} value={index}>
                            {protagonist.name}
                        </option>
                    )
                })}
            </select>
            {local}
           { matrice[prd][at]}
        </div>

    )
    
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