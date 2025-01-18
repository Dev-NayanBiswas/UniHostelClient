import { useQuery } from "@tanstack/react-query"
import HeadingTitle from "../HeadingTitle/HeadingTitle"
import FoodLoading from "../Loadings/FoodLoading";
import axios from "axios";
import SubscriptionCard from "./SubscriptionCard";


const headingData = {
  heading:"Subscriptions",
  desc:"Unlock the full potential of your hostel experience with our exclusive meal packages! Enjoy delicious, nutritious meals crafted for your taste and health. Explore our website for seamless access to meal plans, updates, and exclusive benefits designed just for you!"
}


async function subscriptions(){
  const response = await axios.get("/subscriptions");
  return response.data?.result;
}

function SubscriptionsContainer(){
  const {isError,error,isLoading,data} = useQuery({
    queryKey:["subscriptions"],
    queryFn:()=>subscriptions(),
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
    <HeadingTitle headingData={headingData} />
        <section className="flex flex-wrap justify-center items-center gap-10 my-10">
          {
            data?.map((item, index)=><SubscriptionCard key={index} cardData={item}/>)
          }
        </section>
    </>
  )
}

export default SubscriptionsContainer