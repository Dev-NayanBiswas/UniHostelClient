import Container from "../../Components/Container"
import AddMealForm from "../../Components/Forms/AddMealForm"
import ReviewInput from "../../Components/Forms/ReviewInput"
import UpdateReview from "../../Components/Forms/UpdateReview"
import MealCard from "../../Components/MealCard/MealCard"
import SubscriptionsContainer from "../../Components/SubscriptionCard/SubscriptionsContainer"
import dateConverter from "../../Utilities/dateConverter"
import DynamicTitle from "../../Utilities/DynamicTitle"
import CategoryMeals from "./MealByCategory/CategoryMeals"

function Home(){

  const date = Date.now();

  console.log(dateConverter(date));

  return (
    <div>
      <DynamicTitle/>
      Home
      <Container>
        <MealCard/>
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