import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { setAxios } from "../../http/axios";
import HttpError from "../../http/HttpError";
import { httpLogin } from "../../http/login";
import { useAuthContext } from "../../store/authContext";
import Button from "../shared/Button";
import Input from "../shared/Input";

export default function
Login() {
  const router = useRouter();
  const authContext = useAuthContext();
  const { register, handleSubmit, formState: { errors }} = useForm();
  
  const onSubmit = async (formData) => {
    const response = await httpLogin(formData);
    if (response instanceof HttpError) {
      if (response.statusCode === 400) {

        
      }
      return;
    }

    const data = response.data;
    authContext.setTokenHandler(data.session);
    window.localStorage.setItem("session", data.session);
    window.location = router.query.from ? router.query.from : "/dashboard";
  }

  return (<>
    <div className={`d-flex align-items-center justify-content-center vh-100`}>
      <div className={`rounded-3  p-3 w-25 bg-white pt-3 shadow`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input 
          label="Username" 
          name="username" 
          registerFunc={register} 
          isRequired={true}/>

          <Input 
          label="Password" 
          name="password" 
          type="password"
          registerFunc={register} 
          isRequired={true}/>

          <Button 
          label="Login"
          isSubmit={true}
          />
        </form>  
      </div>      
    </div>
  </>)
}