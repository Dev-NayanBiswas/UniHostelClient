import Container from "../../Components/Container"
import AddMealForm from "../../Components/Forms/AddMealForm"
import ReviewInput from "../../Components/Forms/ReviewInput"
import UpdateMealForm from "../../Components/Forms/UpdateMealFrom"
import UpdateReview from "../../Components/Forms/UpdateReview"
import DynamicTitle from "../../Utilities/DynamicTitle"

function Home(){

  return (
    <div>
      <DynamicTitle/>
      Home
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