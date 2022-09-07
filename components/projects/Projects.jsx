import Link from "next/link";
import useSWR from "swr";
import { basicFetcher } from "../../http/fetchers/basicFetcher";
import s from "./projects.module.scss";
import { FaPlus } from "react-icons/fa";
import CommonContainer from "../shared/CommonContainer";
import LinkButton from "../shared/LinkButton";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useRouter } from "next/router";
import { qoToqs } from "../../helpers/queryObjectToQueryString";
import Pagination from "../shared/Pagination";

const sortByOptions = [
  {value: "createdAt", label: "CreatedAt"}
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
Projects({
  initialData,
  initialRequest
}) {
  const router = useRouter();
  const [projectsUrl, setProjectsUrl] = useState(initialRequest.key);
  const [query, setQuery] = useState(router.query);
  const { data, error, isLoading} = useSWR(projectsUrl, basicFetcher, {
    fallbackData: initialData,
    revalidateOnMount: false
  });

  const items = data.data.items;
  const meta = data.data.meta;
  console.log(meta);
  const setQueryHandler = (key, value) => {
    return setQuery({
      ...query,
      [key]: value
    });
  }

  const pageHandler = (page) => {
    return setQueryHandler("page", page);
  }

  useEffect(() => {
    router.push("/projects" + qoToqs(query));
    setProjectsUrl("/api/project/index" + qoToqs(query));
  }, [query])

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
      <hr />
      <div className="d-flex ">
      <div className="d-flex align-items-center">
        <span className="me-2 text-secondary">sort</span>
          <Select 
            defaultValue={query.sortBy && sortByOptions.find(option => option.value === query.sortBy)}
            options={sortByOptions}
            onChange={(option) => setQueryHandler("sortBy", option.value)}
          />

          {query.sortBy &&
            <Select
              defaultValue={query.sortOrder && sortOrderOptions.find(option => option.value === query.sortOrder)}
              options={sortOrderOptions}
              onChange={(option) => setQueryHandler("sortOrder", option.value)}
            />
          }
      </div>

        <div className="d-flex ms-auto align-items-center">
          <span className="me-2 text-secondary">Take</span>
          <Select
            defaultValue={query.take ? takeOptions.find(option => option.value == query.take) : takeOptions[0]}
            options={takeOptions}
            onChange={(option) => setQueryHandler("take", option.value)}
          />
        </div>
      </div>
      <hr />
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
      <hr />
      <Pagination 
      {...meta} 
      pageHandler={pageHandler} />
    </CommonContainer>
  </>)
}