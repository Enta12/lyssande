import { useRef, useState } from "react";

interface Props {
    width?: string; 
    height?: string;
    text: string;
}

const FileInput = ({text, width= "3/4", height = "24"} : Props) => {
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState("")
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        hiddenFileInput?.current?.click();
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.value);
    }
    return (
        <>
            <button 
                onClick={e => {handleClick(e)}}
                className={
                    `rounded-2xl text-center text-2xl text-brown font-inter h-${height} w-${width} bg-white flex justify-between items-center p-6`
                }
            >
                    <div>{`${text} ${file? " : "+file: ""}`}</div>
                    <div
                        className={
                            `rounded border-4 border-orange/[.8] font-inter w-24 h-9 text-center bg-[#C9C9C9] font-semibold text-sm flex justify-center items-center`
                        }
                    >
                        Parcourir...
                    </div>
            </button>
            <input ref={hiddenFileInput} name="picture" value={file} onChange={handleChange} className="hidden" type="file" />
        </>
    )
}

export default FileInput