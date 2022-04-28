interface Props {
    placeholder: string;
    width?: string; 
    height?: string;
    options: string[];
}

const Input = ({options, placeholder, width= "3/4", height = "24"} : Props) => {
    return (
        <select className={`w-3/4 rounded-2xl text-center text-2xl placeholder-[#274747] font-inter h-${height} w-${width}`}>
            { <option value="" disabled selected>{placeholder}</option>}
            {options.map(option => <option value={option}>{option}</option>)}
        </select>
    )
}

export default Input