
import axios from "axios";
import useAxiosSecure from "../AxiosAPI/useAxiosSecure";
import Toast from "../../Utilities/sweetToast";
function useStudentsCURD(){
  const axiosSecure = useAxiosSecure();

    //! POST 
    async function postStudent(data){
        try{
            const response = await axios.post('/students',data);
            const result = await response.data
            Toast.fire({title:result.message, icon:"success"});
        }catch(error){
            Toast.fire({title:`${error.message}`, icon:"error"});
        }
        
    };

    //! Update Badge by Patching 
    async function patchStudentBadge(data){
      try{
        const response = await axiosSecure.patch(`/students/badge/${data.email}`, data);
        const result = await response.data;
        return result;
      }catch(error){
        Toast.fire({title:`${error.message}`, icon:"error"});
      }
    }
  return {
    postStudent,
    patchStudentBadge,
  }
}

export default useStudentsCURD