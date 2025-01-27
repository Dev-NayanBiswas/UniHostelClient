import { useNavigate } from "react-router-dom"
import { useState } from "react"
import imageUploader from "../../Utilities/imageUploader.js"
import { useForm} from "react-hook-form"
import useAuth from "../../Hooks/useAuth"
import DynamicTitle from "../../Utilities/DynamicTitle.jsx"
import HeadingTitle from "../HeadingTitle/HeadingTitle.jsx"
import Toast from "../../Utilities/sweetToast.js"
import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"


  const options = [
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "Dinner", label: "Dinner" },
  ];

function UpdateMealForm({prevValue, closeModal}){
  const queryClient = useQueryClient();
  const {_id,title, category,ingredients,description, price, image} = prevValue || {};

const {register, handleSubmit, reset, formState:{errors}} = useForm({defaultValues:{
  title:title,
  category:category,
  ingredients:ingredients,
  description:description,
  price:price,
}})


async function updateMeal(data){
  const response = await axios.patch(`/meals/editMeal/${_id}`, data);
  const result = await response.data;
  // console.log(result);
  return result;
}

const patchMutation = useMutation({
  mutationKey:["patchMeal"],
  mutationFn:(data)=>updateMeal(data),
  onSuccess:()=>{
    queryClient.invalidateQueries(["allCategoryMeals"]);
    closeModal();
    Toast.fire({
      icon:"success",
      title:"Meal Updated"
    })
  },
  onError:(error)=>{
    Toast.fire({
      icon:"error",
      title:`Error in Updating Meal ${error.message}`
    })
  }
})

function handleAddMeal(data){
  let ingredients = data.ingredients;
  if (!Array.isArray(ingredients)) {
    ingredients = ingredients.split(/[\s,]+/).filter(Boolean);
  }

  patchMutation.mutate({...data,ingredients});

      reset({
          title:"",
          category:"",
          ingredients:"",
          description:"",
          price:"",
      })
}



  return (
    <>
    <section className="md:block hidden">
    <HeadingTitle headingData={{heading:"Update Meal"}}/>
    </section>
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-full">
          <div className="lg:w-9/12 w-full mx-auto">
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
                
                <section className="lg:w-7/12 w-full flex flex-col gap-4">
                <div className="w-full">
                <textarea {...register("description",{required:"Description Required"})} placeholder="Meal Description here . . ." className="w-full min-h-[18vh] defaultInput"></textarea>
                {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
                </div>
                  {/* Price */}
                <div className="w-full">
              <input {...register("price",{required:"Price is Required"})} className="defaultInput" type="number" placeholder="Price" />
              {errors.price && <p className="text-xs text-red-400">{errors.price.message}</p>}
              </div>
                </section>


              <div className="lg:w-5/12 md:w-full w-full lg:h-[25vh] h-[20vh]  aspect-video rounded-lg">
                <img src={image} className="h-full w-full object-cover rounded-lg" alt="" />
              {/* <input 
              {...register("image",{
                required:"Please choose a Photo"
              })}
              onChange={handleFileChange} 
               className="defaultInput opacity-0" type="file" placeholder="Choose your Profile Picture" />
              <div onClick={()=>document.querySelector('input[type="file"]').click()} className="absolute top-0 left-0 h-full w-full bg-logo-yellow rounded-lg font-semibold flex justify-center items-center text-white">
                <p className="uppercase font-heading">Choose a Photo</p>

              {/* {errors.image && <p className="text-xs text-red-400">{errors.image.message}</p>} */}
              </div>
              </section>
              <button className="w-full p-3 text-white font-semibold rounded-lg hover:scale-105 bg-logo-yellow transition transform duration-300 shadow-lg focus:outline-none focus:ring-2" type="submit">
                Update Meal
              </button>


            </form>
          </div>
      </div>
    </div>
    </>
  )
}

export default UpdateMealForm