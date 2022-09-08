import Logs from "../../components/logs/Logs";
import { fetchWithSession } from "../../helpers/fetchWithSession";
import { qoToqs } from "../../helpers/queryObjectToQueryString";

export default function
LogsPage({
  initialData,
  initialRequest
}) {
  return (<>
    <Logs
      initialData={initialData}
      initialRequest={initialRequest}
    />
  </>)
}

export const getServerSideProps = async ({req, query}) => {
  const requestKey = "/api/log/index" + qoToqs(query);
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