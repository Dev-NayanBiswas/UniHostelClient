import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import dateToday from "../../Utilities/dateConverter";
import useAuth from "../../Hooks/useAuth";

function ReviewInput2({prevReview}){
    const {userData} = useAuth();
    const {register,handleSubmit,watch,setValue, formState:{errors}, clearErrors, setError, reset} = useForm({defaultValues:{
        comment:prevReview?.comment||"",
        rating:prevReview?.rating||0
    }})

    const currentRating = watch("rating" || 0);
    const identifier = {
        name:userData?.displayName,
        email:userData?.email,
        image:userData?.photoURL,
        postedDate:dateToday,
    }


    function formHandler(data){
        if (!data?.rating || data?.rating === 0){
            setError("rating", {
                type: "manual",
                message: "Rate this Movie",
            })
            return;
        }else{
            console.log(data)
        }
    }
  return (
    <>
    <section className='bg-transparent h-fit'>
        
        <form onSubmit={handleSubmit(formHandler)} className='rounded-[12px]'>
          <section className="w-full">
          <textarea
            className='defaultInput min-h-[18vh] w-full'
            {...register("comment",{required:"Please leave a comment"})}
            placeholder='Add your comments here'>
        </textarea>
        {errors.comment && <p className='text-xs text-red-500'>{errors.comment.message}</p>}
          </section>

          <section className='flex md:flex-row flex-col justify-between mt-2 items-center gap-5'>
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
              <p className='text-xs text-red-500 my-2'>Rate this Meal</p>
            )}
            </div>
            <button
              type='submit'
              className='h-12 w-full bg-logo-yellow text-lg text-white rounded-lg font-para transition-all cursor-pointer'>
              Add Review
            </button>
          </section>
        </form>
      </section>
    </>
    
  )
}

export default ReviewInput2