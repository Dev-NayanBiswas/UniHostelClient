import { useQuery } from "@tanstack/react-query"
import DynamicTitle from "../../Utilities/DynamicTitle"
import axios from "axios"
import FoodLoading from "../../Components/Loadings/FoodLoading";
import UpcomingCard from "../../Components/UpcommingCard/UpcomingCard";

async function fetchMeals(){
  const response = await axios.get("/meals");
  const result = await response.data;
  return result;
} 

function Meals(){
  const {isLoading, data, isError, error} = useQuery({
    queryKey:["meals"],
    queryFn:fetchMeals,
  })

  if(isLoading){
    return <FoodLoading/>
  }

  if(isError){
    return <p className="text-2xl text-red-600 text-center my-28 font-semibold font-heading">{error.message}</p>
  }


  console.log(data);

  return (
    <>
    <DynamicTitle/>
    <section>
      <section className="flex gap-7 flex-wrap justify-center items-center lg:my-12 my-14">
        {
          data?.result.map((item)=><UpcomingCard key={item._id} cardData={item}/>)
        }
      </section>
    </section>
    </>
  )
}

export default Meals