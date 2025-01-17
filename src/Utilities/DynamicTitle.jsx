import { Helmet } from "react-helmet-async"
import { useLocation } from "react-router-dom"

function DynamicTitle(manual){
  const location = useLocation()
  const path = location.pathname.split("/").pop();
  return (
    <Helmet title={!path? "home" : manual? manual : path}/>
  )
}

export default DynamicTitle