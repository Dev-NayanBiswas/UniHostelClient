import Container from "../../Components/Container"
import SubscriptionsContainer from "../../Components/SubscriptionCard/SubscriptionsContainer"
import DynamicTitle from "../../Utilities/DynamicTitle"
import CategoryMeals from "./MealByCategory/CategoryMeals"

function Home(){

  return (
    <div>
      <DynamicTitle/>
      Home
      <Container>
      </Container>

      <section>
        <CategoryMeals/>
      </section>


      <Container>
        <SubscriptionsContainer/>
      </Container>
    </div>
  )
}

export default Home