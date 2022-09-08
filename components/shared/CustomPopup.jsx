import { FaTimes } from "react-icons/fa";
import Popup from "reactjs-popup";

export default function
CustomPopup({  
  body,
  bottons,
  title,
  trigger,
  ...args
}) {
  return (<>
    <Popup
    trigger={trigger}
    closeOnDocumentClick={true}
    closeOnEscape={true}
    modal
    overlayStyle={{
      background: "rgba(0,0,0,.2)"
    }}
    contentStyle={{
      width: "40%",
      boxShadow: "0 0 15px rgba(0,0,0,.2)"
    }}
    {...args}
    >
      {close => <>
        <div className="w-100 bg-white rounded-3">
          <div className="w-100 p-2 d-flex align-items">
            <h5 className="text-secondary me-auto">
              {title}
            </h5>
            <button className="btn border-0 text-secondary p-1" onClick={close}>
              <FaTimes />
            </button>
          </div>
          <div className="p-2" style={{maxHeight: "75vh", overflowY: "auto"}}>
            {body}
          </div>
        </div>
      </>}
    </Popup>
  </>)
}