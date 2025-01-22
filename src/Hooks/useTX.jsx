import Toast from "../Utilities/sweetToast";
import useAxiosSecure from "./AxiosAPI/useAxiosSecure"
import useStudentsCURD from "./Students/useStudentsCURD";

function useTX(){
    const {patchStudentBadge} = useStudentsCURD();
    const axiosSecure = useAxiosSecure();
    const postTransactionData = async(data)=>{
        const newData = {
            email:data.email,
            badge:data.badge,
            color:data.color
        }
        try{
            const response = await axiosSecure.post('/transactions', data);
        const result = await response.data;
        if(result.result.insertedId){
            patchStudentBadge(newData);
        };
        }catch(error){
            alert(error.message);
        }
    }
  return postTransactionData;
}

export default useTX;