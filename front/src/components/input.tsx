interface Props {
    placeholder?: string; 
    type: string;
    width?: string; 
    height?: string;
}

const Input = ({placeholder, type, width= "3/4", height = "24"} : Props) => {
    return (
        <input className={
            `w-3/4 rounded-2xl text-center text-2xl placeholder-[#274747] font-inter h-${height} w-${width}`
        }
            placeholder={placeholder} type={type}>
        </input>
    )
}

export default Input