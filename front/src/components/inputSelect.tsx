import React, { useEffect, useRef, useState } from "react";

interface Props {
    width?: string; 
    height?: string;
    options: string[];
    title: string;
}

const InputSelect = ({title, options, width= "3/4", height = "24"} : Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [optionSelected, setOptionSelected] = useState("")
    const selectRef = useRef<HTMLDivElement>(null);
    const selectAnOption = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      setIsOpen(false);
      setOptionSelected(e.currentTarget.innerHTML);
      
    }
    useEffect(() => {
      const onClickOutside = () => {
        setIsOpen(false)
      };
      const handleClickOutside = (event: any) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
          onClickOutside && onClickOutside();
        }
      };
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    },[selectRef]);

    return (
      <div
        className={`text-swamp w-3/4 rounded-2xl text-center text-2xl placeholder-[#274747] font-inter w-${width} bg-white`}
      >
        <div ref={selectRef} onClick={() => {setIsOpen(true)}} className={`flex justify-center items-center h-${height}`}>
          {`${title}: ${optionSelected}`}
        </div>
        {options.map((option, index) => <Option height={height} key={`${title}${index}`} name={option} display={isOpen} selectAnOption={e => {selectAnOption(e)}} />)}
          <input readOnly className="hidden" type="text" value={optionSelected}/>
      </div>
    )
}

const Option = ({name, display, selectAnOption, height} : {height: string, name: string, display: boolean, selectAnOption: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void}) => {
    const classNames = `${display? "border-t flex justify-center items-center  h-" + height : "hidden"}`
    return(
        <div className={classNames} onClick={e => selectAnOption(e)}>{name}</div>
    )
}

export default InputSelect