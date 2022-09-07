import NewProject from "../../components/newProject/NewProject"

export default function
NewProjectPage() {
  return (<>
    <NewProject />
  </>)
}

export const getStaticProps = () => {
  return {
    props: {
      protected: true
    }
  }
}