import axios from "axios";
import useAxiosSecure from "../AxiosAPI/useAxiosSecure"

function useReviews(){
    const axiosSecure = useAxiosSecure();


    async function getReviews(mealID,email){
        const query = mealID ? `mealID=${mealID}`: email ?`email=${email}`:{}
        const response = await axios.get(`/reviews?${query}`);
        const result = await response.data;
        return result;
    }

    async function postReview(data){
        const response = await axiosSecure.post('/reviews', data);
        const result = await response.data;
        return result
    }
  return {
    postReview,
    getReviews,
  }
}

export default useReviews