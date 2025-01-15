import { Helmet } from "react-helmet-async"
import { useLocation } from "react-router-dom"

function DynamicTitle(){
  const location = useLocation()
  const path = location.pathname.split("/").pop();
  return (
    <Helmet title={!path? "home" : path}/>
  )
}

export default DynamicTitle