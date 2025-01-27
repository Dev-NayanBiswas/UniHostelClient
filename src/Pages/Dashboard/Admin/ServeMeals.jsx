import { FaCheck, FaGraduationCap, FaUsersCog} from "react-icons/fa"
import HeadingTitle from "../../../Components/HeadingTitle/HeadingTitle"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useAxiosSecure from "../../../Hooks/AxiosAPI/useAxiosSecure"
import FoodLoading from "../../../Components/Loadings/FoodLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Toast from "../../../Utilities/sweetToast";
import { faShieldBlank, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import debounce from "lodash.debounce";




function ServedMeals(){
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();





  const {data, isLoading, isError, error} = useQuery({
    queryKey:["requestedMeals", search,categoryFilter, page],
    queryFn:()=>fetchRequestMeals(search,categoryFilter, page)
  })




  const stateMutation = useMutation({
    mutationKey:["role"],
    mutationFn:(id)=>handleMealState(id),
    onSuccess:()=>{
      queryClient.invalidateQueries(['requestedMeals']);
    },
    onError:(error)=>{
      console.log(error)
    }
  })

  async function fetchRequestMeals(searchTerm, category, page){
    const response = await axiosSecure.get(`/studentMeals/requestedMeals/admin?search=${searchTerm}&category=${category}&page=${page}`);
    const result = await response.data;
    setTotalPages(result?.totalPages);
    return result;
  }

  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
    setPage(1)
  }, 700);

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setPage(1)
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

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

  async function handleMealState(id){
    console.log(id);
    const response = await axiosSecure.patch("/studentMeals/requestedMeals/admin",null,{params:{id}});
    const result = await response.data;
    if(result?.result.modifiedCount === 1){
      Toast.fire({
        icon:"success",
        title:"Meal Served"
      })
    }
  }

console.log(data)

  return (
    <>
      <HeadingTitle headingData={{heading:"Serve Meals"}}/>
      <section className="w-full mx-auto">
        {/* Sort Box */}
        <div className="mb-4 flex md:flex-row flex-col gap-4 justify-end">
          <select
            className="defaultInput !border-logo-yellow/45 !rounded-none text-logo-yellow font-para"
            onChange={handleCategoryChange}
            value={categoryFilter}
          >
            <option value="">All Status</option>
            <option value="requested">Requested</option>
            <option value="served">Served</option>
          </select>
          <div className="mb-4 w-full rounded-none lg:block hidden"/>
          <input
            type="text"
            placeholder="Search by name or email"
            className="w-full defaultInput !rounded-none !border-logo-yellow/45 max-w-sm"
            onChange={handleSearch}
          />
        </div>
        {/* Search Box */}
      
          


      <div className="overflow-x-auto">
  <table className="table text-center text-gray-400">
    <thead className="font-heading md:text-lg text-sm border-[2px] rounded-full border-logo-yellow/45 text-logo-yellow">
      <tr>
        <th></th>
        <th className="text-left">Image</th>
        <th className="text-left">User</th>
        <th className="text-">Status</th>
        <th>Action</th>

      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        data?.result.map((item, index)=><TableRow key={item._id} mutationFn={stateMutation} idx={index} item={item}/>)
      }
    </tbody>
    {/* foot */}
  </table>
  <section className="">

      <div className="flex justify-center mt-5">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded-md font-semibold italic border-[1px] border-logo-yellow ${
                page === index + 1
                  ? "bg-logo-yellow text-white"
                  : "bg-transparent text-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
    </section>
</div>
      </section>
    </>
  )
}


function TableRow({item, mutationFn, idx}){
  const {_id,role,name,image,title,email,status} = item || {}
  return (
    <tr>
      <td className="w-[20px] text-lg font-heading italic">
        {idx + 1}
      </td>

        <td className="text-left">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
        </td>
        <td className="text-left">
          <h1 className="capitalize font-semibold text-sm">{name}</h1>
          <h1>{email}</h1>
        </td>
        <td className="text-center">
          {
            status === "requested" ?
            <button className="px-5 py-1 w-[107px] rounded-e-full rounded-s-full text-sm text-gray-100 bg-red-500 font-semibold whitespace-nowrap bg-gray-300/25 drop-shadow-2xl shadow shadow-black/65 text-right">Requested</button> :
          <button className="px-5 py-1 w-[107px] text-center rounded-e-full rounded-s-full text-sm text-white  font-semibold whitespace-nowrap bg-green-700 tracking-wide drop-shadow-2xl shadow shadow-black/65">Serving</button>
          }
        </td>
        
        <td className="">
          {
            status === "served" ? <button className="p-2 aspect-square">
            <FaCheck className="lg:text-2xl md:text-lg text-sm text-green-600"/>
        </button> :  
        <button onClick={()=>mutationFn.mutate(_id)} className="px-5 py-1 rounded-e-full rounded-s-full text-sm hover:bg-green-700 hover:text-white text-gray-400 bg-logo-yellow font-semibold whitespace-nowrap bg-gray-300/25 drop-shadow-2xl shadow shadow-black/65 text-right transition-all duration-500">
          Serve
          </button>
          }
        </td>
      </tr>
  )
}

export default ServedMeals