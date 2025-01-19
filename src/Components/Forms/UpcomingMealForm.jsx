import { useNavigate } from "react-router-dom"
import { useState } from "react"
import imageUploader from "../../Utilities/imageUploader.js"
import { useForm} from "react-hook-form"
import useAuth from "../../Hooks/useAuth"
import DynamicTitle from "../../Utilities/DynamicTitle.jsx"
import HeadingTitle from "../HeadingTitle/HeadingTitle.jsx"
import AvatarHeading from "../HeadingTitle/AvatarHeading.jsx"
import useMealCURD from "../../Hooks/CURDS/useMealCURD.jsx"
import { useMutation, useQueryClient } from "@tanstack/react-query"




const headingData = {
    heading:"Upcoming Meal",
    desc:"Ready to impress Students with our upcoming meal! A delicious blend of flavors awaits, crafted to delight and energize. Perfect for breakfast, lunch, or dinner—stay tuned!"
  }

  const options = [
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
  ];

function UpcomingMealForm(){
const queryClient = useQueryClient();
const {postMeal} = useMealCURD();
const navigate = useNavigate();
const {userData} = useAuth();

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

const postMealMutation = useMutation({
  mutationKey:["PostMeal"],
  mutationFn:(data)=>postMeal(data),
  onSuccess:()=>{
    queryClient.invalidateQueries(["meals"])
    alert("Successfully added Meal from Mutation")
  },
  onError:(error)=>{
    console.log(error)
  }
})

// console.log(dateToday);

async function handleAddMeal(data){
    if(inputImage.length > 2){
      const newData = {
        ...data,
        ingredients:data.ingredients.split(/[\s,]+/).join(",").split(","),
        image:inputImage,
        date:Date.now(),
        email:userData.email,
        adminName:userData.displayName,
        adminPhoto:userData.photoURL,
        reviewCount:0,
        likes:0,
        rating:0,
        state:"upcoming"
    }
    if(userData?.email){
      postMealMutation.mutate(newData)
      console.log(newData)
    }
    reset({
        title:"",
        category:"",
        ingredients:"",
        description:"",
        price:"",
        image:""
    })
    }
}



  return (
    <>
    <DynamicTitle/>
    <HeadingTitle headingData={headingData}/>
    
    <div className="flex justify-center items-center h-full w-full mt-8 z-10">
      <div className="w-full">
          <div className="lg:w-9/12 w-full mx-auto">
          <AvatarHeading avatarData={userData}/>
            <form onSubmit={handleSubmit(handleAddMeal)} className="flex flex-col gap-7">

              <div className="flex md:flex-row flex-col gap-7">

              {/* Title */}
              <div className="w-full">
              <input {...register("title",{required:"Title is Required"})} className="defaultInput" type="text" placeholder="Menu Title" />
              {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
              </div>

              {/* Category */}
              <div className="w-full">
              <select className="defaultInput text-logo-yellow text-xl" defaultValue="" 
              {...register("category", {required:"Category required"})}>
                <option className="text-logo-yellow font-semibold text-xl capitalize bg-gray-bg"  value="" disabled>Select Category</option>
                {
                    options.map(({value, label},index)=><option className="text-logo-yellow font-semibold text-xl capitalize hover:bg-gray-bg" value={value} key={index}>{label}</option>)
                }
              </select>
              {errors.category && <p className="text-xs text-red-400">{errors.category.message}</p>}
              </div>
              </div>
              {/* Ingredients */}
              <div>
                <input
                {...register("ingredients",{required:"ingredients are Required"})} 
                className="defaultInput" type="text" placeholder="Single or Multiple Ingredients" />
                {errors.ingredients && <p className="text-xs text-red-400">{errors.ingredients.message}</p>}
              </div>
              {/* Desc & Price & Thumbnail */}
              <section className="flex lg:flex-row flex-col justify-between items-center gap-7 min-h-[18vh]">

                <div className="w-full h-full">
                <textarea {...register("description",{required:"Description Required"})} placeholder="Meal Description here . . ." className="w-full h-full min-h-[15vh] defaultInput"></textarea>
                {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
                </div>



                <div className="h-full lg:min-h-[15vh] lg:flex-col flex-row flex w-full lg:gap-4 gap-7 justify-between">




                <div className="w-full">
              <div className="relative -top-1">
              <input 
              {...register("image",{
                required:"Please choose a Photo"
              })}
              onChange={handleFileChange} 
               className="defaultInput opacity-0" type="file" placeholder="Choose your Profile Picture" />
              <div onClick={()=>document.querySelector('input[type="file"]').click()} className="absolute top-0 left-0 h-full w-full bg-logo-yellow rounded-lg font-semibold flex justify-center items-center text-white cursor-pointer hover:bg-logo-yellow/85">
                <p className="uppercase font-heading">Choose a Photo</p>
              </div>
              </div>
              {errors.image && <p className="text-xs text-red-400">{errors.image.message}</p>}
              </div>



              {/* price */}
              <div className="w-full">
              <input {...register("price",{required:"Price is Required"})} className="defaultInput" type="number" placeholder="Price" />
              {errors.price && <p className="text-xs text-red-400">{errors.price.message}</p>}
              </div>
                  



                </div>



              </section>

              
              <button className="w-full p-3 mt-4 text-white font-semibold rounded-lg hover:scale-105 bg-logo-yellow transition transform duration-300 shadow-lg focus:outline-none focus:ring-2" type="submit">
                Add Meal
              </button>


            </form>
          </div>
      </div>
    </div>
    </>
  )
}

export default UpcomingMealForm