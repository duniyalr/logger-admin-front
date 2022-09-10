import { useRouter } from "next/router"
import { useState } from "react";
import useSWR from "swr";
import { httpDeleteSection } from "../../http/deleteSection";
import { basicFetcher } from "../../http/fetchers/basicFetcher";
import HttpError from "../../http/HttpError";
import CommonContainer from "../shared/CommonContainer";
import Button from "../shared/Button";
import { FaTrash, FaTimes, FaPlus } from "react-icons/fa";
import { httpCreateSectionSession } from "../../http/createSectionSession";
import { httpDeleteSectionSessoin } from "../../http/deleteSectionSession";
export default function
Section({
  initialData,
  initialRequest
}) {
  const router = useRouter();
  const section = initialData.data;
  const project = section.project;
  
  const {data: sessionsData, mutate: sessionMutate } = useSWR("/api/section/session/index?sectionId=" + section.id, basicFetcher);
  const sessions = sessionsData.data.items;
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [confirmSessionDeleteId, setConfirmSessionDeleteId] = useState(null);

  const deleteSectionHandler = async () => {
    const result = await httpDeleteSection({sectionId: section.id});

    if (result instanceof HttpError) {

      return;
    }

    router.push("/project/" + project.id);
  }

  const deleteSessionHandler = async  () => {
    if (!confirmSessionDeleteId) return;

    const result = await httpDeleteSectionSessoin({
      sessionId: confirmSessionDeleteId
    });

    if (result instanceof HttpError) {
      return;
    } 

    sessionMutate()
  }
 
  const generateSessionHandler = async () => {
    const result = await httpCreateSectionSession({
      sectionId: section.id
    });

    if (result instanceof HttpError) {
      console.log(result)
      return
    }
    console.log(result)

    sessionMutate();
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
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <h3 className="flex-grow-1">Sessions</h3>
          <Button
          label={"Generate Session"}
          Icon={FaPlus}
          className="text-primary"
          onClick={generateSessionHandler}
        />
        </div>
        <hr />

        <div className="container-fluid">
          {sessions.map(session => {
            return (<>
              <div className="row py-3 align-items-center">
                <div className="col-md-6 text-secondary" style={{wordWrap: "break-word", fontSize: "12px"}}>{session.session}</div>
                <div className="col-md-3 text-secondary" >{(new Date(session.createdAt)).toLocaleString()}</div>
                <div className="col-md-3">
                {
                  confirmSessionDeleteId === session.id
                  ? 
                  <div className="btn-group">
                  <Button
                    label={"Are you Sure?"}
                    color="btn-danger"
                    onClick={deleteSessionHandler}
                  />
                  <Button
                    color="btn-danger"
                    Icon={FaTimes}
                    onClick={() => setConfirmSessionDeleteId(null)}
                  />
                  </div>
                  :
                  <Button
                  label={"Delete"}
                  Icon={FaTrash}
                  color="text-danger"
                  onClick={() => setConfirmSessionDeleteId(session.id)}
                  />
                }
                </div>
              </div>
            </>)
          })}
        </div>
      </div>
      </CommonContainer>
  </>)
}