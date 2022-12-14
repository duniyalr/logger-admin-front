import { useForm } from "react-hook-form";
import CommonContainer from "../shared/CommonContainer"
import Input from "../shared/Input";
import Button from "../shared/Button";
import { httpCreateProject } from "../../http/createProject";
import HttpError from "../../http/HttpError";
import { useRouter } from "next/router";
export default function
NewProject() {
  const router = useRouter();
  const { register, handleSubmit, formState: {errors}} = useForm();
  const onSubmit = async (formData) => {
    const response = await httpCreateProject(formData);
    if (response instanceof HttpError) {
      return;
    }

    return router.push("/project/" + response.data.id);
  }

  return (<>
    <CommonContainer>
      <div className={`actionbar d-flex align-items-center mb-4`}>
        <h2 className="flex-grow-1">
          New project
        </h2>
      </div>

      <div className="row">
        <div className="container-fluid">
          <form onSubmit={handleSubmit(onSubmit)}>

            <Input
            type={"text"}
            name="name"
            label="name"
            isRequired={true}
            registerFunc={register}
            />

            <Button 
            isSubmit={true}
            label={"Create project"}
            />
          </form>
        </div>
      </div>
    </CommonContainer>
  </>)
}