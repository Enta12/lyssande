import { MouseEvent, useState, useRef } from "react";
import ReactTooltip from "react-tooltip";
import { Pos, PjType } from "../../types";
import PjCard from "../pjCard";


type Props = {
    pjs : PjType[],
    img: string,
    mapName: string,

}


const Map = ({img, pjs, mapName}: Props) => {
    const mapRef = useRef<HTMLImageElement>(null);
    const [currentPos, setCurrentPos] = useState([{x: -1, y:-1}]);
    
    const tokens: JSX.Element[] = []
    const placeSelectedPj = (event : MouseEvent<HTMLImageElement>) => {
        if(pjSelected !== -1 && mapRef?.current
            && event.clientX > mapRef.current.x - window.scrollX
            && event.clientX < mapRef.current.x + mapRef.current.width - window.scrollX
            && event.clientY > mapRef.current.y - window.scrollY
            && event.clientY < mapRef.current.y + mapRef.current.height - window.scrollY
            ) {
                const currentItem = [...currentPos];
                currentItem[pjSelected] = {x:event.clientX + window.scrollX,  y:event.clientY + window.scrollY};
                setCurrentPos(currentItem)
        }
    }
    pjs.forEach((pj, index) => {
        if(mapRef?.current){
            if(currentPos[index]){
                tokens[index] = <Token img={pjs[index].img} pj={pjs[index]} pos={currentPos[index]}/>
            }
            else if(pj.position)
            tokens[index] = <Token img={pj.img} key={pj.name} pj={pj} pos={pj.position}/>
        }
    })

    const updatePjs = () => {
        /* TODO */
        /* Send pjSelected */
    }
    const [pjSelected, setpjSelected] = useState(-1);
    console.log("rendered")
    return (
        <div>
            <img className="" src={img} alt={mapName} onClick={placeSelectedPj} ref={mapRef} />
            {tokens}
            {pjs.map((pj, index) => {
                return (<button onClick={() => {setpjSelected(index)}} key={pj.name}> {pj.name} </button>
            )})}
            {}
        </div>
    )
}

const Token = ({img, pj, pos } : {img: string, pj: PjType, pos: Pos }) => {
    return (
            <>
                <img 
                data-tip 
                data-for={`${pj.name}RegisterTip`}
                src={img} 
                alt={pj.name} 
                className="absolute h-6 w-6 object-cover rounded-xl border border-black"
                style={
                    {
                        top: `${pos.y-12}px`,
                        left: `${pos.x-12}px`
                    }
                }
                />
                <ReactTooltip
                    id={`${pj.name}RegisterTip`} 
                    place="right" 
                    effect="solid"
                    backgroundColor="none"
                 >
                    <PjCard pjData={pj} />
                </ReactTooltip>
            </>
            
    ); 
}

export default Map;