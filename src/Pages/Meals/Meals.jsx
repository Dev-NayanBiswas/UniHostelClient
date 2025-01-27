import { useQuery } from "@tanstack/react-query"
import DynamicTitle from "../../Utilities/DynamicTitle"
import axios from "axios"
import FoodLoading from "../../Components/Loadings/FoodLoading";
import MealCard from "../../Components/MealCard/MealCard";
import HeadingTitle from "../../Components/HeadingTitle/HeadingTitle";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import debounce from "lodash.debounce";

async function fetchMeals({category, search, sort, min, max}){

  const params = {
    category: category !== 'all' ? category : undefined,
    search: search || undefined,
    sort: sort || undefined,
    max: max || undefined,
    min: min || undefined
  }
  const response = await axios.get("/meals/category/search/sort", {params});
  const result = await response.data;
  // console.log(result);
  return result;
} 

function Meals(){
  const [cardNumber, setCardNumber] = useState(8);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)

  const handleSearchDebounced = debounce((value) => {
    setSearch(value);
  }, 1000);
  const handleMinDebounced = debounce((value) => {
    setMin(value);
  }, 200);
  const handleMaxDebounced = debounce((value) => {
    setMax(value);
  }, 200);

  const {isLoading, data, isError, error, isPending} = useQuery({
    queryKey:["meals", category, search, sort, min, max],
    queryFn:()=>fetchMeals({category, search, sort, min , max}),
    keepPreviousData:true
  })

  if(isLoading){
    return <section className="flex justify-center items-center w-full h-[70vh]">
    <div className="flex flex-row gap-2 ">
    <div className="w-4 h-4 rounded-full bg-logo-yellow animate-bounce [animation-delay:.7s]" />
    <div className="w-4 h-4 rounded-full bg-logo-yellow animate-bounce [animation-delay:.3s]" />
    <div className="w-4 h-4 rounded-full bg-logo-yellow animate-bounce [animation-delay:.7s]" />
  </div>
  </section>
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

  return (
    <>
    <DynamicTitle/>
    <HeadingTitle headingData={headingData} />
    <section className="lg:w-10/12 w-full mx-auto">
      <div className="flex flex-col justify-center w-full md:flex-row items-center gap-4">
      {/* Category Dropdown */}
      <div className="w-full">
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="defaultInput text-logo-yellow font-heading !rounded-none !border-logo-yellow/45"
        >
          <option value="all">Category</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>

      {/* Search Bar */}
      <div className="w-full flex self-end items-center relative">
        <label className="sr-only" htmlFor="search">
          Search
        </label>
        <input
          id="search"
          type="text"
          defaultValue={search}
          onChange={(e)=>handleSearchDebounced(e.target.value)}
          placeholder="Search . . ."
          className="defaultInput text-logo-yellow font-heading !rounded-none !border-logo-yellow/45"
        />
        <HiMiniMagnifyingGlass className="absolute right-3 text-logo-yellow font-semibold" size={20} />
      </div>

      {/* Filter Dropdown */}
      <div className="w-full">
        <select
          id="filter"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="defaultInput text-logo-yellow font-heading !rounded-none !border-logo-yellow/45"
        >
          <option value="">Filter</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
          <option value="latest">Date: Latest</option>
          <option value="oldest">Date: Oldest</option>
        </select>
      </div>
    </div>
    <div>
    <section>
      <section className="w-full mt-4 flex justify-center items-center gap-1">
        <div className="flex justify-between">
          <span className="py-1 text-xs text-center text-gray-bg/45 min-w-[61px] font-heading rounded-full bg-logo-yellow font-semibold">Min : {min}</span>
        </div>
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={min}
          onChange={(e) => handleMinDebounced(e.target.value)}
          className="w-full bg-gray-600/25 h-[2px] rounded-full accent-logo-yellow appearance-none cursor-pointer"
        />
      </section>
      <section className="w-full mt-4 flex justify-center items-center gap-1">
        
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={max}
          onChange={(e) => handleMaxDebounced(e.target.value)}
          className="w-full bg-gray-600/25 h-[2px] rounded-full accent-logo-yellow appearance-none cursor-pointer"
        />
        <div className="flex justify-between">
          <span className="py-1 text-xs text-center text-gray-bg/45 min-w-[61px] font-heading rounded-full bg-logo-yellow font-semibold whitespace-nowrap px-2">Max : {max}</span>
        </div>
      </section>
      </section>
    </div>



    </section>
    



    <section className="relative">
      <InfiniteScroll
      dataLength={displayedCards?.length}
      next={handleCardNumber}
      hasMore={cardNumber < data?.result?.length}
      loader = {<span className="absolute -bottom-20 left-1/2 text-2xl font-semibold font-heading text-logo-yellow">Please wait . . .</span>}
      endMessage={
        <p className="absolute -bottom-20 left-1/2 -translate-x-1/2 md:text-2xl text-lg whitespace-nowrap font-semibold font-heading text-logo-yellow my-6">
          Stay tune for updates . . .
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