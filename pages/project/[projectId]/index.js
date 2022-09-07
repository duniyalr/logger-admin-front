import Project from "../../../components/project/Project";
import { fetchWithSession } from "../../../helpers/fetchWithSession";
import { qoToqs } from "../../../helpers/queryObjectToQueryString";
export default function
ProjectPage({
  initialData, 
  initialRequest
}) {
  return <Project initialData={initialData} initialRequest={initialRequest}/>
}

export const getServerSideProps = async ({params, req, query}) => {
  const requestKey = "/api/project/" + params.projectId + "?" + qoToqs(query);
  const data = await fetchWithSession(requestKey, req);
  console.log(data)
  return {
    props: {
      protected: true,
      initialData: data,
      initialRequest: {
        key: requestKey,
        query
      }
    }
  }
}