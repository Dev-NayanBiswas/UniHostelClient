import { Outlet } from "react-router-dom"
import Container from "../../../Components/Container"

function StudentContainer() {
  return (
    <section className="my-20">
        <Container>
        <Outlet/>
    </Container>
    </section>
  )
}

export default StudentContainer