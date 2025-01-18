import Container from "../../Components/Container"
import AddMealForm from "../../Components/Forms/AddMealForm"
import ReviewInput from "../../Components/Forms/ReviewInput"
import UpdateReview from "../../Components/Forms/UpdateReview"
import SubscriptionsContainer from "../../Components/SubscriptionCard/SubscriptionsContainer"
import dateConverter from "../../Utilities/dateConverter"
import DynamicTitle from "../../Utilities/DynamicTitle"

function Home(){

  const date = Date.now();

  console.log(dateConverter(date));

  return (
    <div>
      <DynamicTitle/>
      Home
      <Container>

      </Container>
      <Container>
        <AddMealForm/>
      </Container>
      <Container>
        <UpdateReview/>
      </Container>
      <Container>
        <ReviewInput/>
      </Container>
      <Container>
        <SubscriptionsContainer/>
      </Container>
    </div>
  )
}

export default Home