import addIcon from '../../assets/add.svg'
import PjCard from '../../components/pjCard';
import { pjsMocked } from '../../moockedData';

const Pj = () => {
    const EmptyCards : JSX.Element[] = []
    const pjData = pjsMocked;

    for(let i = 0; i < (4 - ((pjData.length+1)%4)); i++){
        EmptyCards.push(
            <div key={i} className='border-dashed h-96 w-56 border-orange border-8 rounded-2xl'></div>
        )
    }
    return (
        <div className="grid grid-cols-4 grid-flow-rows gap-4 w-[62rem]">
           
            { pjsMocked.map((pjData, index) => <PjCard key={index} pjData={pjData}/>) } 
            
            <a href="/pj/new">
                <button className="border-dashed h-96 w-56 border-orange border-8 rounded-2xl flex justify-center items-center">
                    <img className="max-h-20" alt="add pj" src={addIcon} />
                </button>
            </a>
            {EmptyCards}
        </div>
    )
}

export default Pj