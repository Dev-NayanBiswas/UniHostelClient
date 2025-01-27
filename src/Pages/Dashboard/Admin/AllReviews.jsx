import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/AxiosAPI/useAxiosSecure";
import FoodLoading from "../../../Components/Loadings/FoodLoading";
import Toast from "../../../Utilities/sweetToast";
import HeadingTitle from "../../../Components/HeadingTitle/HeadingTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashCanArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import confirmToast from "../../../Utilities/confirmToast";


function AllReviews(){
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure()
  const {data, isLoading, isError, error} = useQuery({
    queryKey:["AllReviews"],
    queryFn:async()=>{
      const response = await axiosSecure.get(`/reviews/studentReviews`);
      const result = await response.data;
      return result; 
    },
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
    const response = await axiosSecure.delete(`/reviews/studentReviews`, {params:{...data}});
    const result = await response?.data?.result;
    if(result.deletedCount>0){
      queryClient.invalidateQueries(["AllReviews","details"]);
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
  heading:"All Reviews",
  desc:"This platform lets you view, edit, or delete meal reviews with ease. The layout is designed for smooth navigation, making it simple for Admin to manage feedback, or remove them as needed, all in an intuitive and efficient way."
}

const messages = {
  title1:"Sure you want to Delete",
  text1:'Review will be Erased',
  btnText:'Delete',
  icon:'warning',
}


function TableRow({item,idx, deleteReview}){
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
          <button onClick={()=>confirmToast(()=>deleteReview(data),messages)} className="p-2 aspect-square rounded-full bg-gray-300/25 drop-shadow-2xl shadow shadow-black/65">
        <FontAwesomeIcon className="text-2xl px-1 text-logo-yellow hover:text-red-500 transition-all duration-200" icon={faTrashCanArrowUp}/>
          </button>
         </div>
        </td>
      </tr>
    </>
  )
}


export default AllReviews