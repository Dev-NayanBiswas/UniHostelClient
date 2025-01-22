import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FoodLoading from '../../../Components/Loadings/FoodLoading';
import useAxiosSecure from '../../../Hooks/AxiosAPI/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth'
import DynamicTitle from '../../../Utilities/DynamicTitle'
import { useQuery } from '@tanstack/react-query'
import { faShieldBlank, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import HeadingTitle from '../../../Components/HeadingTitle/HeadingTitle';




const headingData = {
  heading:"My Profile",
  desc:"Easily update your student profile with our user-friendly bio editor. Showcase your personality, achievements, and goals in just a few clicks. Personalize your profile to reflect who you are and keep it updated as you grow and succeed"
}
function MyProfile(){
  const axiosSecure = useAxiosSecure()
  const {userData, loading} = useAuth();
  const email = userData?.email;
  const {data, isFetching, isLoading, isError, error, isPending} = useQuery({
    queryKey:["myProfile", email],
    queryFn:async()=>{
      const response = await axiosSecure.get(`/students/${email}`);
      const result = await response.data;
      return result;
    },
    enabled:!!email && !loading,
  })

  if(isLoading || isFetching){
    return <FoodLoading/>
  }

  if(isError){
    return <p className='text-2xl text-red-600 text-center my-28 font-semibold font-heading'>
    {error.message}
  </p>
  }

  const{_id,role,name,image,email:userEmail,badge,color}= data.result || {}
  return (
    <>
    <DynamicTitle manual={"My Profile"}/>
    <HeadingTitle headingData={headingData}/>
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
                <tr className="px-2">
              <td className="h-[5vh] uppercase font-semibold font-heading whitespace-nowrap">Badge</td>
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
                  <td className='px-2'>{role}</td>
                </tr>
                <tr>
                  <td className='px-2'>Subscription</td>
                  <td className=''>:</td>
                  <td className='px-2 uppercase'>{badge}</td>
                </tr>
                </tbody>
              </table>
          </section>



            <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste, ea repudiandae est fugiat, molestias velit excepturi accusamus commodi, facere voluptatem hic dolor exercitationem tenetur omnis! Adipisci quo asperiores aspernatur eligendi incidunt. Suscipit error unde facilis ullam ab aut, soluta corrupti neque quis quisquam odit, labore alias accusamus quo eveniet enim!</h1>
          </section>
        </section>
        </section>
    </>
  )
}

export default MyProfile