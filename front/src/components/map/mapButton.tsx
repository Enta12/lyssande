type Props = {
    name: string;
    picture: string;
    onClick: () => void;
    hidden: boolean;
}

const MapButton = ({hidden, name, picture, onClick}: Props) => {
    return (
        <div className={`relative border-darkBrown rounded-full cursor-pointer ${hidden && "hidden"}`} onClick={onClick} >
            <img className="w-20 h-20 rounded-full border-4 object-cover border-darkBrown z-10 relative" src={picture} alt={name}/>
            <div className="text-orange p-1 flex flex-col-reverse items-center rounded-b-[120rem] left-[-23px] top-[39px] absolute rounded-t-full bg-darkBrown h-16 w-32 z-0">{name}</div>
        </div>
    )
    
}

export default MapButton