import Section from "../../../components/section/Section";
import { qoToqs } from "../../../helpers/queryObjectToQueryString";
import { fetchWithSession } from "../../../helpers/fetchWithSession";
export default function 
SectionPage({
  initialData,
  initialRequest
}) {
  return (<>
    <Section initialData={initialData} initialRequest={initialRequest}/>
  </>)
}

export const getServerSideProps = async ({req, query}) => {
  const requestKey = "/api/section/" + query.sectionId + qoToqs(query);
  const data = await fetchWithSession(requestKey, req);
  

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