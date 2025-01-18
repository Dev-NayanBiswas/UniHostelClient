import Lottie from "lottie-react";
import mealLoading  from "../../assets/Logo/LoadingAnimation.json"

function FoodLoading() {
  return (
    <section className="fixed w-dvw top-0 bottom-0 left-0 right-0 bg-[#291818] grid place-items-center z-50">
        <section className="h-[40vh]">
        <Lottie className="object-fit h-full w-full" animationData={mealLoading} loop/>
        </section>
    </section>
  )
}

export default FoodLoading