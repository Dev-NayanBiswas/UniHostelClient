import { ParallaxBanner } from "react-scroll-parallax";
import HeadingTitle from "../../Components/HeadingTitle/HeadingTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faStar,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FoodLoading from "../../Components/Loadings/FoodLoading";
import dateConverter from "../../Utilities/dateConverter";
import ReviewInput2 from "../../Components/Forms/ReviewInput2";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import confirmToast from "../../Utilities/confirmToast";
import Toast from "../../Utilities/sweetToast";

function MealDetails() {
  const { id } = useParams();
  const {
    data: bannerData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["details", id],
    queryFn: async () => {
      const response = await axios.get(`/meals/${id}`);
      const result = await response?.data?.result;
      return result;
    },
  });


  if (isLoading) {
    return <FoodLoading />;
  }

  if (isError) {
    return (
      <p className='text-2xl text-red-600 text-center my-28 font-semibold font-heading'>
        {error.message}
      </p>
    );
  }

  const {
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
    email,
    date,
  } = bannerData || {};

  async function handleRequestedMeal(){
    if(state === "upcoming"){
      alert("Coming Soon hold your Horse");
      return;
    }
    console.log("Handle Requested Meal")
  }

  async function handleLike(){
    console.log("Handle Like Clicked");
  }




  return (
    <>
      <HeadingTitle headingData={{ heading: title }} />
      <section className='flex lg:flex-row flex-col lg:gap-7 gap-4'>
        <section className='lg:w-7/12 w-full h-[60vh] flex'>
          <ParallaxBanner
            className='w-full h-full relative rounded-tl-3xl group'
            layers={[{ image: image, speed: -20 }]}>
            <div className='inset-0 absolute z-[2] w-full h-full top-0 bottom-0 right-0 left-0'/>
            <button onClick={handleRequestedMeal} className="text-lg font-semibold w-[100px] group-hover:w-[130px] transition-width duration-500 pr-3 pl-2 py-[4px]  bg-gray-bg/75 text-white rounded-s-full absolute top-1/2 right-0 cursor-pointer z-40">Request</button>

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
                    <button onClick={()=>confirmToast(handleLike)}>
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
            <ReviewInput2/>
          </div>
        </section>
      </section>
      <div className="my-10"/>
      <HeadingTitle headingData={{ heading: "Students Reviews" }} />
      <section className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
        <ReviewCard/>
        <ReviewCard/>
        <ReviewCard/>
        <ReviewCard/>
        <ReviewCard/>
        <ReviewCard/>
        <ReviewCard/>
      </section>
    </>
  );
}

export default MealDetails;
