import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import useAuth from "../../Hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useReviews from "../../Hooks/Reviews/useReviews";
import { useNavigate } from "react-router-dom";
import Toast from "../../Utilities/sweetToast";

function ReviewInput2({mealID}){
  const redirect = useNavigate();
  const queryClient = useQueryClient();
    const {userData} = useAuth();
    const {postReview} = useReviews()
    const {register,handleSubmit,watch,setValue, formState:{errors}, clearErrors, setError, reset} = useForm()

    const currentRating = watch("rating" || 0);
    const identifier = {
        mealID:mealID,
        name:userData?.displayName,
        email:userData?.email,
        image:userData?.photoURL,
        postedDate:Date.now(),
    }

    const postReviewMutation = useMutation({
      mutationKey:['details'],
      mutationFn:(data)=>postReview(data),
      onSuccess:()=>{
        queryClient.invalidateQueries(["details"]);
        alert("Review Added Successfully")
      },
      onError:(error)=>{
        console.error(error.message)
      }
    })


    function formHandler(data){
      if(!userData?.email){
        Toast.fire({
          icon:"warning",
          title:"Need to Login First"
        })
        return redirect("/joinUs")
      } 
        if (!data?.rating || data?.rating === 0){
            setError("rating", {
                type: "manual",
                message: "Rate this Movie",
            })
            return;
        }else{
            const newData = {...data,...identifier};
            postReviewMutation.mutate(newData);
            reset({
              comment:"",
              rating:0
            })
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