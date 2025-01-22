import useAxiosSecure from "../AxiosAPI/useAxiosSecure"

function useMealCURD(){
    const axiosSecure = useAxiosSecure();


    async function postMeal(data){
        const response = await axiosSecure.post("/meals", data);
        const result = await response.data;
        return result;
    }

    async function incLikeCount(data){
      try{
        const response = await axiosSecure.patch(`/meals/${data.id}`, data);
        const result = await response.data;
        console.log(result);
        return result;
      }catch(error){
        console.error(error)
      }
    }
  return {
    postMeal,
    incLikeCount
  }
}

export default useMealCURD