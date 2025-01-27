import Container from "../../Components/Container"
import SubscriptionsContainer from "../../Components/SubscriptionCard/SubscriptionsContainer"
import DynamicTitle from "../../Utilities/DynamicTitle"
import CategoryMeals from "./MealByCategory/CategoryMeals"
import Banner from "./Banner/Banner"
import AboutUs from "./AboutUs/AboutUs"

function Home(){

  return (
    <div>
      <DynamicTitle/>
        <section className="relative">
        <Banner/>
        <div className="absolute top-5 right-5 z-20 md:w-5/12 w-8/12 !h-[5vh]">
        <input type="search" placeholder="search . . ." className="defaultInput w-full h-full placeholder:text-logo-yellow text-logo-yellow !border-[1px]" />
        </div>
        </section>
      <section className=" my-10">
      </section>

      <section>
        <CategoryMeals/>
      </section>


      <Container>
        <SubscriptionsContainer/>
      </Container>
      <Container>
        <AboutUs/>
      </Container>
    </div>
  )
}

export default Home