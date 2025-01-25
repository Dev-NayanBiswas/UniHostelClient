import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosAPI/useAxiosSecure";
import useAuth from "../useAuth"

function useAdmin(){
    const {userData, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const adminQuery = useQuery({
        queryKey:['isAdmin', userData?.email],
        queryFn:async()=>{
            const response = await axiosSecure.get(`/admin/${userData?.email}`);
            const result = await response.data;
            // console.log(result);
            
            return result.isAdmin;
        },
        enabled: !!userData?.email && !loading,
    }) 
  return adminQuery;
}

export default useAdmin