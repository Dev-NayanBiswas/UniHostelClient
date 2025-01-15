import { Link, useLocation, useNavigate } from "react-router-dom"
import DynamicTitle from "../../Utilities/DynamicTitle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"
import imageUploader from "../../Utilities/imageUploader"
import GoogleLogin from "./GoogleLogin"
import { useForm } from "react-hook-form"
import useAuth from "../../Hooks/useAuth"
import useStudentsCURD from "../../Hooks/Students/useStudentsCURD"


function Register(){
const {postStudent} = useStudentsCURD();
const location = useLocation();
const navigate = useNavigate();
console.log(location);
const {updateUserProfile,registrationWithEmail} = useAuth();
const [showPass, setShowPass] = useState(false);
const [inputImage, setInputImage] = useState("")
const {register, handleSubmit, reset, formState:{errors}} = useForm()




async function handleFileChange(e){
  e.preventDefault();
  const files = e.target.files[0];
  if(!files)return;

  try{
      const image = await imageUploader(files)
      setInputImage(image);

  }catch(error){
    alert("Error in uploading Image");
    console.log(error)
  }
 
}



async function handleRegistration(data){

  const studentData = {
    name:data.name,
    email:data.email,
    image:inputImage,
    badge:"bronze",
    pendingMeals:[],
    servedMeals:[]
  }
   const login = await registrationWithEmail(data.email, data.password);
   if(login.user.accessToken){
    try{
      await updateUserProfile(data.name, inputImage);
            postStudent(studentData);
            navigate(location.state? location.state : "/")
    }catch(error){
      console.error(error.message)
    }
    
   }
   reset({
    name:"",
    image:"",
    email:"",
    password:""
   })
}



  return (
    <>
    <DynamicTitle/>
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-full">
          <div className="w-9/12 mx-auto">
            <h1 className="text-5xl font-bold text-center cursor-default text-logo-yellow mb-10">
              Register
            </h1>
            <form onSubmit={handleSubmit(handleRegistration)} className="flex flex-col gap-7">

              <div className="flex md:flex-row flex-col gap-7">
              <div>
              <div className="relative">
              <input 
              {...register("image",{
                required:"Please choose a File"
              })}
              onChange={handleFileChange} 
               className="defaultInput opacity-0" type="file" placeholder="Choose your Profile Picture" />
              <div onClick={()=>document.querySelector('input[type="file"]').click()} className="absolute top-0 left-0 h-full w-full bg-logo-yellow rounded-lg font-semibold flex justify-center items-center text-white">
                <p className="uppercase font-heading">Choose an image file</p>
              </div>
              </div>
              {errors.image && <p className="text-xs text-red-400">{errors.image.message}</p>}
              </div>


              <div className="w-full">
              <input {...register("name",{required:"Name is Required"})} className="defaultInput" type="text" placeholder="Your Name" />
              {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
              </div>
              </div>

              <div>
                <input
                {...register("email",{required:"Email is Required"})} 
                className="defaultInput" type="email" placeholder="Email" />
                {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
              </div>


              <div className="relative group">
                <input 
                {...register("password",{required:"Password Required",
                  minLength:{
                    value:6,
                    message:"Password must be six character long"
                  }
                })}
                className="defaultInput" type={!showPass ? "password" : "text"} placeholder="password" />
                <p onClick={()=>setShowPass(!showPass)} className="absolute transition-all duration-500 px-3 py-2 top-[6px] right-[5px]">
                {
                  !showPass ? 
                  <FontAwesomeIcon className="text-logo-yellow text-xl transition-all duration-500 group-hover:text-2xl" icon={faEyeSlash}/> : <FontAwesomeIcon className="text-logo-yellow text-xl transition-all duration-500 group-hover:text-2xl" icon={faEye}/>
                }
                </p>
                {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
              </div>


              <button className="w-full p-3 mt-4 text-white font-semibold rounded-lg hover:scale-105 bg-logo-yellow transition transform duration-300 shadow-lg focus:outline-none focus:ring-2" type="submit">
                REGISTER
              </button>


            </form>
            <div className="flex flex-col mt-4 text-sm text-center">
              <p className="text-gray-400 font-semibold text-lg font-para">
                Already have an account?
                <Link to="/joinUs" className="text-blue-400 ml-3 transition hover:underline">Login</Link>
              </p>
            </div>
            <div className="divider text-logo-yellow font-semibold">OR</div>
            <div className="flex justify-center items-center">
              <GoogleLogin/>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default Register