import Lottie from "lottie-react";
import errorLoading from "../../assets/Logo/404Animation.json"
import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const navigateToHome = (path)=>{
    navigate(path)
  }
  return (
    <section className="w-full h-dvh bg-logo-yellow/65 flex flex-col justify-center items-center">
      <h1 className="text-yellow-300 text-5xl font-semibold font-para">Oops!</h1>
      <p className="text-3xl text-center text-cyan-900">Sorry, an unexpected error has occurred.</p>
      <button onClick={()=>navigateToHome("/")} className="text-lg font-semibold font-heading px-5 py-2 bg-gray-bg rounded-lg my-5">Go Home</button>

      <section>
        <section className="h-[60vh]">
        <Lottie className="object-fit h-full w-full" animationData={errorLoading} loop/>
        </section>
    </section>

      <p className="text-6xl text-red-600 font-heading font-bold">
        <i>{error.statusText || error.message}</i>
      </p>
    </section>
  );
}
