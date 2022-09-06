import { fetchWithSession } from "../../../helpers/fetchWithSession";
import { qoToqs } from "../../../helpers/queryObjectToQueryString";
export default function
ProjectPage({
  initialData, 
  initialRequest
}) {

}

export const getServerSideProps = async ({params, req, query}) => {
  const requestKey = "/api/project/" + params.projectId + "?" + qoToqs(query);
  const data = await fetchWithSession(requestKey, req);
  console.log(data)
  return {
    props: {
      initialData: data,
      initialRequest: {
        key: requestKey,
        query
      }
    }
  }
}