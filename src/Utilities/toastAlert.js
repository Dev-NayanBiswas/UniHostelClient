import { Bounce, toast } from "react-toastify"

function toastAlert(type,msg){
  return toast[type](msg,{
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    transition: Bounce,
    })
}

export default toastAlert