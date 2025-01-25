import { useQuery, useQueryClient } from "@tanstack/react-query";
import useMealCURD from "../../../Hooks/CURDS/useMealCURD";
import useAuth from "../../../Hooks/useAuth"
import FoodLoading from "../../../Components/Loadings/FoodLoading";
import HeadingTitle from "../../../Components/HeadingTitle/HeadingTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import confirmToast from "../../../Utilities/confirmToast";
import useAxiosSecure from "../../../Hooks/AxiosAPI/useAxiosSecure";
import Toast from "../../../Utilities/sweetToast";

function RequestedMeals(){
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const {userData, loading} = useAuth();
  const email = userData?.email;
  const {getAllRequestedMeals} = useMealCURD();
  const {data, isLoading, isError, error} = useQuery({
    queryKey:["requestMeals", email],
    queryFn:()=>getAllRequestedMeals(email),
    enabled:!!email && !loading
  })

  if (isLoading) {
    return <FoodLoading/>;
  }

  if (isError) {
    return (
      <p className='text-2xl text-red-600 text-center my-28 font-semibold font-heading'>
        {error.message}
      </p>
    );
  }



  async function cancelMeal(id){
    const response = await axiosSecure.delete(`/studentMeals/${email}`,{params:{id}});
    const result = await response.data;
    if(result?.result.deletedCount){
      Toast.fire({
      icon: "success",
      title: "Request Canceled"
    });
    queryClient.invalidateQueries(["requestMeals"])
    }
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
        <th className="text-left">Likes</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
      <tbody>
      {/* row 1 */}
      {
        data?.result?.map((item, index)=><TableRow key={item._id} idx={index} cancelMeal={cancelMeal} item={item}/>)
      }
    </tbody> 
  </table> : <h1 className="text-center text-2xl my-10 font-bold text-orange-600">Send Request First</h1>
    }
</div>
      </section>
    </section>
    </>
  )
}

const headingData = {
  heading:"Pending Meals",
  desc:"This page provides an overview of all your pending meal requests in the hostel. Here, you can see the details of meals you've requested and cancel any pending requests effortlessly before they’re prepared or served."
}

const messages = {
  title1:"Sure you want to Cancel",
  text1:'Meal will be Removed',
  btnText:'Remove',
  icon:'question',
}

function TableRow({item,idx, cancelMeal}){
  const {_id,image,title,likes,reviewCount, status, requestID} = item || {}
  return (
    <tr>
      <td className="w-[20px] text-lg font-heading italic">
        {idx + 1}
      </td>

        <td>
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
        </td>
        <td>
          <h1 className="capitalize font-semibold text-sm">{title}</h1>
        </td>
        <td className="text-left">
          <h1>{likes} Likes</h1>
          <h1 className="whitespace-nowrap">{reviewCount} Reviews</h1>
        </td>
        <td className="">
        <div className="h-full flex justify-center items-center">
        <span
        style={{
          background:status === "requested" ? "black" : "green"
        }}
         className="z-20 px-4 py-1 rounded-e-full rounded-s-full text-white capitalize border-[1px] border-gray-bg/45 font-semibold w-[100px] h-[30px]">
              {status}
          </span>
        </div>

        </td>
        <td className="">
         <div className="flex justify-center items-center gap-3">
         {
          status === "requested" ?
          <button onClick={()=>confirmToast(()=>cancelMeal(requestID),messages)} className=" bg-red-800  z-20 px-4 py-1 rounded-e-full rounded-s-full text-white border-[1px] border-red-800 font-semibold h-full">
            Cancel
        </button> :
        
        <FontAwesomeIcon className="lg:text-3xl md:text-2xl text-lg font-bold italic text-green-500 " icon={faCheck}/>
         }
         </div>
        </td>
      </tr>
  )
}

export default RequestedMeals