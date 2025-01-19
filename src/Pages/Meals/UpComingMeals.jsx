import { useQuery } from "@tanstack/react-query"
import HeadingTitle from "../../Components/HeadingTitle/HeadingTitle"
import DynamicTitle from "../../Utilities/DynamicTitle"
import FoodLoading from "../../Components/Loadings/FoodLoading";
import axios from "axios";
import UpcomingCard from "../../Components/UpcommingCard/UpcomingCard";


const headingData = {
  heading:"Coming Soon",
  desc:"Stay updated on the deliciousness coming your way! Our Upcoming Meals section showcases the exciting dishes we’re preparing, so you’ll always know what to look forward to and savor next."
}

async function fetchUpcomingMeals(){
  const response = await axios.get(`/meals?status=upcoming`);
  const result = await response.data;
  return result; 
}

function UpComingMeals(){
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
  console.log(data);

  return (
    <>
    <DynamicTitle/>
    <HeadingTitle headingData={headingData}/>
    <section className="flex flex-wrap justify-center items-center gap-7">
        {
          data?.result?.map((item)=><UpcomingCard cardData={item} key={item._id} />)
        }
    </section>
    </>
  )
}

export default UpComingMeals