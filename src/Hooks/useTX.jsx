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
           const updateBadge = await patchStudentBadge(newData);
        //    console.log(updateBadge)
           if(updateBadge?.result?.modifiedCount > 0){
            Toast.fire({
              icon:"success",
              title:"Congratulations Badge Updated"
            })
          }
        };
        }catch(error){
          Toast.fire({icon:"error",title:`Error ${error.message}`});
        }
    }
  return postTransactionData;
}

export default useTX;