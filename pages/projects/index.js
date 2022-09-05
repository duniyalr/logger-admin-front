import { fetchWithSession } from "../../helpers/fetchWithSession";
import { qoToqs } from "../../helpers/queryObjectToQueryString";
export default function Projects(props) {
  console.log(props)
}

export const getServerSideProps = async ({req, query}) => {
  console.log(query)
  console.log(qoToqs(query))
  const data = await fetchWithSession("/project/index" + qoToqs(query), req);
  console.log(data)
  return {
    props: {}
  }
}