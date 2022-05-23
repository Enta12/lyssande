import { MouseEvent, useState, useRef, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { Pos, PjType } from "../../types";
import PjCard from "../pjCard";
import PrimaryButton from "../primary-button";

type Img = {
    xStart: number;
    width: number;
    yStart: number;
    height: number;
}
type Props = {
    pjs : PjType[],
    img: string,
    mapName: string,
}


const Map = ({img, pjs, mapName}: Props) => {
    const mapRef = useRef<HTMLImageElement>(null);
    const getWidth = () => window.innerWidth 
        || document.documentElement.clientWidth 
        || document.body.clientWidth;
    const [currentPos, setCurrentPos] = useState([{x: -1, y:-1}]);
    const [pjSelected, setpjSelected] = useState(-1);
    const [height, setHeight] = useState(mapRef?.current?.height || 0);
    const tokens: JSX.Element[] = []
    const [dimensions, setDimensions] = useState({ 
        height: window.innerHeight,
        width: window.innerWidth
      })
    
    
    function handleResize() {
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth
        })
    }

    window.addEventListener('resize', handleResize);

    const placeSelectedPj = (event : MouseEvent<HTMLImageElement>) => {
        if(pjSelected !== -1 && mapRef?.current
            && event.clientX > mapRef.current.x - window.scrollX
            && event.clientX < mapRef.current.x + mapRef.current.width - window.scrollX
            && event.clientY > mapRef.current.y - window.scrollY
            && event.clientY < mapRef.current.y + mapRef.current.height - window.scrollY
            ) {
                const currentItem = [...currentPos];
                currentItem[pjSelected] = {
                    x: (event.clientX+window.scrollX-mapRef.current.x)/(mapRef.current.width), 
                    y: (event.clientY+window.scrollY-mapRef.current.y)/(mapRef.current.height)
                };
                setCurrentPos(currentItem)
        }
    }
    const createTokens = () => {
        pjs.forEach((pj, index) => {
            if(mapRef?.current){
                if(currentPos[index]?.x > 0){
                    tokens[index] = 
                    <Token
                    handleClick={() => {setpjSelected(index)}}
                    img={pjs[index].img} 
                    pj={pjs[index]} 
                    key={pj.name} 
                    pos={currentPos[index]}
                    imgCoord={{
                            xStart: mapRef.current.x,
                            width: mapRef.current.width,
                            yStart: mapRef.current.y,
                            height: mapRef.current.height
                        }}
                    />
                }
                else if(pj.position){
                tokens[index] = 
                <Token 
                      handleClick={() => {setpjSelected(index)}}
                    img={pj.img} 
                    key={pj.name} 
                    pj={pj} 
                    pos={pj.position}
                    imgCoord={{
                        xStart: mapRef.current.x,
                        width: mapRef.current.width,
                        yStart: mapRef.current.y,
                        height: mapRef.current.height
                    }}
                />}
            }
        })
    }
    useEffect(() => {
        console.log("dimensions", dimensions)
        if(height>0){
            createTokens();
            setpjSelected(pjSelected-1)
        }
        else{
            setTimeout(function(){
                setHeight(mapRef?.current?.height || height-1);
            },500);
            
        }
    }, [mapRef, height, dimensions]) //correct dependencies

    const updatePjs = () => {
        /* TODO */
        /* Send pjSelected */
    }
    createTokens();
    console.log("render")
    return (
        <>
            <img className="w-full" src={img} alt={mapName} onClick={placeSelectedPj} ref={mapRef} />
            {tokens}
            <div className="flex gap-4 mt-4">
                {pjs.map((pj, index) => {
                    return (<PrimaryButton onClick={() => {setpjSelected(index)}} key={pj.name} text={pj.name} />
                )})}
            </div>
        </>
    )
}

const Token = ({img, pj, pos, imgCoord, handleClick} : {img: string, pj: PjType, pos: Pos, imgCoord:Img, handleClick: () => void}) => {
    return (
            <>
                <img
                onClick={handleClick} 
                data-tip 
                data-for={`${pj.name}RegisterTip`}
                src={img} 
                alt={pj.name} 
                className="absolute h-6 w-6 object-cover rounded-xl border border-black"
                style={
                    {
                        top: `${(pos.y* imgCoord.height)+imgCoord.yStart -12}px`,
                        left: `${(pos.x*imgCoord.width)+imgCoord.xStart -12}px`
                    }
                }
                
                />
                <ReactTooltip
                    id={`${pj.name}RegisterTip`} 
                    place="right" 
                    effect="solid"
                    backgroundColor="none"
                    delayShow={500}
                 >
                    <PjCard pjData={pj} />
                </ReactTooltip>
            </>
            
    ); 
}

export default Map;