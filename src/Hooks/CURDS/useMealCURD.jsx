import useAxiosSecure from "../AxiosAPI/useAxiosSecure"

function useMealCURD(){
    const axiosSecure = useAxiosSecure();
    async function postMeal(data){
        const response = await axiosSecure.post("/meals", data);
        const result = await response.data;
        return result;
    }
  return {
    postMeal,
  }
}

export default useMealCURD