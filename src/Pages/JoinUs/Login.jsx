import { Link, useLocation, useNavigate } from "react-router-dom"
import DynamicTitle from "../../Utilities/DynamicTitle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"
import GoogleLogin from "./GoogleLogin"
import useAuth from "../../Hooks/useAuth"
import { useForm } from "react-hook-form"
import HeadingTitle from "../../Components/HeadingTitle/HeadingTitle"
import Toast from "../../Utilities/sweetToast"



const headingData = {
  heading:"Login",
  desc:"Welcome back! Log in to manage your hostel bookings, explore services, and stay connected with your UniHostel account. Your home away from home awaits"
}

function Login(){
  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location?.state ? location.state : "/";
  const {signingWithEmail} = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [userCred, setUserCred] = useState({
    email:"",
    password:""
  })
  const {handleSubmit, formState:{errors}, register, reset} = useForm();



function handleLogin(data){
      signingWithEmail(data.email, data.password)
      .then((response)=>{
        if(response?.user?.accessToken){
          reset({
            email:"",
            password:""
          });
          Toast.fire({
            icon:"success",
            title:"Successfully LoggedIn"
          })
          navigate(redirect);
      }
      })
      .catch(error=>{
        error && Toast.fire({icon:"error", title:"Wrong Email or Password"});
        return;
      }
        
      )
  }


  return (
    <>
    <DynamicTitle/>
    <HeadingTitle headingData={headingData}/>
    <section className="my-5 flex justify-center items-center gap-4">
          <button onClick={()=>setUserCred({email:"test@admin.com", password:"Nayan@123"})} className="px-7 py-2 border-2 border-logo-yellow/45 text-logo-yellow font-para font-semibold">Admin</button>
          <button onClick={()=>setUserCred({email:"john@doe.com", password:"Nayan@123"})} className="px-7 py-2 border-2 border-logo-yellow/45 text-logo-yellow font-para font-semibold">User</button>
          
    </section>
    <div className="flex justify-center items-center h-full w-full mt-20">
      <div className="w-full">
          <div className="lg:w-9/12 w-full mx-auto">
            <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-7">


              <div>
                <input {...register("email", {required:"Email Required"})} className="defaultInput" type="email" placeholder="Email" defaultValue={userCred.email} />
                {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
              </div>


              <div className="relative group">
                <input defaultValue={userCred.password} {...register("password",{
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