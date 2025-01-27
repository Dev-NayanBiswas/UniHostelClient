import { FaGraduationCap, FaUsersCog} from "react-icons/fa"
import HeadingTitle from "../../../Components/HeadingTitle/HeadingTitle"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useAxiosSecure from "../../../Hooks/AxiosAPI/useAxiosSecure"
import FoodLoading from "../../../Components/Loadings/FoodLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Toast from "../../../Utilities/sweetToast";
import { faShieldBlank, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import debounce from "lodash.debounce";




function Users(){
  const [search, setSearch] = useState("");
  const [badgeFilter, setBadgeFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();





  const {data, isLoading, isError, error} = useQuery({
    queryKey:["users", search,badgeFilter, page],
    queryFn:()=>fetchUsers(search,badgeFilter, page)
  })




  const roleMutation = useMutation({
    mutationKey:["role"],
    mutationFn:(id)=>handleUserRole(id),
    onSuccess:()=>{
      queryClient.invalidateQueries(['users']);
    },
    onError:(error)=>{
      Toast.fire({icon:"error", title:`${error.message} Error`})
    }
  })

  async function fetchUsers(searchTerm, badge, page){
    const response = await axiosSecure.get(`/students?search=${searchTerm}&badge=${badge}&page=${page}`);
    const result = await response.data;
    setTotalPages(result?.totalPages);
    return result;
  }

  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
    setPage(1)
  }, 700);

  const handleBadgeFilterChange = (e) => {
    setBadgeFilter(e.target.value);
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

  async function handleUserRole(id){
    const response = await axiosSecure.patch(`/students/${id}`,{});
    const result = await response.data;
    if(result?.result.modifiedCount === 1){
      Toast.fire({
        icon:"success",
        title:"Role Updated Successfully"
      })
    }
  }



  return (
    <>
      <HeadingTitle headingData={{heading:"All Users"}}/>
      <section className="w-full mx-auto">
        {/* Sort Box */}
        <div className="mb-4 flex md:flex-row flex-col gap-4 justify-end">
          <select
            className="defaultInput !border-logo-yellow/45 !rounded-none text-logo-yellow font-para"
            onChange={handleBadgeFilterChange}
            value={badgeFilter}
          >
            <option value="">All Badges</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
            <option value="silver">Silver</option>
            <option value="bronze">Bronze</option>
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
        <th>Avatar</th>
        <th>Name</th>
        <th>Email</th>
        <th>Badge</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        data?.result.map((item, index)=><TableRow key={item._id} mutationFn={roleMutation} idx={index} item={item}/>)
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
  const {_id,role,name,image,email,badge,color} = item || {}
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
          <h1 className="capitalize font-semibold text-sm">{name}</h1>
        </td>
        <td className="">
          <h1>{email}</h1>
        </td>
        <td className="flex justify-center items-center group gap-2">
        <button className="md:p-2 p-1 aspect-square rounded-full bg-gray-300/10 drop-shadow-2xl shadow z-20 shadow-black/65">
              <FontAwesomeIcon
                style={{
                  color:badge==='bronze'?'gray':color,
                  filter:badge==='bronze'?'':'drop-shadow(0 0 4px gray)'
                }}
               icon={badge==='bronze'? faShieldHalved : faShieldBlank} className="lg:text-3xl px-[3px] text-lg shadow-black"/>
          </button>
          <span style={{
                  color:badge==='bronze'?'gray': color,
                }} className="font-semibold font-para w-14">{badge}</span>
        </td>
        <td className="">
          {
            role === "admin" ? <button onClick={()=>mutationFn.mutate(_id)} className="p-2 aspect-square rounded-full bg-gray-300/25 drop-shadow-2xl shadow shadow-black/65">
            <FaUsersCog className="lg:text-3xl md:text-lg text-sm text-blue-500"/>
        </button> :  
        <button onClick={()=>mutationFn.mutate(_id)} className="p-2 aspect-square rounded-full bg-gray-300/25 drop-shadow-2xl shadow shadow-black/65">
              <FaGraduationCap className="lg:text-3xl md:text-lg text-sm text-gray-400"/>
          </button>
          }
        </td>
      </tr>
  )
}

export default Users