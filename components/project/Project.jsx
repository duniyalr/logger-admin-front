import { useRouter } from "next/router";
import CommonContainer from "../shared/CommonContainer";
import LinkButton from "../shared/LinkButton";
import Button from "../shared/Button";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import s from "./project.module.scss";
import useSWR from "swr";
import { basicFetcher } from "../../http/fetchers/basicFetcher";
import { FaBatteryEmpty, FaPlus, FaTimes } from "react-icons/fa";
import { httpDeleteProject } from "../../http/deleteProject";
import HttpError from "../../http/HttpError";

export default function
Project({
  initialData,
  initialRequest
}) {
  console.log(initialData)
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [project, setProject] = useState(initialData.data);
  const [sections, setSections] = useState(null);
  const router = useRouter();
  const {data} = useSWR("/api/section/index?projectId=" + router.query.projectId, basicFetcher);

  useEffect(() => {
    if (!data) return;
    console.log("project use effect")
    setSections(data.data.items);
  }, [data])

  const confirmDeleteHandler = (_confirmDelete) => {
    setConfirmDelete(_confirmDelete);
  }

  const deleteProductHandle = async () => {
    console.log("YYYY", project)
    const result = await httpDeleteProject({projectId: project.id});
    if (result instanceof HttpError) {

      return;
    }

    router.push("/projects");
  }

  return (<>
    <CommonContainer>
      <div className={`actionbar d-flex align-items-center mb-4`}>
        <h2 className="w-50 d-flex align-items-center flex-grow-1">
          <span style={{fontSize: ".8rem"}} className={"me-3 text-dark align-self-start"}>Project /</span>
          {project.name}
        </h2>
        {
          confirmDelete 
          ? 
          <div className="btn-group">
          <Button
            label={"Are you Sure?"}
            color="btn-danger"
            onClick={deleteProductHandle}
          />
          <Button
            color="btn-danger"
            Icon={FaTimes}
            onClick={() => setConfirmDelete(false)}
          />
          </div>
          :
          <Button
          label={"Delete project"}
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
              <div className={`${s.item} d-flex align-items-center`}>
                <span className="w-50 py-3" style={{fontWeight: "bold"}}>Name </span> 
                <span className="w-50">{project.name}</span>
              </div>
              <div className={`${s.item} d-flex align-items-center`}>
                <span className="w-50 py-3" style={{fontWeight: "bold"}}>Id </span> 
                <span className="w-50 overflow-hidden" style={{fontSize: ".8rem"}}>{project.id}</span>
              </div>
              <div className={`${s.item} d-flex align-items-center`}>
                <span className="w-50 py-3" style={{fontWeight: "bold"}}>Created At </span> 
                <span className="w-50"  style={{fontSize: ".8rem"}}>{(new Date(project.createdAt)).toLocaleString()}</span>
              </div>
              <div className={`${s.item} d-flex align-items-center`}>
                <span className="w-50 py-3" style={{fontWeight: "bold"}}>Updated At </span> 
                <span className="w-50"  style={{fontSize: ".8rem"}}>{(new Date(project.updatedAt)).toLocaleString()}</span>
              </div>
            </div>

            <div className="col-md-7 ps-5">
              <div className="d-flex justify-content-between align-items-center">
                <h3>Sections</h3>
                <LinkButton
                label={"New section"}
                Icon={FaPlus}
                href={"/new-section/" + project.id}
                />
              </div>
              <hr />
              {
                (sections && sections.length)
                ?
                <>
                  {sections.map((section, i) => (<>
                    <div className="d-flex align-items-center" key={i}>
                      <span className="w-50 py-3">{section.name}</span>
                      <span className="w-25 py-3 text-secondary"  style={{fontSize: ".8rem"}}>{(new Date(section.createdAt)).toLocaleString()}</span>
                      <span className="w-25 text-center">
                        <LinkButton
                        href={`/section/${section.id}`}
                        label={"View"}
                        color={"btn-primary"}
                        style={{fontSize: ".9rem"}}
                        />
                      </span>
                    </div>
                  </>))}
                </>
                :
                <>
                  <div className="w-100 text-center d-flex flex-column align-items-center text-secondary">
                    <FaBatteryEmpty className="mb-3 " style={{fontSize: "7rem"}}/>
                    No section found for this project!
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </CommonContainer>
  </>)
}