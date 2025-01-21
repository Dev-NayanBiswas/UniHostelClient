import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/Contexts/AuthContext";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_BASE_URl,
})

function useAxiosSecure(){
  const {signOutUser} = useContext(AuthContext);
  axiosSecure.interceptors.request.use((config)=>{
      const token = localStorage.getItem("ClientSecret")
      config.headers.authorization = `Bearer ${token}`
      return config;
    },(error)=>{
      return Promise.reject(error)
    });
    axiosSecure.interceptors.response.use((response)=>{
      return response;
    },
    async(error)=>{
      const status = error.response.status
      if( status === 401 || status === 403){
          signOutUser();
          return;
      };
      return Promise.reject(error)
    }
  )
  return axiosSecure;
}

export default useAxiosSecure