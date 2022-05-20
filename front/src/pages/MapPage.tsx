import Map from "../components/map/map"
import fanghMap from '../assets/fangh.jpg';
import { pjsMocked } from "../moockedData";



const MapPage = () => {

    return (
        <Map img={fanghMap} pjs={pjsMocked} mapName={"carte terre de Fangh"} heightCoefficient={3163/4744}/>
    )
   
}

export default MapPage