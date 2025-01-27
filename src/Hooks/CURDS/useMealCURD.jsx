import axios from "axios";
import useAxiosSecure from "../AxiosAPI/useAxiosSecure"
import useAuth from "../useAuth";

function useMealCURD(){
    const axiosSecure = useAxiosSecure();
    const {userData} = useAuth();
    const email = userData?.email;


    //! Admin Adding Meals 
    async function postMeal(data){
        const response = await axiosSecure.post("/meals", data);
        const result = await response.data;
        return result;
    }

    
    //! Incrementing Like Count 
    async function incLikeCount(data){
      try{
        const response = await axiosSecure.patch(`/meals/${data.id}`, data);
        const result = await response.data;
        // await console.log(result);
        return result;
      }catch(error){
        console.error(error)
      }
    }




    //!* Adding Requested meals 
    async function addRequestedMeals(data){
        const response = await axiosSecure.post(`/studentMeals/${data.email}`, data);
        const result = await response?.data;
        return result;
    }


    //* Get Users REquested Meals 
    async function getAllRequestedMeals(email){
      const response = await axiosSecure.get(`/studentMeals/pendingMeals/${email}`);
      const result = await response.data;
      // console.log(result)
      return result;
    }
    
  return {
    postMeal,
    incLikeCount,
    addRequestedMeals,
    getAllRequestedMeals,
  }
}

export default useMealCURD