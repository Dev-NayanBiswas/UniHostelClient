import { Navigate} from "react-router-dom"
import useAuth from "../../Hooks/useAuth"
import useAdmin from "../../Hooks/Admin/useAdmin";
import FoodLoading from "../../Components/Loadings/FoodLoading";

function AdminRoute({children}){
    const {userData, loading} = useAuth();
    const {data,isLoading, isPending} = useAdmin();

    console.log(data);

    if(loading || isLoading || isPending){
        return <FoodLoading/>
    }

    if(userData?.email && data){
        return children;
    }

  return <Navigate to={"/"}/>
}

export default AdminRoute