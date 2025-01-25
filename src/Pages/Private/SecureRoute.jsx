import { Navigate, useLocation } from "react-router-dom"
import FoodLoading from "../../Components/Loadings/FoodLoading";
import useAuth from "../../Hooks/useAuth";

function SecureRoute({children}){
    const location = useLocation()
    const {userData, loading} = useAuth();

    // console.log(userData);

    if(loading){
        return <FoodLoading/>
    }

    if(userData?.email){
        return children;
    }

  return <Navigate to="/joinUs" state={location.pathname? location.pathname : "/"}/>
}

export default SecureRoute