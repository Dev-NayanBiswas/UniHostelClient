import { FaGraduationCap, FaHeadSideCoughSlash, FaShieldAlt, FaUserGraduate, FaUsersCog} from "react-icons/fa"
import HeadingTitle from "../../../Components/HeadingTitle/HeadingTitle"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useAxiosSecure from "../../../Hooks/AxiosAPI/useAxiosSecure"
import FoodLoading from "../../../Components/Loadings/FoodLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross, faCrosshairs, faShieldBlank, faSlash, faUserGear, faUserGraduate, faUserShield, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { faNodeJs } from "@fortawesome/free-brands-svg-icons";
import Toast from "../../../Utilities/sweetToast";




function Users(){
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const {data, isLoading, isError, error} = useQuery({
    queryKey:["users"],
    queryFn:fetchUsers
  })


  const roleMutation = useMutation({
    mutationKey:["role"],
    mutationFn:(id)=>handleUserRole(id),
    onSuccess:()=>{
      queryClient.invalidateQueries(['users']);
    },
    onError:(error)=>{
      console.log(error)
    }
  })

  async function fetchUsers(){
    const response = await axiosSecure.get("/students");
    const result = await response.data;
    return result;
  }

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
    <tfoot>
      <tr className="">
        <td className="col-span-4" colSpan={6}>
          <h1 className="text-center">Table Footer</h1>
        </td>
      </tr>
    </tfoot>
  </table>
</div>
      </section>
    </>
  )
}


function TableRow({item, mutationFn, idx}){
  const {_id,role,name,image,email,badge} = item || {}
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
        <td className="">
        <button className="md:p-2 p-1 aspect-square rounded-full bg-gray-300/25 drop-shadow-2xl shadow shadow-black/65">
              <FontAwesomeIcon icon={faShieldBlank} className="lg:text-3xl px-[3px] md:text-lg text-sm text-gray-600"/>
          </button>
        </td>
        <td className="">
          {
            role === "admin" ? <button onClick={()=>mutationFn.mutate(_id)} className="p-2 aspect-square rounded-full bg-gray-300/25 drop-shadow-2xl shadow shadow-black/65">
            <FaUsersCog className="lg:text-3xl md:text-lg text-sm text-blue-500"/>
        </button> : <button onClick={()=>mutationFn.mutate(_id)} className="p-2 aspect-square rounded-full bg-gray-300/25 drop-shadow-2xl shadow shadow-black/65">
              <FaGraduationCap className="lg:text-3xl md:text-lg text-sm text-gray-400"/>
          </button>
          }
          
        </td>
      </tr>
  )
}

export default Users