import { Outlet } from "react-router-dom"
import Container from "../../../Components/Container"

function Admin() {
  return (
    <div>
        <Container>
        </Container>
        <Container>
            <Outlet/>
        </Container>
    </div>
  )
}

export default Admin