import { useState } from "react"
import doneIcon from "../../../assets/done.svg"

type Category = "moral" | "law";
type Props = {
    width?: string;
    height?: string;
}
const status = {
    moral: ["GOOD", "NEUTRAL", "EVIL"],
    law: ["LAWFUL", "NEUTRAL", "CHAOTIC"]
};


const AlignmentInput = ({width= "3/4"}: Props) => {
    const [moral, setMoral] = useState(0);
    const [law, setLaw] = useState(0);
    const handleChange =(e: React.ChangeEvent<HTMLInputElement>, category: Category) => {
        let value = -1;
        switch(e.target.value){
            case 'GOOD':
                value=0;
                break;
            case 'LAWFUL':
                value=0;
                break;
            case 'NEUTRAL':
                value=1;
                break;
            case 'EVIL':
                value=2;
                break;
            case 'CHAOTIC':
                value=2;
                break;
        }
        if(value !== -1){
            category === 'law' ? setLaw(value) : setMoral(value)
        } 
    }
    
    return (
        <div className={`bg-white rounded-2xl w-${width} p-5 flex flex-col justify-between`}>
            <span className="mb-4 text-brown text-2xl font-inter">Alignement</span>
            <div className="flex items-center justify-center w-full">
                <Column category="moral" value={moral} handleChange={handleChange} left/>
                <Column category="law" value={law} handleChange={handleChange}/>
            </div>
            
        </div>
    )
}

export default AlignmentInput

const Column = ({category, value, handleChange, left=false} : {left?: boolean, category: Category, value: number, handleChange: (e: React.ChangeEvent<HTMLInputElement>, category: Category) => void}) => {
    return (
        <div className={`flex flex-col justify-between w-full h-36 ${left? "border-r-4 border-orange":"px-5"}`}>
            {status[category].map((element, index) => <CheckInput key={element} name={element} handleChange={handleChange} category={category} checked={index === value}/>)}
            <input name={category} value={status[category][value]} type="hidden" />
        </div>
    )
}

const CheckInput = ({category, checked, handleChange, name} : {category: Category, checked: boolean, handleChange: (e: React.ChangeEvent<HTMLInputElement>, category: Category) => void, name: string}) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!checked) {
            handleChange(e, category);
        }
    }
    return (
        <div className="flex gap-5 text-swamp">
            <div className="relative">
                <input value={name} className=" border-swamp border-2 appearance-none w-6 h-6 rounded-full" type="checkbox" onChange={e => onChange(e)} />
                {checked && <img className="absolute inset-0" src={doneIcon} alt="check" />}
            </div>
            {name}
        </div>
    )
}