import { Outlet } from "react-router-dom"
import DynamicTitle from "../../Utilities/DynamicTitle"

function JoinUs() {
  return (
    <>
    <section>
      <DynamicTitle/>
        <section>
            <Outlet/>
        </section>
    </section>
    </>
  )
}

export default JoinUs