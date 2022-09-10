import Link from "next/link";
import useSWR from "swr";
import { basicFetcher } from "../../http/fetchers/basicFetcher";
import { FaPlus } from "react-icons/fa";
import CommonContainer from "../shared/CommonContainer";
import LinkButton from "../shared/LinkButton";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useRouter } from "next/router";
import { qoToqs } from "../../helpers/queryObjectToQueryString";
import Pagination from "../shared/Pagination";
import CustomSelect from "../shared/CustomSelect";
import ListPopupTrigger from "../shared/ListPopupTrigger";
import CustomPopup from "../shared/CustomPopup";
import PopupListItem from "../shared/PopupListItem";

const sortByOptions = [
  {value: "createdAt", label: "CreatedAt"},
  {value: "projectId", label: "Project Id"}
];

const sortOrderOptions = [
  {value: "ASC", label: "ASC"},
  {value: "DESC", label: "DESC"},
];

const takeOptions = [
  {value: 10, label: "10"},
  {value: 20, label: "20"},
  {value: 30, label: "30"},
  {value: 40, label: "40"},
  {value: 50, label: "50"}
]

export default function
Logs({
  initialData, 
  initialRequest
}) {
  const router = useRouter();
  const [projectSelectPopupOpen, setProjectSelectPopupOpen] = useState(false);
  const [query, setQuery] = useState(router.query);
  const [sectionsUrl, setSectionsUrl] = useState(null);
  const { data, error, isLoading} = useSWR(sectionsUrl, basicFetcher, {
    fallbackData: initialData,
    revalidateOnMount: false
  });
  const [projectsUrl, setProjectsUrl] = useState(null);
  const {data: projectsData, error:projectsError, isLoading:projectsIsLoading} = useSWR(projectsUrl, basicFetcher);
  const items = data.data.items;
  const meta = data.data.meta;

  const projects = projectsData && projectsData.data.items;

  const setQueryHandler = (key, value) => {
    return setQuery({
      ...query,
      [key]: value
    });
  }

  const pageHandler = (page) => {
    return setQueryHandler("page", page);
  }

  const projectSelectOpenHandler = () => {
    setProjectsUrl("/api/project/index?sortBy=createdAt&sortOrder=DESC&take=50&page=1");
  }

  const selectProjectIdClearHandler = () => {
    const {projectId, sectionId, ..._query} = query;
    setProjectSelectPopupOpen(false);
    setQuery(_query)
  }

  const setProjectSelectPopupOpenHandler = (_open) => {
    console.log("here", _open)
    if (_open) {
      projectSelectOpenHandler();
    }
    setProjectSelectPopupOpen(_open);
  }

  useEffect(() => {
    router.push("/sections" + qoToqs(query));
    setSectionsUrl("/api/section/index" + qoToqs(query));
  }, [query])

  return (<>
    <CommonContainer>
      <div className={`actionbar d-flex align-items-center mb-4`}>
        <h2 className="flex-grow-1">
          Sections
        </h2>
      </div>
      <hr />
      <div className="d-flex flex-wrap w-100">
        <div className="d-flex align-items-center w-50">
          <span className="me-2 text-secondary">sort</span>
            <CustomSelect
              className="me-2"
              defaultValue={query.sortBy && sortByOptions.find(option => option.value === query.sortBy)}
              options={sortByOptions}
              onChange={(option) => setQueryHandler("sortBy", option.value)}
            />

            {query.sortBy &&
              <CustomSelect
                defaultValue={query.sortOrder && sortOrderOptions.find(option => option.value === query.sortOrder)}
                options={sortOrderOptions}
                onChange={(option) => setQueryHandler("sortOrder", option.value)}
              />
            }
        </div>

        <div className="d-flex ms-auto align-items-center w-25">
          <span className="me-2 text-secondary">Take</span>
          <CustomSelect
            className="flex-grow-1"
            defaultValue={query.take ? takeOptions.find(option => option.value == query.take) : takeOptions[0]}
            options={takeOptions}
            onChange={(option) => setQueryHandler("take", option.value)}
          />
        </div>

        <div className="w-100"></div>

        <div className={`d-flex align-items-center`} style={{width: "46%", marginRight: "8%"}}>
          <span className="me-2 text-secondary">Project</span>
          <ListPopupTrigger value={query.projectId} onClear={selectProjectIdClearHandler} 
              onClick={() => setProjectSelectPopupOpenHandler(true)}/>
              <CustomPopup
                open={projectSelectPopupOpen}
                onClose={() => setProjectSelectPopupOpenHandler(false)}
                title={"Project Select"}
                body={
                  <>
                    {projects && projects.map(project=> {
                      return (<>
                        <PopupListItem onClick={() => {
                        setQueryHandler("projectId", project.id);
                        setProjectSelectPopupOpenHandler(false);
                        }}
                        item={project}
                        />
                      </>)
                    })}
                  </>
                }
              />
        </div>
        
      </div>
      <hr />
      <div className={`row`}>
        <div className="container-fluid">
          {items.map(item => (
            <div key={item.key} className={`row py-3 px-1 align-items-center`}>
              <div className="col-md-3 overflow-hidden text-center text-secondary" style={{fontSize: ".8rem"}}>{item.id}</div>
              <div className="col-md-4 text-break text-dark">{item.name}</div>
              <div className="col-md-2 text-break text-secondary" style={{fontSize: ".8rem"}}>{(new Date(item.createdAt)).toLocaleString()}</div>
              <div className="col-md-2 text-break text-secondary" style={{fontSize: ".8rem"}}>{(new Date(item.updatedAt)).toLocaleString()}</div>
              <div className="col-md-1 text-break text-center">
                <Link href={`/section/${item.id}`}>
                  <a className="text-decoration-none text-white btn btn-primary" style={{fontSize: ".9rem"}}>

                    View
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <Pagination 
      {...meta} 
      pageHandler={pageHandler} />
    </CommonContainer>
  </>)
}