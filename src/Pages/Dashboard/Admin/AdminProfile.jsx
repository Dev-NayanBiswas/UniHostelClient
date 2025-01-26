import { useQuery } from "@tanstack/react-query";
import useAdminCURD from "../../../Hooks/Admin/useAdminCURD"
import useAuth from "../../../Hooks/useAuth";
import FoodLoading from "../../../Components/Loadings/FoodLoading";
import HeadingTitle from "../../../Components/HeadingTitle/HeadingTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldBlank, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

function AdminProfile(){
  const {getAllMeals} = useAdminCURD();
  const {userData, loading} = useAuth();
  const email = userData?.email;
  const {data, isLoading, isError, error} = useQuery({
    queryKey:["mealsByAdmin", email],
    queryFn:()=>getAllMeals({email}),
    enabled:!!email || !loading,
  })
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
  console.log(data);
  const{_id,role,name,image,email:userEmail,badge,color, contribution}= data?.result || {}

  return (
    <>
      <>
      <HeadingTitle headingData={{heading:"Admin Profile"}}/>
        <section>
            <section className="text-center mx-auto flex justify-center flex-col">
                    <section className="lg:w-7/12 w-11/12 mx-auto my-auto h-fit rounded-lg border-gray-500/35 border-[1px] p-4">
                      <section className="w-full h-full rounded-lg p-2">
            
            
            
                      <section className="flex md:flex-row flex-col gap-3 md:justify-start justify-center items-center">
                      <div
                        style={{
                          border:badge==='bronze'?'gray':color,
                          borderWidth:'16px',
                        }}
                       className="h-[200px] w-fit rounded-xl self-baseline flex justify-center items-center bg-gradient-to-b from-logo-yellow to-logo-yellow/10">
                        <img className="h-[192px] w-[192px] rounded-lg object-cover mx-auto" src={image} alt="" />
                      </div>
            
                      <table className='px-2 text-left text-gray-500 font-semibold self-center'>
                            <tbody>
                            <tr className="">
                          <td className="h-[5vh] uppercase font-semibold font-heading whitespace-nowrap pl-2">Badge</td>
                          <td>:</td>
                          <td className="px-2">
                          <FontAwesomeIcon
                        style={{
                          color:badge==='bronze'?'gray':color,
                          filter:badge==='bronze'?'':'drop-shadow(0 0 4px gray)'
                        }} 
                         className="text-4xl" icon={badge==='bronze'? faShieldHalved :faShieldBlank}/>
                          </td>
                          </tr>
                            <tr className='px-2'>
                              <td className='px-2'>Student Name</td>
                              <td className=''>:</td>
                              <td className='px-2 capitalize'>{name}</td>
                            </tr>
                            <tr>
                              <td className='px-2'>Email</td>
                              <td className=''>:</td>
                              <td className='px-2'>{email}</td>
                            </tr>
                            <tr>
                              <td className='px-2'>Responsibilities</td>
                              <td className=''>:</td>
                              <td className='px-2 uppercase'><span className="px-3 text-sm py-[2px] rounded-full bg-logo-yellow text-gray-bg font-bold">{role}</span></td>
                            </tr>
                            <tr>
                              <td className='px-2'>Subscription</td>
                              <td className=''>:</td>
                              <td className='px-2 uppercase'>{badge}</td>
                            </tr>
                            <tr>
                              <td className='px-2'>Contributed</td>
                              <td className=''>:</td>
                              <td className='px-2 capitalize'>{contribution} Cuisines</td>
                            </tr>
                            </tbody>
                          </table>
                      </section>
            
            
            
                        <h1>I am a Computer Science and Engineering (CSE) student with a passion for learning, innovation, and technology. I enjoy solving problems, exploring new concepts in programming, and working on exciting projects. Beyond academics, I value collaboration and building meaningful connections with my peers. Living in the hostel has been a great opportunity to meet diverse individuals, exchange ideas, and grow together. I believe in balancing studies with personal growth and enjoy engaging in activities that challenge and inspire me. Always eager to learn and contribute, I look forward to making the most of my time here.</h1>
                      </section>
                    </section>
                    </section>
        </section>
      </>
    </>
  )
}

export default AdminProfile