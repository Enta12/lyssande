import { useState } from "react";

interface Props {
    width?: string; 
    height?: string;
    options: string[];
    title: string;
}

const InputSelect = ({title, options, width= "full", height = "24"} : Props) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <button 
            className=""
            type="button"
            onClick={(e) => {
                e.stopPropagation()
                setIsOpen(!isOpen);
            }}
        >
            <div className="dd-header">
                <div className="dd-header-title">{title}</div>
            </div>
            <div className="dd-list">
                {isOpen && options.map((option) => {return(<Option name={option} />)})}
            </div>
        </button>
    )
}

const Option = ({name} : {name: string}) => {
    return(
        <button className="dd-list-item">{name}</button>
    )
}

export default InputSelect



/*<select className={`appearance-none max-w-md open:rounded-b-none rounded-2xl text-center text-2xl placeholder-[#274747] font-inter h-${height} w-${width}`}>
            { <option value="" disabled selected>{placeholder}</option>}
            {options.map(option => <option value={option}>{option}</option>)}
    </select> */


    /*
    export default class OutsideAlerter extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Alert if clicked on outside of element
   */
  /*
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      alert("You clicked outside of me!");
    }
  }

  render() {
    return <div ref={this.wrapperRef}>{this.props.children}</div>;
  }
}
*/