import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import dateToday from "../../Utilities/dateConverter";
import useAuth from "../../Hooks/useAuth";
import HeadingTitle from "../HeadingTitle/HeadingTitle";
import useReviews from "../../Hooks/Reviews/useReviews";
import Toast from "../../Utilities/sweetToast";
import { useQueryClient } from "@tanstack/react-query";



const headingData = {
    heading:"Update Review",
    desc:"Your feedback matters! Help us improve by sharing your experience with our hostel meals. Whether it’s your favorite dish or a suggestion for improvement, your review can make a difference."
  }


function ReviewInput({prevReview,closeModal}){
  const queryClient = useQueryClient();
  const {patchReviews} = useReviews();
    const {userData} = useAuth();
    const {register,handleSubmit,watch,setValue, formState:{errors}, clearErrors, setError, reset} = useForm({defaultValues:{
        comment:prevReview?.comment||"",
        rating:prevReview?.myRating||0
    }})

    const currentRating = watch("rating" || 0);
    const identifier = {
        name:userData?.displayName,
        email:userData?.email,
        image:userData?.photoURL,
        postedDate:dateToday,
    }

    const email = userData?.email;
    const reviewID = prevReview?.reviewID;
    const mealID = prevReview?._id;

    async function formHandler(data){
        if (!data?.rating || data?.rating === 0){
            setError("rating", {
                type: "manual",
                message: "Rate this Movie",
            })
            return;
        }else{
          const newData = {
            ...data,
            email, reviewID,mealID
          }
          const result = await patchReviews(newData);

          if(result?.result?.modifiedCount){
            queryClient.invalidateQueries(["myReviews"]);
            Toast.fire({
              icon:"success",
              title:"Review Updated"
            });
            closeModal();
            reset({
              comment:"",
              rating:0
            });
          };
        }
    }
  return (
    <>
    <HeadingTitle headingData={headingData}/>
    <section className='mb-8 bg-transparent h-fit'>
        
        <form onSubmit={handleSubmit(formHandler)} className='rounded-[12px] py-4'>
          <section className="w-full">
          <textarea
            className='defaultInput min-h-[18vh] w-full'
            {...register("comment",{required:"Please leave a comment"})}
            placeholder='Add your comments here'>
        </textarea>
        {errors.comment && <p className='text-xs text-red-500'>{errors.comment.message}</p>}
          </section>

          <section className='flex md:flex-row-reverse flex-col justify-between mt-2 items-center gap-5'>
            <div className='text-sm my-5 w-5/12'>
                <ReactStars
                count={5}
                onChange={(value) => {
                  setValue("rating", value);
                  if (value > 0) {
                    clearErrors("rating");
                  }
                }}
                value={currentRating}
                isHalf={false}
                fullIcon={<i className='fa fa-star'></i>}
                size={30}
                style={{ color: "gold", cursor: "pointer" }}
                />
                {currentRating > 0 && (
                <span className='ml-2'>{currentRating.toFixed(1)}/5</span>
              )}
              {errors.rating && (
              <p className='text-xs text-red-500 my-2'>Leave a Rating</p>
            )}
            </div>
            <button
              type='submit'
              className='h-12 w-full bg-logo-yellow text-lg text-white rounded-lg font-para transition-all cursor-pointer'>
              Update Review
            </button>
          </section>
        </form>
      </section>
    </>
    
  )
}

export default ReviewInput