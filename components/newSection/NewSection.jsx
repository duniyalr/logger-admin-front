import { useForm } from "react-hook-form";
import CommonContainer from "../shared/CommonContainer"
import Input from "../shared/Input";
import Button from "../shared/Button";
import HttpError from "../../http/HttpError";
import { useRouter } from "next/router";
import { httpCreateSection } from "../../http/createSection";

export default function
NewSection() {
  const router = useRouter();
  const { register, handleSubmit, formState: {errors}} = useForm();
  const onSubmit = async (formData) => {
    const response = await httpCreateSection({
      ...formData,
      projectId: router.query.projectId
    });
    if (response instanceof HttpError) {
      return;
    }
    console.log(response)
    return router.push("/section/" + response.data.id);
  }

  return (<>
    <CommonContainer>
      <div className={`actionbar d-flex align-items-center mb-4`}>
        <h2 className="flex-grow-1">
          New section
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