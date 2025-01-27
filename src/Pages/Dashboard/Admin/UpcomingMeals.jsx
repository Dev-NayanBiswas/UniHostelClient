import React, { useState } from 'react'
import UpcomingMealForm from '../../../Components/Forms/UpcomingMealForm'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import FoodLoading from '../../../Components/Loadings/FoodLoading';
import axios from 'axios';
import DynamicTitle from '../../../Utilities/DynamicTitle';
import HeadingTitle from '../../../Components/HeadingTitle/HeadingTitle';
import Toast from '../../../Utilities/sweetToast';
import useAxiosSecure from '../../../Hooks/AxiosAPI/useAxiosSecure';


async function fetchUpcomingMeals(){
  const response = await axios.get(`/meals?status=upcoming`);
  const result = await response.data;
  return result; 
}

const headingData = {
  heading:"Upcoming Meal",
  desc:"Ready to impress Students with our upcoming meal! A delicious blend of flavors awaits, crafted to delight and energize. Perfect for breakfast, lunch, or dinner—stay tuned!"
}

function UpcomingMeals(){
  const [showModal, setShowModal] = useState(false);

  const {isError, error, isLoading, data} = useQuery({
    queryKey:["upcomingMeals"],
    queryFn:fetchUpcomingMeals,
  });

  if(isError){
    return (
      <p className='text-2xl text-red-600 text-center my-28 font-semibold font-heading'>
        {error.message}
      </p>
    );
  }
  if(isLoading){
    return <FoodLoading/>
  }

  console.log(data)
  return (
    <>
    <DynamicTitle headingData={"Upcoming Meal"}/>
    <HeadingTitle headingData={headingData}/>
    
    {
      showModal ? 
      <section className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-logo-yellow/65 z-50 grid place-items-center">
      <section className="lg:w-8/12 w-11/12 rounded-xl p-4 mx-auto bg-gray-bg">
      <UpcomingMealForm closeModal={()=>setShowModal(false)}/>
      </section>
    </section> : " "
    }
    <section className="text-right my-4">
    {
      !showModal ? <button onClick={()=>setShowModal(true)} className="px-3 rounded-sm hover:bg-gray-bg hover:text-white transition-all duration-500 py-2 border-logo-yellow/45 hover:border-gray-bg/45 border-[2px] font-heading text-logo-yellow font-semibold">Add Upcoming Meal</button> : " "
    }
    </section>
    <section>
    <table className="table text-left text-gray-400">
    <thead className="font-heading md:text-lg text-sm border-[2px] rounded-full border-logo-yellow/45 text-logo-yellow">
      <tr>
        <th></th>
        <th>Meals</th>
        <th>Status</th>
        <th>Distributor</th>
        <th className="text-center">Actions</th>
      </tr>
    </thead>
      <tbody>
      {/* row 1 */}
      {
        data?.result?.map((item, index)=><TableRow key={item._id} idx={index} item={item}/>)
      }
    </tbody> 
  </table>
    </section>
      
    </>
  )
}

export default UpcomingMeals

function TableRow({item,idx}){
  const clientQuery = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const {_id,image,title,likes,reviewCount,adminName,category,state} = item || {};


  const publishMeal = async(id)=>{
    const response = await axiosSecure.patch('/meals',{id});
    const result = await response.data;
    console.log(result);
    return result;
  }

  const publishMutation = useMutation({
    mutationKey:["publishMeal"],
    mutationFn:(id)=>publishMeal(id),
    onSuccess:()=>{
      clientQuery.invalidateQueries(["upcomingMeals"])
      Toast.fire({
        icon:"success",
        title:"Cuisine Published"
      });
    },
    onError:(error)=>{
      Toast.fire({
        icon:"error",
        title:`Error in Removing Meal ${error.message}`
      })
    }
  })


  return (
    <>
      <tr>
      <td className="w-[20px] text-lg font-heading italic">
        {idx + 1}
      </td>

        <td className="flex flex-row justify-start items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div className="text-left flex flex-col justify-center">
            <h1 className="text-lg font-semibold whitespace-nowrap">{title}</h1>
            <h1>{likes} Likes</h1>
            <h1 className="whitespace-nowrap">{reviewCount} Reviews</h1>
            </div>
        </td>
        <td className="">
          <div className="">
          <h1 className="capitalize font-semibold text-sm whitespace-nowrap"><span className="font-semibold "></span> {category}</h1>
          <h1 className="capitalize font-semibold text-white text-sm whitespace-nowrap py-1 px-4 rounded-s-full rounded-e-full bg-orange-600 w-[100px] text-center mt-1">{state}</h1>
          </div>
        </td>
        <td className="text-left">
          <p>{adminName}</p>
        </td>
        <td className="">
         <div className="flex justify-center items-center gap-3">
 
      
          <button onClick={()=>publishMutation.mutate(_id)} className="px-5 py-1 w-[107px] text-center rounded-e-full rounded-s-full text-sm text-white  font-semibold whitespace-nowrap bg-green-700 hover:bg-lime-900 tracking-wide transition-all duration-500 drop-shadow-2xl shadow shadow-black/65">
          Publish
          </button>
         </div>
        </td>
      </tr>
    </>
  )
}
