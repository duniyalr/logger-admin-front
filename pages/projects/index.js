import { fetchWithSession } from "../../helpers/fetchWithSession";
import { qoToqs } from "../../helpers/queryObjectToQueryString";
import Projects from "../../components/projects/Projects";
export default function ProjectsPage({
  initialData,
  initialRequest
}) {
  return (<>
    <Projects 
    initialData={initialData}
    initialRequest={initialRequest}
    />
  </>)
}

export const getServerSideProps = async ({req, query}) => {
  const requestKey = "/api/project/index" + qoToqs(query);
  const data = await fetchWithSession(requestKey, req);

  return {
    props: {
      initialRequest: {
        key: requestKey,
        query: query
      },
      initialData: data
    }
  }
}