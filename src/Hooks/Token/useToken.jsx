import axios from "axios"

function useToken(){
    function createToken (userCred){
        axios.post("/token", userCred)
        .then(res=>{
            if(res.data.result){
                localStorage.setItem("ClientSecret", res.data.result)
            }
        })
        .catch(error=>console.log(error))
    }
  return {
    createToken,
  }
}

export default useToken