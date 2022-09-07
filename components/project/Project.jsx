import { useRouter } from "next/router";
import CommonContainer from "../shared/CommonContainer";
import LinkButton from "../shared/LinkButton";
import Button from "../shared/Button";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import s from "./project.module.scss";
import useSWR from "swr";
import { basicFetcher } from "../../http/fetchers/basicFetcher";
import { FaBatteryEmpty } from "react-icons/fa";
export default function
Project({
  initialData,
  initialRequest
}) {
  console.log(initialData)
  const [project, setProject] = useState(initialData.data);
  const [sections, setSections] = useState(null);
  const router = useRouter();
  const {data} = useSWR("/api/section/index?projectId=" + router.query.projectId, basicFetcher);

  useEffect(() => {
    if (!data) return;
    console.log("project use effect")
    setSections(data.data.items);
  }, [data])

  return (<>
    <CommonContainer>
      <div className={`actionbar d-flex align-items-center mb-4`}>
        <h2 className="w-50 d-flex align-items-center flex-grow-1">
          <span style={{fontSize: ".8rem"}} className={"me-3 text-dark align-self-start"}>Project /</span>
          {project.name}
        </h2>
        <Button
          label={"Delete project"}
          Icon={FaTrash}
          href={"/new-project"}
          color="text-danger"
        />
      </div>
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
              <h3>Sections</h3>
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
                        href={`/logs?sectionId=${section.id}`}
                        label={"Logs"}
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