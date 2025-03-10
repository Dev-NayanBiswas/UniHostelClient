import { useQuery, useQueryClient } from "@tanstack/react-query"
import useAuth from "../../../Hooks/useAuth"
import axios from "axios";
import FoodLoading from "../../../Components/Loadings/FoodLoading";
import HeadingTitle from "../../../Components/HeadingTitle/HeadingTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faPenFancy, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import ReviewInput from "../../../Components/Forms/ReviewInput";
import useAxiosSecure from "../../../Hooks/AxiosAPI/useAxiosSecure";
import confirmToast from "../../../Utilities/confirmToast";
import Toast from "../../../Utilities/sweetToast";

function MyReviews(){
  const {userData, loading} = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure()
  const email = userData?.email;
  const {data, isLoading, isError, error} = useQuery({
    queryKey:["myReviews", email],
    queryFn:async()=>{
      const response = await axiosSecure.get(`/reviews/studentReviews/${email}`);
      const result = await response.data;
      return result; 
    },
    enabled:!!email && !loading,
  });


  if(isLoading){
    return <FoodLoading/>
  }

  if(isError){
    return <p className='text-2xl text-red-600 text-center my-28 font-semibold font-heading'>
    {error.message}
  </p>
  }

  // console.log(data.result);
  async function deleteReview(data){
    const response = await axiosSecure.delete(`/reviews/studentReviews/${email}`, {params:{...data}});
    const result = await response?.data?.result;
    if(result.deletedCount>0){
      queryClient.invalidateQueries(["myReviews","details"]);
      Toast.fire({
        icon:"info",
        title:"Review Deleted"
      })
    };
  }

  return (
    <>
    <HeadingTitle headingData={headingData}/>
    <section> 
    <section className="w-full mx-auto">
      <div className="overflow-x-auto">
  
    {
      data?.result?.length ? 
      <table className="table text-center text-gray-400">
    <thead className="font-heading md:text-lg text-sm border-[2px] rounded-full border-logo-yellow/45 text-logo-yellow">
      <tr>
        <th></th>
        <th>Image</th>
        <th>Title</th>
        <th>Review</th>
        <th>Actions</th>
      </tr>
    </thead>
      <tbody>
      {/* row 1 */}
      {
        data?.result?.map((item, index)=><TableRow key={item._id} idx={index} item={item} deleteReview={deleteReview}/>)
      }
    </tbody> 
  </table> : <h1 className="text-center text-2xl my-10 font-bold text-orange-600">Add Some Reviews First</h1>
    }
</div>
      </section>
    </section>
    </>
  )
}

const headingData = {
  heading:"My Reviews",
  desc:"This platform lets you view, edit, or delete meal reviews with ease. The layout is designed for smooth navigation, making it simple for you to manage feedback, update entries, or remove them as needed, all in an intuitive and efficient way."
}

const messages = {
  title1:"Sure you want to Delete",
  text1:'Review will be Erased',
  btnText:'Delete',
  icon:'warning',
}


function TableRow({item,idx, deleteReview}){
  const [showModal, setShowModal] = useState(false);
  // console.log(item);
  const {_id,image,title,likes,reviewCount,reviewID, comment, myRating} = item || {}
  const data = {reviewID:reviewID, mealID:_id, myRating:myRating}
  return (
    <>
      <tr>
      <td className="w-[20px] text-lg font-heading italic">
        {idx + 1}
      </td>

        <td className="flex flex-row justify-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div className="text-left flex flex-col justify-center">
            <h1>{likes} Likes</h1>
            <h1 className="whitespace-nowrap">{reviewCount} Reviews</h1>
            </div>
        </td>
        <td>
          <h1 className="capitalize font-semibold text-sm">{title}</h1>
        </td>
        <td className="text-center">
          <p>{comment.substring(0,40)}</p>
        </td>
        <td className="">
         <div className="flex justify-center items-center gap-3">
 
        
        
        <Link to={`/details/${_id}`} className="p-2 aspect-square rounded-full bg-gray-300/25 drop-shadow-2xl shadow shadow-black/65 flex justify-center items-center">
              <FontAwesomeIcon className="text-2xl text-logo-yellow hover:text-red-500 transition-all duration-200" icon={faEye}/>
          </Link>
          <button onClick={()=>setShowModal(true)} className="p-2 aspect-square rounded-full bg-gray-300/25 drop-shadow-2xl shadow shadow-black/65">
        <FontAwesomeIcon className="text-2xl text-logo-yellow hover:text-red-500 transition-all duration-200" icon={faPenFancy}/>
          </button>
          <button onClick={()=>confirmToast(()=>deleteReview(data),messages)} className="p-2 aspect-square rounded-full bg-gray-300/25 drop-shadow-2xl shadow shadow-black/65">
        <FontAwesomeIcon className="text-2xl px-1 text-logo-yellow hover:text-red-500 transition-all duration-200" icon={faTrashCan}/>
          </button>
         </div>
        </td>
      </tr>
        {
          showModal?
        <section className="fixed w-full h-full bg-logo-yellow/45 flex justify-center items-center top-0 left-0 right-0 bottom-0 z-50">
           <span onClick={()=>setShowModal(false)} className="text-red-900 md:text-4xl text-2xl aspect-square md:px-[13px] px-[10px] md:py-1 py-[2px] border-[2px] cursor-pointer border-red-900 rounded-full font-bold absolute top-20 right-20">
            <FontAwesomeIcon icon={faXmark}/>
            </span> 

            <section>
              <section className="lg:w-7/12 lg:h-[60vh] h-[80vh] w-10/12 mx-auto bg-gray-bg p-5 rounded-xl border-4 border-logo-yellow flex flex-col justify-center">
                <ReviewInput prevReview={item} closeModal={()=>setShowModal(false)}/>
              </section>
            </section>
      </section> : ""
        }
    </>
  )
}


export default MyReviews