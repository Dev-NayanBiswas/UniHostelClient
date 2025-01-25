import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/AxiosAPI/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import PendingMeals from "./StudentMeals/PendingMeals"
import ServedMeals from "./StudentMeals/ServedMeals"
import FoodLoading from "../../../Components/Loadings/FoodLoading";

function RequestedMeals(){

  const axiosSecure = useAxiosSecure()
  const {userData, loading} = useAuth();
  const email = userData?.email;
  const {data, isLoading, isError, error} = useQuery({
    queryKey:["myProfile", email],
    queryFn:async()=>{
      const response = await axiosSecure.get(`/students/${email}`);
      const result = await response.data;
      return result;
    },
    enabled:!!email && !loading,
  })

  if(isLoading){
    return <FoodLoading/>
  }

  if(isError){
    return <p className='text-2xl text-red-600 text-center my-28 font-semibold font-heading'>
    {error.message}
  </p>
  }

  const{_id,role,name,image,email:userEmail,badge,color,pendingMeals, servedMeals}= data.result || {}

  // console.log(pendingMeals)
  
  return (
    <section>
      <section>
        <PendingMeals pendingMeals={pendingMeals} email={email}/>
      </section>
      <section>
        <ServedMeals servedMeals={servedMeals} email={email}/>
      </section>
    </section>
  )
}

export default RequestedMeals