import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosAPI/useAxiosSecure";
import useAuth from "../useAuth"

function useAdmin(){
    const {userData} = useAuth();
    const email = userData?.email;
    const axiosSecure = useAxiosSecure();
    const adminQuery = useQuery({
        queryKey:['isAdmin', email],
        queryFn:async()=>{
            const response = await axiosSecure.get(`/admin/${email}`);
            const result = await response.data;
            return result;
        },
        enabled: !!email,
    }) 
  return adminQuery;
}

export default useAdmin