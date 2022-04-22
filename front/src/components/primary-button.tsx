import { Children } from "react"

const PrimaryButton = (props :{ children: string }) => {
    return(
        <button className="font-bubblegum align-center text-stone-50 bg-brown rounded-2xl h-24 w-36 border-8 text-2xl text-lightGrey">
            {Children}
        </button>
    )
}

export default PrimaryButton