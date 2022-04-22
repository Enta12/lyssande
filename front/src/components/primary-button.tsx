const PrimaryButton = (props :{ children: string }) => {
    const {children} = props
    return(
        
        <button className="font-bubblegum align-center text-stone-50 bg-brown rounded-2xl h-24 w-80 border-8 text-2xl text-lightGrey">
            {children}
        </button>
    )
}

export default PrimaryButton