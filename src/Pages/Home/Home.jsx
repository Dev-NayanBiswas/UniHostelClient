import { useState } from "react"
import Container from "../../Components/Container"
import SubscriptionsContainer from "../../Components/SubscriptionCard/SubscriptionsContainer"
import DynamicTitle from "../../Utilities/DynamicTitle"
import CategoryMeals from "./MealByCategory/CategoryMeals"

function Home(){
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)



  return (
    <div>
      <DynamicTitle/>
      <section>
      <section className="w-full mt-4 flex justify-center items-center gap-1">
        <div className="flex justify-between">
          <span className="py-1 text-xs text-center text-gray-bg/45 w-[61px] font-heading rounded-full bg-logo-yellow font-semibold">Min : {min}</span>
        </div>
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          className="w-full bg-gray-600/25 h-[2px] rounded-full accent-logo-yellow appearance-none"
        />
      </section>
      <section className="w-full mt-4 flex justify-center items-center gap-1">
        
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          className="w-full bg-gray-600/25 h-[2px] rounded-full accent-logo-yellow appearance-none"
        />
        <div className="flex justify-between">
          <span className="py-1 text-xs text-center text-gray-bg/45 w-[61px] font-heading rounded-full bg-logo-yellow font-semibold">Max : {max}</span>
        </div>
      </section>
      </section>
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