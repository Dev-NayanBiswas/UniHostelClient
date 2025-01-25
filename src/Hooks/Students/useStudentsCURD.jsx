
import axios from "axios";
import useAxiosSecure from "../AxiosAPI/useAxiosSecure";
function useStudentsCURD(){
  const axiosSecure = useAxiosSecure();

    //! POST 
    async function postStudent(data){
        try{
            const response = await axios.post('/students',data);
            const result = await response.data
            alert(result.message);
        }catch(error){
            console.error(error)
        }
        
    };

    //! Update Badge by Patching 
    async function patchStudentBadge(data){
      try{
        const response = await axiosSecure.patch(`/students/badge/${data.email}`, data);
        const result = await response.data;
        return result;
      }catch(error){
        console.error(error)
      }
    }
  return {
    postStudent,
    patchStudentBadge,
  }
}

export default useStudentsCURD