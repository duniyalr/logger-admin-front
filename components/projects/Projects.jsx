import Link from "next/link";
import useSWR from "swr";
import { basicFetcher } from "../../http/fetchers/basicFetcher";
import s from "./projects.module.scss";
import { FaPlus } from "react-icons/fa";
import CommonContainer from "../shared/CommonContainer";
import LinkButton from "../shared/LinkButton";
import { useState } from "react";

export default function
Projects({
  initialData,
  initialRequest
}) {
  const [projectsUrl, setProjectsUrl] = useState(initialRequest.key);
  const { data, error, isLoading} = useSWR(projectsUrl, basicFetcher, {
    fallbackData: initialData,
    revalidateOnMount: false
  });

  console.log("here", data)
  const items = data.data.items;
  console.log(items)
  
  return (<>
    <CommonContainer>
      <div className={`actionbar d-flex align-items-center mb-4`}>
        <h2 className="flex-grow-1">
          Projects
        </h2>
        <LinkButton
          label={"New project"}
          Icon={FaPlus}
          href={"/new-project"}
        />
      </div>
      <div className={`${s.list} row`}>
        <div className="container-fluid">
          {items.map(item => (
            <div key={item.key} className={`${s.item} row py-3 px-1 align-items-center`}>
              <div className="col-md-3 overflow-hidden text-center text-secondary" style={{fontSize: ".8rem"}}>{item.id}</div>
              <div className="col-md-4 text-break text-dark">{item.name}</div>
              <div className="col-md-2 text-break text-secondary" style={{fontSize: ".8rem"}}>{(new Date(item.createdAt)).toLocaleString()}</div>
              <div className="col-md-2 text-break text-secondary" style={{fontSize: ".8rem"}}>{(new Date(item.updatedAt)).toLocaleString()}</div>
              <div className="col-md-1 text-break text-center">
                <Link href={`/project/${item.id}`}>
                  <a className="text-decoration-none text-white btn btn-primary" style={{fontSize: ".9rem"}}>

                    View
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CommonContainer>
  </>)
}