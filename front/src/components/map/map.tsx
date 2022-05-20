import { pseudoRandomBytes } from "crypto";
import { MouseEvent, useState, useRef, SetStateAction, Dispatch } from "react";
type Pos = {
    x: number,
    y: number
}
type Props = {
    pjs : {
        positions? : Pos,
        name: string,
        img: string
    }[],
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
                tokens[index] = <Token img={pjs[index].img} alt={pjs[index].name} pos={currentPos[index]} imgPos={{x: mapRef.current.x, y: mapRef.current.y}}/>
            }
            else if(pj.positions)
            tokens[index] = <Token img={pj.img} key={pj.name} alt={pj.name} pos={pj.positions} imgPos={{x: mapRef.current.x, y: mapRef.current.y}}/>
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

const Token = ({img, alt, pos, imgPos} : {img: string, alt: string, pos: Pos, imgPos: Pos}) => {
    return (

            <img 
            src={img} 
            alt={alt} 
            className="absolute h-6 w-6 object-cover rounded-xl border border-black"
            style={
                {
                    top: `${pos.y-12}px`,
                    left: `${pos.x-12}px`
                }
            }
         />
    ); 
}

export default Map;