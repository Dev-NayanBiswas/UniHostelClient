import HeadingTitle from "../../../../Components/HeadingTitle/HeadingTitle"
import useMealCURD from "../../../../Hooks/CURDS/useMealCURD";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useStudentsCURD from "../../../../Hooks/Students/useStudentsCURD";

function PendingMeals(){
    const queryClient = useQueryClient();
    const {userData,loading} = useAuth();
    const {} = useStudentsCURD();
    const {getStudentMeals} = useMealCURD();
    const {data, isLoading, isError, error} = useQuery({
        queryKey:["studentMeals"],
        queryFn:()=>getStudentMeals(pendingMeals),
        enabled:!!email && !loading
    })
    

    if(isLoading || loading){
        return <p>Loading......</p>
    }
    if(isError){
        return <p>Error......</p>
    }

    // const setData = {
    //     email:email,
    //     mealID:_id,
    //     requested:true
    //   }

    async function cancelMeal(id){
      const setData = {
        email:email,
        mealID:id,
        remove:true
      }
      // const response = await ""(setData);
      // if(response?.result?.modifiedCount){
      //   queryClient.invalidateQueries(['studentMeals'])
      // };
    }

  return (
    <>
    <HeadingTitle headingData={{heading:"Pending Meals"}}/>
    
    <section>
    <section className="w-full mx-auto">
      <div className="overflow-x-auto">
  
    {
      data?.length ? 
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
        data?.map((item, index)=><TableRow key={item._id} idx={index} cancelMeal={cancelMeal} item={item}/>)
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



export default PendingMeals;

function TableRow({item,idx, cancelMeal}){
  const {_id,image,title,likes,reviewCount} = item || {}
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
          <h1>{reviewCount} Reviews</h1>
        </td>
        <td className="">
        <div className="h-full flex justify-center items-center">
        <span className=" bg-gray-bg  z-20 px-4 py-1 rounded-e-full rounded-s-full text-white capitalize border-[1px] border-gray-bg/45 font-semibold h-full">
              pending
          </span>
        </div>

        </td>
        <td className="">
         <div className="flex justify-center items-center gap-3">
         <button onClick={()=>cancelMeal(_id)} className=" bg-red-800  z-20 px-4 py-1 rounded-e-full rounded-s-full text-white border-[1px] border-red-800 font-semibold h-full">
            Cancel
        </button>  
        {/* <button onClick={()=>(console.log("object"))} className="p-2 aspect-square rounded-full bg-gray-300/25 drop-shadow-2xl shadow shadow-black/65">
              btn
          </button>
        <button onClick={()=>(console.log("object"))} className="p-2 aspect-square rounded-full bg-gray-300/25 drop-shadow-2xl shadow shadow-black/65">
              btn
          </button> */}
         </div>
        </td>
      </tr>
  )
}