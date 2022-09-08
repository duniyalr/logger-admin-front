import { useRouter } from "next/router"
import { useState } from "react";
import useSWR from "swr";
import { httpDeleteSection } from "../../http/deleteSection";
import { basicFetcher } from "../../http/fetchers/basicFetcher";
import HttpError from "../../http/HttpError";
import CommonContainer from "../shared/CommonContainer";
import Button from "../shared/Button";
import { FaTrash, FaTimes } from "react-icons/fa";
export default function
Section({
  initialData,
  initialRequest
}) {
  const router = useRouter();
  const section = initialData.data;
  const project = section.project;
  
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteSectionHandler = async () => {
    const result = await httpDeleteSection({sectionId: section.id});

    if (result instanceof HttpError) {

      return;
    }

    router.push("/project/" + project.id);
  }
 
  return(<>
      <CommonContainer>
      <div className={`actionbar d-flex align-items-center mb-4`}>
        <h2 className="w-50 d-flex align-items-center flex-grow-1">
          <span style={{fontSize: ".8rem"}} className={"me-3 text-dark align-self-start"}>Section /</span>
          {section.name}
        </h2>
        {
          confirmDelete 
          ? 
          <div className="btn-group">
          <Button
            label={"Are you Sure?"}
            color="btn-danger"
            onClick={deleteSectionHandler}
          />
          <Button
            color="btn-danger"
            Icon={FaTimes}
            onClick={() => setConfirmDelete(false)}
          />
          </div>
          :
          <Button
          label={"Delete"}
          Icon={FaTrash}
          color="text-danger"
          onClick={() => setConfirmDelete(true)}
          />
        }
      </div>
      <hr />
      <div className="row">
        <div className="container-fluid">
          <div className="row">
          <div className="col-md-5 pe-5">
            <div className={`d-flex align-items-center`}>
              <span className="w-50 py-3" style={{fontWeight: "bold"}}>Name </span> 
              <span className="w-50">{section.name}</span>
            </div>
            <div className={`d-flex align-items-center`}>
              <span className="w-50 py-3" style={{fontWeight: "bold"}}>Id </span> 
              <span className="w-50 overflow-hidden" style={{fontSize: ".8rem"}}>{section.id}</span>
            </div>
            <div className={`d-flex align-items-center`}>
              <span className="w-50 py-3" style={{fontWeight: "bold"}}>Created At </span> 
              <span className="w-50"  style={{fontSize: ".8rem"}}>{(new Date(section.createdAt)).toLocaleString()}</span>
            </div>
            <div className={`d-flex align-items-center`}>
              <span className="w-50 py-3" style={{fontWeight: "bold"}}>Updated At </span> 
              <span className="w-50"  style={{fontSize: ".8rem"}}>{(new Date(section.updatedAt)).toLocaleString()}</span>
            </div>
          </div>
          </div>
        </div>
      </div>
      <hr />
      </CommonContainer>
  </>)
}