import { ChangeEvent } from "react";
import { FightPhaseData, Local, Protagonist } from "../../types";

type Props ={
    isSelected: boolean, 
    index: number, 
    protagonistList : Protagonist[], 
    data: FightPhaseData,
    handleChange: (e: ChangeEvent<HTMLSelectElement>, index:number) => void,
    handleSupress: (indexToSupress: number) => void
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
const locals : Local[] = [
    'head' ,
    'arm',
    'leg',
    'genitals',
    'torso',
    'swordArm',
    'random'
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

const FightLine = ({isSelected, protagonistList, data, handleChange, handleSupress, index}: Props) => {
    let roll10 = Math.floor(Math.random() * 10);
    if (roll10 > 7){
        roll10 = 5
    }
    else if (roll10 > 3){
        roll10 = 4
    }
    const local = data.local === 'random'? locals[roll10]: data.local;

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
           <button onClick={e => handleSupress(index)} >Suprimer la ligne</button>
        </div>
    )   
}

export default FightLine