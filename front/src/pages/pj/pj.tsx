import addIcon from '../../assets/add.svg'

type PJ = {
    name: string,
    img: string,
    job: Job,
    race: Race,
    level: number,
};

type Job = 'Pirate' | 'Menestrel' | 'Mage de Tzintch' | 'Mage' | 'Noble' | 'Ingénieur';
type Race = 'Nain' | 'Humain' | 'Demie-elfe' | 'Elfe-noire' | 'Hobbit';

const pjsMocked : PJ[]= [
    {
        name : "Fluffy",
        img : "https://static0.cbrimages.com/wordpress/wp-content/uploads/2021/12/Luffy-during-Onigashima-raid.jpg",
        job: "Pirate",
        race: "Hobbit",
        level: 4,
    },
    {
        name : "Jeanne D'orc",
        img : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Contemporaine_afb_jeanne_d_arc.png/280px-Contemporaine_afb_jeanne_d_arc.png",
        job: "Mage",
        race: "Humain",
        level: 3,
    },
    {
        name : "Mélanchon",
        img : "http://www.letarnlibre.com/static/img/2014/04/15/jean_luc_melenchon_avril_2012.jpg",
        job: "Noble",
        race: "Humain",
        level: 13,
    },
    {
        name : "Clodo",
        img : "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.15752-9/278103532_315886990481771_5343216175235124413_n.png?_nc_cat=110&ccb=1-5&_nc_sid=ae9488&_nc_ohc=8Cwqzl1VtSYAX9r9yUr&_nc_ht=scontent-cdt1-1.xx&oh=03_AVJPqxDeToN07pPg3m3kpSXEW9zAtf3fiLWNCmZiD9HRHg&oe=628F7353",
        job: "Ingénieur",
        race: "Humain",
        level: 1,
    },
    
];

const Pj = () => {
    const EmptyCards : JSX.Element[] = []
    const pjData = pjsMocked;

    for(let i = 0; i < (4 - ((pjData.length+1)%4)); i++){
        EmptyCards.push(
            <div className='border-dashed h-96 w-56 border-orange border-8 rounded-2xl'></div>
        )
    }
    return (
        <div className="grid grid-cols-4 grid-flow-rows gap-4 w-[62rem]">
           
            { pjsMocked.map(pjData => <PjCard pjData={pjData}/>) } 
            
            <a href="/pj/new">
                <button className="h-full w-full border-dashed h-96 w-56 border-orange border-8 rounded-2xl flex justify-center items-center">
                    <img className="max-h-20" alt="add pj" src={addIcon} />
                </button>
            </a>
            {EmptyCards}
        </div>
    )
}

const PjCard = (props : {pjData: PJ}) => {
    const {pjData} = props
    return (
        <div className="h-96 w-56 border-orange border-8 rounded-2xl bg-beige">
            <div className="bg-orange my-1 justify-center flex">{pjData.name}</div>
            <img className="min-w-full h-72 object-cover border-y-8 border-orange" alt={pjData.name} src={pjData.img}/>
            <div className="flex justify-between mx-1.5 font-bubblegum">
                <span>{pjData.race}</span>
                <span>Niveau {pjData.level}</span>
            </div>
        </div>
    )
}

export default Pj