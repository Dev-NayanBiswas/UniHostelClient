import { useState } from "react"
import HeadingTitle from "../../../Components/HeadingTitle/HeadingTitle";
import MealCard from "../../../Components/MealCard/MealCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MealLoading from "../../../Components/Loadings/MealLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";


const headingData = {
  heading:"Categories",
  desc:"Explore a variety of delicious meals across different categories like breakfast, lunch, and dinner. Whether you're craving something light or hearty, our category meals offer options to suit every taste and preference."
}


async function categoryFetcher(cat){
  const query = cat && cat !== 'all' ? `?category=${cat}` : ""
  const response = await axios.get(`/meals${query}`);
  return response; 
}

function CategoryMeals(){
    const [category, setCategory] = useState('all');
    const [cardNumber, setCardNumber] = useState(10)
    const {data, isLoading, isError, error} = useQuery({
      queryKey:['categoryMeals', category],
      queryFn:async()=>categoryFetcher(category),
    })

    if(isLoading){
      return <section className="flex justify-center items-center w-full h-[70vh]">
      <div className="flex flex-row gap-2 ">
      <div className="w-4 h-4 rounded-full bg-logo-yellow animate-bounce [animation-delay:.7s]" />
      <div className="w-4 h-4 rounded-full bg-logo-yellow animate-bounce [animation-delay:.3s]" />
      <div className="w-4 h-4 rounded-full bg-logo-yellow animate-bounce [animation-delay:.7s]" />
    </div>
    </section>;
    }
    if(isError){
      return <p className="text-center text-3xl font-semibold text-red-600">{error.message}</p>
    }


  return (
    <>
    <section className="min-h-[70vh]">
      <HeadingTitle headingData={headingData}/>
        <section className="flex justify-between items-center bg-transparent rounded-xl border-[2px] border-logo-yellow/45 overflow-hidden lg:w-5/12 md:w-10/12 w-full mx-auto">
            <button onClick={()=>setCategory("breakfast")}  className={category === 'breakfast' ? "tabActive" : "tabInActive"}>Breakfast</button>
            <button onClick={()=>setCategory("lunch")}  className={category === 'lunch' ? "tabActive" : "tabInActive"}>Lunch</button>
            <button onClick={()=>setCategory("dinner")}  className={category === 'dinner' ? "tabActive" : "tabInActive"}>Dinner</button>
            <button onClick={()=>setCategory("all")}  className={category === 'all' ? "tabActive" : "tabInActive"}>All</button>
        </section>
        <section className="my-10 flex flex-wrap gap-5 justify-center items-center min-h-[50vh]">
          {
            data?.data?.result.slice(0,cardNumber).map((item, index)=><MealCard key={item._id} index={index} cardData={item}/>)
          }
        </section>

          <section className="my-5 mx-10 flex justify-between items-center">
          {
            cardNumber > 10 ? <motion.button whileHover={{scale:1.5}} whileTap={{scale:1}} transition={{duration:0.5}} onClick={()=>setCardNumber(prev=>prev-5)}>
            <FontAwesomeIcon className="text-xl font-semibold text-logo-yellow" icon={faAnglesLeft}/>
          </motion.button> : ""
          }
          <div className="w-full"/>
          {
            data?.data?.result?.length > cardNumber ||  data?.data?.result?.length === 10 ?
            <motion.button whileHover={{scale:1.5}} transition={{duration:0.5}} whileTap={{scale:1}} onClick={()=>setCardNumber(prev=>prev+5)}>
            <FontAwesomeIcon className="text-xl font-semibold text-logo-yellow" icon={faAnglesRight}/>
          </motion.button> : ""
          }
        </section>

    </section>
    </>
  )
}

export default CategoryMeals