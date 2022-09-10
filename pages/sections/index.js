import Sections from "../../components/sections/Sections";
import { qoToqs } from "../../helpers/queryObjectToQueryString";
import { fetchWithSession } from "../../helpers/fetchWithSession";
export default function
SectionsPage({
  initialData,
  initialRequest
}) {
  return (<>
    <Sections initialData={initialData} initialRequest={initialRequest}/>
  </>)
}

export const getServerSideProps = async ({req, query}) => {
  const requestKey = "/api/section/index" + qoToqs(query);
  const data = await fetchWithSession(requestKey, req);

  return {
    props: {
      protected: true,
      initialRequest: {
        key: requestKey,
        query: query
      },
      initialData: data
    }
  }
}