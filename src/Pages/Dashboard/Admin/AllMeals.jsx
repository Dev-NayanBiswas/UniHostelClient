import { FiSearch } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import HeadingTitle from "../../../Components/HeadingTitle/HeadingTitle"
import FoodLoading from "../../../Components/Loadings/FoodLoading";
import useAdminCURD from "../../../Hooks/Admin/useAdminCURD";
import useAuth from "../../../Hooks/useAuth"
import confirmToast from "../../../Utilities/confirmToast";
import Toast from "../../../Utilities/sweetToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenFancy, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

function AllMeals(){
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("likes");
  const [page, setPage] = useState(1);
  const limit = 5; 
  const {getAllMeals} = useAdminCURD();
  const {userData, loading} = useAuth();




  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearch(search);
    }, 1000); // Adjust delay (500ms)

    handler();

    return () => {
      handler.cancel(); // Cleanup debounce on unmount or re-render
    };
  }, [search]);

  const {data, isLoading, isError, error, isPending} = useQuery({
    queryKey:["allCategoryMeals",  debouncedSearch, sortBy, page],
    queryFn:()=>getAllMeals({ search: debouncedSearch, sortBy, page, limit }),
  })


  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.value;
      setSearch(value);
      setPage(1); // Reset to first page on new search
      console.log(value)
  };


  if (isLoading && !search) {
    return <FoodLoading/>;
  }

  if (isError) {
    return (
      <p className='text-2xl text-red-600 text-left my-28 font-semibold font-heading'>
        {error.message}
      </p>
    );
  }

  const totalPages = data?.totalPages || 1;


  const handleSort = (newSort) => {
    setSortBy(newSort);
    setPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  console.log(data); 

  return (
    <>
    <HeadingTitle headingData={{heading:"All Meals"}}/>

    {/* buttons */}
    <div className="flex flex-col md:flex-row items-center gap-4 my-5">
      {/* Sort by Likes Button */}
      <button onClick={() => handleSort("likes")} className="px-4 py-2 text-xl font-semibold font-heading normal-case transition-all duration-500 bg-logo-yellow md:w-3/12 w-full text-white hover:bg-gray-bg">
        sort by like
      </button>

      {/* Search Bar */}
      <div className="relative flex-1 md:w-2/3">
        <input
          type="text"
          placeholder="Search meals..."
          defaultValue={search}
          onChange={handleSearch}
          className="w-full px-4 py-2 pl-10 border-[2px] border-logo-yellow/45 bg-transparent focus:outline-none"
        />
        <FiSearch className="absolute text-xl top-1/2 left-3 transform -translate-y-1/2 text-logo-yellow" size={20} />
      </div>

      {/* Sort by Reviews Button */}
      <button onClick={() => handleSort("reviewCount")} className="px-4 py-2 text-xl font-semibold font-heading normal-case transition-all duration-500 bg-logo-yellow md:w-3/12 w-full text-white hover:bg-gray-bg">
        sort by reviews
      </button>
    </div>
    {/* buttons */}
    
    <section> 
    <section className="w-full mx-auto">
      <div className="overflow-x-auto">
  
    {
      data?.result?.length ? 
      <>
      <table className="table text-left text-gray-400">
    <thead className="font-heading md:text-lg text-sm border-[2px] rounded-full border-logo-yellow/45 text-logo-yellow">
      <tr>
        <th></th>
        <th>Meals</th>
        <th>Status</th>
        <th>Distributor</th>
        <th className="text-center">Actions</th>
      </tr>
    </thead>
      <tbody>
      {/* row 1 */}
      {
        data?.result?.map((item, index)=><TableRow key={item._id} idx={index} item={item}/>)
      }
    </tbody> 
  </table>
      {/* Pagination */}
      <div className="flex justify-center mt-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded-md font-semibold italic ${
              page === index + 1
                ? "bg-logo-yellow text-white"
                : "bg-gray-200 text-gray-700/65"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
  </>
  : isPending? <section className="flex justify-center items-center w-full h-[50vh]">
    <div className="flex flex-row gap-2 ">
    <div className="w-4 h-4 rounded-full bg-logo-yellow animate-bounce [animation-delay:.7s]" />
    <div className="w-4 h-4 rounded-full bg-logo-yellow animate-bounce [animation-delay:.3s]" />
    <div className="w-4 h-4 rounded-full bg-logo-yellow animate-bounce [animation-delay:.7s]" />
  </div>
  </section>:<h1 className="text-left text-2xl my-10 font-bold text-orange-600">No Data Found</h1>}
    
</div>
      </section>
    </section>
    </>
  )
}

export default AllMeals



function TableRow({item,idx}){
  const [showModal, setShowModal] = useState(false);
  console.log(item);
  const {_id,image,title,likes,reviewCount,adminName,rating,date,category,state} = item || {}
  // const data = {reviewID:reviewID, mealID:_id, myRating:myRating}
  return (
    <>
      <tr>
      <td className="w-[20px] text-lg font-heading italic">
        {idx + 1}
      </td>

        <td className="flex flex-row justify-start items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div className="text-left flex flex-col justify-center">
            <h1 className="text-lg font-semibold">{title}</h1>
            <h1>{likes} Likes</h1>
            <h1 className="whitespace-nowrap">{reviewCount} Reviews</h1>
            </div>
        </td>
        <td>
          <h1 className="capitalize font-semibold text-sm"><span className="font-semibold">Category</span> {category}</h1>
          <h1 className="capitalize font-semibold text-sm"><span className="font-semibold">State</span> {state}</h1>
        </td>
        <td className="text-left">
          <p>{adminName}</p>
        </td>
        <td className="">
         <div className="flex justify-center items-center gap-3">
 
        
        
        <Link to={`/details/${_id}`} className="p-2 aspect-square rounded-full bg-gray-300/25 drop-shadow-2xl shadow shadow-black/65 flex justify-center items-center">
              <FontAwesomeIcon className="text-2xl text-logo-yellow hover:text-red-500 transition-all duration-200" icon={faEye}/>
          </Link>
          <button onClick={()=>console.log("Hello")} className="p-2 aspect-square rounded-full bg-gray-300/25 drop-shadow-2xl shadow shadow-black/65">
        <FontAwesomeIcon className="text-2xl text-logo-yellow hover:text-red-500 transition-all duration-200" icon={faPenFancy}/>
          </button>
          <button onClick={()=>console.log("Hello")} className="p-2 aspect-square rounded-full bg-gray-300/25 drop-shadow-2xl shadow shadow-black/65">
        <FontAwesomeIcon className="text-2xl px-1 text-logo-yellow hover:text-red-500 transition-all duration-200" icon={faTrashCan}/>
          </button>
         </div>
        </td>
      </tr>
    </>
  )
}


// confirmToast(()=>deleteReview(data),messages)
// const messages = {
//   title1:"Sure you want to Delete",
//   text1:'Review will be Erased',
//   btnText:'Delete',
//   icon:'warning',
// }

// Toast.fire({
//   icon:"info",
//   title:"Review Deleted"
// })