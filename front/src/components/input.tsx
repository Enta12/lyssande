const Input = (props : {placeholder: string, type: string}) => {
    const {placeholder, type} = props
    return (
        <input className="h-24 w-3/4 rounded-2xl text-center text-2xl placeholder-[#274747] font-inter"
            placeholder={placeholder} type={type}>
        </input>
    )
}

export default Input