import axios from "axios"

async function setToken(userCred){
        const response = await axios.post("/token", userCred);
        const result = await response.data
        console.log(result.result)
        if(result){
          localStorage.setItem("ClientSecret", result.result)
        }
  
}

export default setToken;