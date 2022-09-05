import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { httpLogin } from "../../http/login";
import Button from "../shared/Button";
import PasswordInput from "../shared/PasswordInput";
import TextInput from "../shared/TextInput";
export default function
Login() {
  const { register, handleSubmit, formState: { errors }} = useForm();
  
  useEffect(() => {
    httpLogin();
  }, [])

  return (<>
    <div className={`d-flex align-items-center justify-content-center vh-100`}>
      <div className={`rounded-3  p-3 w-25 bg-white pt-3 shadow`}>
        <form>
          <TextInput 
          label="Username" 
          name="username" 
          registerFunc={register} 
          isRequired={true}/>

          <PasswordInput 
          label="Password" 
          name="password" 
          registerFunc={register} 
          isRequired={true}/>

          <Button 
          label="Login"
          />
        </form>  
      </div>      
    </div>
  </>)
}