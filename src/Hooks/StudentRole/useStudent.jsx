import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosAPI/useAxiosSecure";
import useAuth from "../useAuth";

function useStudent(){
    const {userData, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const studentQuery = useQuery({
        queryKey:['isStudent', userData?.email],
        queryFn:async()=>{
            const response = await axiosSecure.get(`/isStudent/${userData?.email}`);
            const result = await response.data;
            console.log(result);
            return result;
        },
        enabled: !!userData?.email && !loading,
    }) 
  return studentQuery;
}

export default useStudent