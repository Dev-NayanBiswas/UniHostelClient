import { Outlet } from "react-router-dom"
import Container from "../../../Components/Container"

function Admin() {
  return (
    <div>
        <Container>
            <h1>Admin Profile</h1>
        </Container>
        <Container>
            <Outlet/>
        </Container>
    </div>
  )
}

export default Admin