import axios from "axios";
import useAxiosSecure from "../AxiosAPI/useAxiosSecure";

function useAdminCURD(){
    const axiosSecure = useAxiosSecure();
    
    //! Get All Meals
    async function getAllMeals({ email = "", sortBy = "likes", search = "", page = 1, limit = 5 } = {}){

        const params = { email, sortBy, search, page, limit };
        const response = await axiosSecure.get('/meals/studentMeals/adminDashboard',{params});
        const result = await response.data;
        // console.log(result);
        return result;
    } 
  return {
    getAllMeals
  }
}

export default useAdminCURD