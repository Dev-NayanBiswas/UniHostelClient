import { Helmet } from "react-helmet-async"
import { useLocation } from "react-router-dom"

function DynamicTitle({manual}){
  const location = useLocation()
  
  const titleName = location.pathname.split("/").pop();
  const myTitle = titleName === "/" ? "home" : manual? manual : titleName
  return (
    <Helmet title={!titleName? "home" : manual? manual : titleName}/>
  )
}

export default DynamicTitle