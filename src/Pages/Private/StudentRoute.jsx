import { Navigate, useLocation } from "react-router-dom"
import useStudent from "../../Hooks/StudentRole/useStudent";
import FoodLoading from "../../Components/Loadings/FoodLoading";
import useAuth from "../../Hooks/useAuth";

function StudentRoute({children}){
    const location = useLocation()
    const {userData, loading} = useAuth();
    const {data, isLoading} = useStudent();

    console.log(data);
    console.log(userData);

    if(loading || isLoading){
        return <FoodLoading/>
    }

    if(userData?.email && data){
        return children;
    }

  return <Navigate to="/joinUs" state={location.pathname? location.pathname : "/"}/>
}

export default StudentRoute