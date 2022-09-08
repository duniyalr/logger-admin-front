import Input from "./Input";
import { FaListUl, FaTimes } from "react-icons/fa";
export default function
ListPopupTrigger({
  onClick,
  onClear,
  value
}) {
  const timesHandle = (event) => {
    event.stopPropagation();
    onClear();
  }
  return (<>
    <div className="d-flex w-100 rounded my-3" role="group" style={{border: "1px solid rgba(0,0,0,.2)"}}
      onClick={onClick}
    >
      <button className="btn flex-grow-1 border-0 overflow-hidden text-secondary px-1" style={{fontSize: "12px"}}>
        {value}
      </button>
      <button className="btn rounded-0 rounded-right border-0">
        <FaListUl />
      </button>
      {value &&
      <button className="btn rounded-0 rounded-right border-0" onClick={timesHandle}>
        <FaTimes />
      </button>
      }
    </div>
  </>)
}