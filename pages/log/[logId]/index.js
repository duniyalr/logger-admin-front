import { qoToqs } from "../../../helpers/queryObjectToQueryString";
import { fetchWithSession } from "../../../helpers/fetchWithSession";
import Log from "../../../components/log/Log";

export default function
LogPage({
  initialData,
  initialRequst
}) {
  return (<>
    <Log initialData={initialData} initialRequest={initialRequst} />
  </>)
}

export const getServerSideProps = async ({query, req, params}) => {
  const requestKey = "/api/log/" + params.logId + qoToqs(query);
  const data = await fetchWithSession(requestKey, req);

  return {
    props: {
      protected: true,
      initialData: data,
      initialRequest: {
        key: requestKey
      }
    }
  }
}