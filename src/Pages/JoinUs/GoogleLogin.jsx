import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../Hooks/useAuth"
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import useStudentsCURD from "../../Hooks/Students/useStudentsCURD";

function GoogleLogin(){
  const {postStudent} = useStudentsCURD()
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);

    const {googleLogin} = useAuth();
    async function handleGoogleLogin(){
        try{
            const result = await googleLogin();
            const allData = result.user;
            const studentData = {
              name:allData.displayName,
              email:allData.email,
              image:allData.photoURL,
              badge:"bronze",
            }
            postStudent(studentData);
            navigate(location.state? location.state : "/");
        }catch(error){
            const errorMessage = error.message;
            alert(errorMessage);
        }
    }
  return (
    <section className="flex justify-center gap-4 mt-5">
                <button onClick={handleGoogleLogin} className="px-[5px] py-[4px] flex justify-center items-center bg-logo-yellow rounded-full hover:scale-125 transition transform duration-300 shadow-lg">
                <FontAwesomeIcon className="text-white text-4xl" icon={faGoogle}/>
              </button>
              <button disabled  className="px-[5px] pointer-events-none py-[4px] flex justify-center items-center bg-logo-yellow rounded-full hover:scale-125 transition transform duration-300 shadow-lg">
              <FontAwesomeIcon icon={faGithub} className="text-white text-4xl"/>
              </button>
    </section>
  )
}

export default GoogleLogin