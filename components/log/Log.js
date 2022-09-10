import CommonContainer from "../shared/CommonContainer";
import Prism from "prismjs";
import "prismjs/themes/prism.css"
import { useEffect } from "react";

export default function
Log({
  initialData,
  initialRequest
}) {
  const log = initialData.data;

  let language;
  switch(log.contentType) {
    case "json":
      language="javascript"
      break;
    case "txt":
      language="textile";
  }
  useEffect(() => {
    Prism.highlightAll();
  }, []) 

  return <>
    <CommonContainer>
    <div className={`actionbar d-flex align-items-center mb-4`}>
        <h4 className="w-50 d-flex align-items-center flex-grow-1">
          <span style={{fontSize: ".8rem"}} className={"me-3 text-dark align-self-start"}>Log /</span>
          {log.id}
        </h4>
      </div>      
      <hr />
      <div className="row">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5 pe-5">
              <div className={` d-flex align-items-center`}>
                <span className="w-50 py-3" style={{fontWeight: "bold"}}>Project </span> 
                <span className="w-50">{log.section.project.name}</span>
              </div>
              <div className={` d-flex align-items-center`}>
                <span className="w-50 py-3" style={{fontWeight: "bold"}}>Section </span> 
                <span className="w-50">{log.section.name}</span>
              </div>
              <div className={` d-flex align-items-center`}>
                <span className="w-50 py-3" style={{fontWeight: "bold"}}>Id </span> 
                <span className="w-50 overflow-hidden" style={{fontSize: ".8rem"}}>{log.id}</span>
              </div>
              <div className={` d-flex align-items-center`}>
                <span className="w-50 py-3" style={{fontWeight: "bold"}}>Url </span> 
                <span className="w-50 overflow-hidden" style={{fontSize: ".8rem"}}>{log.url}</span>
              </div>
              <div className={` d-flex align-items-center`}>
                <span className="w-50 py-3" style={{fontWeight: "bold"}}>Ip </span> 
                <span className="w-50 overflow-hidden" style={{fontSize: ".8rem"}}>{log.ip}</span>
              </div>
              <div className={` d-flex align-items-center`}>
                <span className="w-50 py-3" style={{fontWeight: "bold"}}>Content Type </span> 
                <span className="w-50 overflow-hidden" style={{fontSize: ".8rem"}}>{log.contentType}</span>
              </div>
              <div className={` d-flex align-items-center`}>
                <span className="w-50 py-3" style={{fontWeight: "bold"}}>Created At </span> 
                <span className="w-50"  style={{fontSize: ".8rem"}}>{(new Date(log.createdAt)).toLocaleString()}</span>
              </div>
            </div>

            <div className="col-md-7 ps-5">
              <pre>
                <code className={`language-${language}`} >
                  {log.content}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </CommonContainer>
  </>
}