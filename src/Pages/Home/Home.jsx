import Container from "../../Components/Container"
import AddMealForm from "../../Components/Forms/AddMealForm"
import ReviewInput from "../../Components/Forms/ReviewInput"
import UpdateReview from "../../Components/Forms/UpdateReview"
import SubscriptionCard from "../../Components/SubscriptionCard/SubscriptionCard"
import DynamicTitle from "../../Utilities/DynamicTitle"

function Home(){

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
    </div>
  )
}

export default Home