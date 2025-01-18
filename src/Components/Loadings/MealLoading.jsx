import Lottie from "lottie-react";
import mealLoading  from "../../assets/Logo/MealLoadingAnimation.json"

function MealLoading() {
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-gray-900/45 grid place-items-center z-50">
        <section className="h-[30vh] w-full">
        <Lottie className="object-cover h-full w-full" animationData={mealLoading} loop/>
        </section>
    </section>
  )
}

export default MealLoading