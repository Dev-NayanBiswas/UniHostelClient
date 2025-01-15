import { Link, useLocation, useNavigate } from "react-router-dom"
import DynamicTitle from "../../Utilities/DynamicTitle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"
import GoogleLogin from "./GoogleLogin"
import useAuth from "../../Hooks/useAuth"
import { useForm } from "react-hook-form"

function Login(){
  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location?.state ? location.state : "/";
  const {signingWithEmail} = useAuth();
  const [showPass, setShowPass] = useState(false);
  const {handleSubmit, formState:{errors}, register, reset} = useForm();


  async function handleLogin(data){
      const response = await signingWithEmail(data.email, data.password);
      if(response?.user?.accessToken){
          reset({
            email:"",
            password:""
          });
          alert("Successfully Logged in");
          navigate(redirect);
      };
  }


  return (
    <>
    <DynamicTitle/>
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-full">
          <div className="w-9/12 mx-auto">
            <h1 className="text-5xl font-bold text-center cursor-default text-logo-yellow mb-10">
              Log in
            </h1>
            <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-7">


              <div>
                <input {...register("email", {required:"Email Required"})} className="defaultInput" type="email" placeholder="Email" />
                {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
              </div>


              <div className="relative group">
                <input {...register("password",{
                  required:"Password Required",
                  minLength:{
                    value:6,
                    message:"Password should be minimum six characters"
                  }
                })} className="defaultInput" type={!showPass ? "password" : "text"} placeholder="password"/>
                <p onClick={()=>setShowPass(!showPass)} className="absolute transition-all duration-500 px-3 py-2 top-[6px] right-[5px]">
                {
                  !showPass ? <FontAwesomeIcon className="text-logo-yellow text-xl transition-all duration-500 group-hover:text-2xl" icon={faEye}/> :
                  <FontAwesomeIcon className="text-logo-yellow text-xl transition-all duration-500 group-hover:text-2xl" icon={faEyeSlash}/>
                }
                </p>
                {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
              </div>


              <button className="w-full p-3 mt-4 text-white font-semibold rounded-lg hover:scale-105 bg-logo-yellow transition transform duration-300 shadow-lg focus:outline-none" type="submit">
                LOG IN
              </button>


            </form>
            <div className="flex flex-col mt-4 text-sm text-center">
              <p className="text-gray-400 font-semibold text-lg font-para">
                Don't have an account?
                <Link to="/joinUs/register" state={redirect} className="text-blue-400 ml-3 transition hover:underline">Register</Link>
              </p>
            </div>
            <div className="divider text-logo-yellow font-semibold">OR</div>
              <GoogleLogin/>
          </div>
      </div>
    </div>
    </>
  )
}

export default Login