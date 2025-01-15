// import useAxiosPublic from "../AxiosAPI/useAxiosPublic"

import axios from "axios";

function useStudentsCURD(){
    // const axiosPublic = useAxiosPublic();

    //! POST 
    async function postStudent(data){
        try{
            const response = await axios.post('/students',data);
            const result = await response.data
            alert(result.message);
        }catch(error){
            console.error(error)
        }
        
    }
  return {
    postStudent,
  }
}

export default useStudentsCURD