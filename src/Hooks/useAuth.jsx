import { useContext } from "react"
import { AuthContext } from "../Providers/Contexts/AuthContext"

function useAuth(){
    const authValue = useContext(AuthContext);
  return authValue;
}

export default useAuth