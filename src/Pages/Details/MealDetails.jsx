import { ParallaxBanner } from "react-scroll-parallax";
import HeadingTitle from "../../Components/HeadingTitle/HeadingTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faStar,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { replace, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import FoodLoading from "../../Components/Loadings/FoodLoading";
import dateConverter from "../../Utilities/dateConverter";
import ReviewInput2 from "../../Components/Forms/ReviewInput2";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import Toast from "../../Utilities/sweetToast";
import useStudent from "../../Hooks/StudentRole/useStudent";
import useMealCURD from "../../Hooks/CURDS/useMealCURD";
import useReviews from "../../Hooks/Reviews/useReviews";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/AxiosAPI/useAxiosSecure";



function MealDetails(){
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const {incLikeCount, addRequestedMeals,getAllRequestedMeals} = useMealCURD();
  const {getReviews} = useReviews();
  const navigate = useNavigate();
  const {userData,loading} = useAuth();
  const userEmail = userData?.email;
  const { id } = useParams();
  const {data:student, isError:studentError, isLoading:studentLoading} = useStudent();
  
  const {data:mealArrayValue} = useQuery({
    queryKey:["mealArray", userEmail],
    queryFn:async()=>{
      const response = await axiosSecure.get(`/studentMeals/${userEmail}`);
      const result = await response.data;
      console.log(result);
      return result;
    },
    enabled:!!userEmail && !loading,
  })

  const {data: bannerData,isLoading,isError,error,} = useQuery({
    queryKey: ["details", id],
    queryFn: async () => {
      const response = await axios.get(`/meals/${id}`);
      const result = await response?.data?.result;
      return result;
    },
  });
  const {data:allMealReviews} = useQuery({
    queryKey:['mealReviews', id],
    queryFn:async()=> await getReviews(id,null),
    enabled:!!id
  })


  if (isLoading || studentLoading) {
    return <FoodLoading />;
  }

  if (isError || studentError) {
    return (
      <p className='text-2xl text-red-600 text-center my-28 font-semibold font-heading'>
        {error.message}
      </p>
    );
  }

  const {
    _id,
    category,
    ingredients,
    description,
    price,
    image,
    title,
    adminName,
    reviewCount,
    adminPhoto,
    likes,
    rating,
    state,
    date,
  } = bannerData || {};

  const {badge,role,name,image:studentPhoto,email} = student?.studentData || {};

  console.log(mealArrayValue)

  const disabled = mealArrayValue?.mealIDs?.includes(_id);


  async function handleActions(action){
    const isUser = student?.isStudent
    const value = handleSanitization(state, navigate, badge, isUser)

    if(!value){
      return
    }

    if(action === "request"){
      if(state === "upcoming"){
        Toast.fire({
          icon:"info",
          title:"wait till Published"
        });
        return;
      }
      const setData = {
        image:image,
        title:title,
        name:name,
        email:email,
        mealID:_id,
        status:"requested",
      }
      const result = await addRequestedMeals(setData);
      console.log(result);
      if(result?.result?.insertedId){
        Toast.fire({
          icon:"success",
          title:"Request under Process"
        });
        queryClient.invalidateQueries(["details"]);
      }
    }

    if(action === "like"){
      const newData = {
        like:true,
        id:_id
      }
      const result = await incLikeCount(newData);
      
      if(result?.result?.modifiedCount){
        Toast.fire({
          icon:"info",
          title:"Thank You"
        });
        queryClient.invalidateQueries(["details"]);
      }
    }
    
    // console.log("handleActions", _id, action);

  }

// console.log(allMealReviews);


  return (
    <>
      <HeadingTitle headingData={{ heading: title }} />
      <section className='flex lg:flex-row flex-col lg:gap-7 gap-4'>
        <section className='lg:w-7/12 w-full h-[60vh] flex'>
          <ParallaxBanner
            className='w-full h-full relative rounded-tl-3xl group'
            layers={[{ image: image, speed: -20 }]}>
            <div className='inset-0 absolute z-[2] w-full h-full top-0 bottom-0 right-0 left-0'/>
            <button
            style={{
              background:disabled? "#a84e32" : "#3f3e3cbf"
            }}
            onClick={()=>handleActions("request")} className={`text-lg font-semibold w-[100px] group-hover:w-[130px] transition-width duration-500 pr-3 pl-2 py-[4px] text-white rounded-s-full absolute top-1/2 right-0 cursor-pointer z-40 ${disabled? "pointer-events-none" : "cursor-pointer"}`}>{disabled?"Pending" : "Request"}</button>

            <section className='bg-gray-bg/45 absolute left-0 bottom-0 h-fit w-full p-2 text-white font-para'>
              <table className='px-2'>
                <tbody>
                <tr className='px-2'>
                  <td className='px-2'>Category</td>
                  <td className=''>:</td>
                  <td className='px-2 capitalize'>{category}</td>
                </tr>
                <tr>
                  <td className='px-2'>Ingredients</td>
                  <td className=''>:</td>
                  <td className='px-2'>
                    {ingredients.map((item, index) => (
                      <span className='md:mr-2 pr-1' key={index}>
                        {item}
                        {","}
                      </span>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td className='px-2'>Price</td>
                  <td className=''>:</td>
                  <td className='px-2'>$ {price}.00</td>
                </tr>
                </tbody>
              </table>
            </section>
            <div className='flex relative justify-start items-center gap-2 my-2 ml-2'>
                <div className="absolute top-0 left-0 w-full h-[54px] bg-black/45 rounded-s-full"/>

                <img
                  className='avatar rounded-full max-h-12 ring-2 ring-logo-yellow object-cover aspect-square'
                  src={adminPhoto}
                  alt=''
                />

              <table className='px-2 font-normal text-white z-30'>
                <tbody>
                <tr className='text-sm'>
                  <td className='px-2 font-semibold font-heading'>Admin</td>
                  <td className='px-2'>-</td>
                  <td className='px-2'>{adminName}</td>
                </tr>
                <tr className="text-sm">
                  <td className='px-2 font-semibold font-heading'>From</td>
                  <td className='px-2'>-</td>
                  <td className='px-2'>{dateConverter(date)}</td>
                </tr>
                </tbody>
              </table>
              <span className="text-sm text-logo-yellow font-semibold flex justify-between items-center absolute right-4 top-[13px] bg-gray-bg/65 rounded-e-full rounded-s-full py-1 px-3">{state}</span>
            </div>
          </ParallaxBanner>
        </section>
        <section className='text-gray-500 lg:w-5/12 w-full space-y-10 flex flex-col'>
          <section className='flex-1 flex flex-col justify-between'>
            <p className='font-para'>
              <span className='font-heading font-semibold text-lg'>
                Description :
              </span>{" "}
              {description}
            </p>

            <section className='my-4'>
              <table className='px-2 font-normal text-gray-500'>
                <tbody>
                <tr className='px-2'>
                  <td className='px-2 font-semibold font-heading'>
                    <button onClick={()=>handleActions("like")}>
                      <FontAwesomeIcon
                        className='text-blue-400 md:text-2xl text-lg'
                        icon={faThumbsUp}
                      />
                    </button>
                    <span className='mx-3'>{likes} Likes</span>
                  </td>
                  <td className='px-2 font-semibold font-heading'>
                    <FontAwesomeIcon
                      className='text-blue-400 md:text-2xl text-lg'
                      icon={faCommentAlt}
                    />
                    <span className='mx-3'>{reviewCount} Comments</span>
                  </td>
                  <td className='px-2 font-semibold font-heading'>
                    <FontAwesomeIcon
                      className='text-logo-yellow md:text-2xl text-lg'
                      icon={faStar}
                    />
                    <span className='mx-3'>
                      {rating > 0 ? Math.ceil(rating / reviewCount) : rating}/5
                    </span>
                  </td>
                </tr>
                </tbody>
              </table>
            </section>
          </section>
          <div>
            <ReviewInput2 mealID={_id}/>
          </div>
        </section>
      </section>
      <div className="my-10"/>
      <HeadingTitle headingData={{ heading: "Students Reviews" }} />
      <section className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
        {
          allMealReviews?.result?.map((item)=><ReviewCard key={item._id} cardData={item}/>)
        }
      </section>
    </>
  );
}


function handleSanitization(state, navigate, badge, isUser){

  if(badge === "bronze"){
    Toast.fire({
      icon:"warning",
      title:"Buy a Subscription First"
    });
    return false;
  }


  if(state === "upcoming" && badge === "bronze"){
    Toast.fire({
      icon:"warning",
      title:"Update your Badge"
    });
    return false;
  }
  
  
  if(!isUser){
    Toast.fire({
      icon:"warning",
      title:"Need to Login"
    });
    navigate("/joinUs")
    return false;
  }

  return true;
}

export default MealDetails;
