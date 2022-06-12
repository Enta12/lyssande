import { useRef, useState, useEffect } from "react";
import {ReactComponent as OpenIcon} from "../assets/openInputSelect.svg"
import { PjType } from "../types";
import PjCard from "./pjCard";

type Props = {
    pjs: PjType[];
    playerName: string;
    selectedPj: number | null;
    playerIndex: number;
    setSelectedPj: (playerIndex: number, pjIndex: number) => void;
    quest: number;
}

const PjSessionSelector = ({quest, pjs, playerName, selectedPj, setSelectedPj, playerIndex}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLInputElement>(null);
    const handleClick= (pjIndex: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setSelectedPj(playerIndex, pjIndex)
        setIsOpen(false);
        e.stopPropagation();
    }
    const onCardClick = () => {
        setIsOpen(!isOpen);
    }
    useEffect(() => {
        const onClickOutside = () => {
          setIsOpen(false)
        };
        const handleClickOutside = (event: any) => {
          if (selectRef.current && !selectRef.current.contains(event.target)) {
            onClickOutside && onClickOutside();
          }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
    },[selectRef]);
    const selectedPjData = pjs.filter(pj => pj.id === selectedPj)[0];
    return (
        <div ref={selectRef} onClick={onCardClick} className={`${isOpen? "bg-darkBrown" : "bg-brown cursor-pointer"} p-4 w-full rounded-lg flex flex-col gap-4`} >
            <div 
                className="flex justify-between w-full font-bubblegum text-white text-lg items-center"
                onClick={() =>setIsOpen(!isOpen)}
            >   
                {playerName}
                <div className="flex justify-end gap-28">
                    {((selectedPj || selectedPj===0) && <SelectedPj level={selectedPjData.level} name={selectedPjData.name} />)|| ""}
                    <OpenIcon className={isOpen? "rotate-180 transition-transform" : "transition-transform"} />
                </div>
            </div>
            <div className={`${!isOpen && "hidden"}`}>
                <div className="grid grid-cols-4 grid-flow-rows gap-5 w-[62rem]">
                    { pjs.map((pjData, index) => <PjCard selected={pjData.id === selectedPj} suposed={quest === pjData.quest} onClick={handleClick} selectable key={index} pjData={pjData}/>) }
                </div>
            </div>
        </div>
    )
}

export default PjSessionSelector

const SelectedPj = ({name, level}: {name: string, level: number}) => {
    return (
        <div className="flex gap-10 items-center">
            <div className="flex flex-col w-24 items-center">
                <div className="w-full h-1 rounded-t-full bg-orange" />
                    {name}
                <div className="w-full h-1 rounded-b-full bg-orange" />
            </div>
            <div>
                {`NIVEAU ${level}`}
            </div>
        </div>
       
    )
}

