import useAxiosSecure from "../AxiosAPI/useAxiosSecure"
import useAuth from "../useAuth";

function useMealCURD(){
    const axiosSecure = useAxiosSecure();
    const {userData} = useAuth();
    const email = userData?.email;

    async function getStudentMeals(meals){
      // const [_, params] = queryKey;
      // const {meals} = params;
      const response = await axiosSecure.get(`/studentMeals/${email}`,{params:{meals:meals}});
      const result = await response.data;
      // console.log(result);
      return result;
  }

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
  return {
    postMeal,
    incLikeCount,
    getStudentMeals,
  }
}

export default useMealCURD