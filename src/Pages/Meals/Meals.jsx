import { useQuery } from "@tanstack/react-query"
import DynamicTitle from "../../Utilities/DynamicTitle"
import axios from "axios"
import FoodLoading from "../../Components/Loadings/FoodLoading";
import UpcomingCard from "../../Components/UpcommingCard/UpcomingCard";
import MealCard from "../../Components/MealCard/MealCard";
import HeadingTitle from "../../Components/HeadingTitle/HeadingTitle";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

async function fetchMeals(){
  const response = await axios.get("/meals");
  const result = await response.data;
  return result;
} 

function Meals(){
  const [cardNumber, setCardNumber] = useState(8);
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

  function handleCardNumber(){
    setTimeout(()=>{
      setCardNumber(prev=> prev + 4)
    },500)
  }

  const displayedCards = data?.result?.slice(0, cardNumber)
  console.log(displayedCards.length);

  return (
    <>
    <DynamicTitle/>
    <HeadingTitle headingData={headingData} />
    <section className="relative">
      <InfiniteScroll
      dataLength={displayedCards.length}
      next={handleCardNumber}
      hasMore={cardNumber < data?.result?.length}
      loader = {<span className="absolute -bottom-20 left-1/2 text-2xl font-semibold font-heading text-logo-yellow">Please wait . . .</span>}
      endMessage={
        <p className="absolute -bottom-20 left-1/2 text-2xl font-semibold font-heading text-logo-yellow">
          Yay! You have seen it all
        </p>
      }
      className="flex gap-10 flex-wrap justify-center items-center lg:my-12 my-14">
        {
          displayedCards?.map((item)=><MealCard key={item._id} cardData={item}/>)
        }
      </InfiniteScroll>
    </section>
    </>
  )
}


const headingData = {
  heading:"All Meals",
  desc:"Welcome to the All Meals page, your go-to destination for discovering the variety of delicious meals we offer. From hearty breakfasts to fulfilling lunches and comforting dinners, we’ve curated a menu that caters to every taste and preference."
}

export default Meals