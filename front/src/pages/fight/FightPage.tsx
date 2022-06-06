import { ChangeEvent, useState } from "react";
import { FightPhaseData, Protagonist } from "../../types";
import FightLine from "./fightLine";
import ProtagonistListForm from "./ProtagonistListForm"

const protaTest = {
    name: "fluffy",
    at: 12,
    prd: 12,
    cou: 13,
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
    const filterByCourage = () => {
        const fightElementDataTemp = [...fightElementData];
        fightElementDataTemp.sort((a, b) => {
            return protagonistList[b.protagonistA].cou - protagonistList[a.protagonistA].cou;
        });
        setFightElementData(fightElementDataTemp);
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
    const handleSupress = (indexToSupress : number) => {
        const fightElementDataTemp = fightElementData.filter((el, index) => {
           return index !== indexToSupress
        });
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
                    <FightLine isSelected={stateSelected === index} protagonistList={protagonistList} data={data} handleChange={handleChange} handleSupress={handleSupress} index={index} key={index}/>
                )
            })}
            <button onClick={addFightElement}>Ajouter un tour</button>
            <button onClick={nextSelected}>Tour suivant</button>
            <button onClick = {filterByCourage}>Filtrer par courage</button>
            <ProtagonistListForm protagonistList={protagonistList} setProtagonistList={setProtagonistList} /> 
        </>
    );
}

export default FightPage
