import { Outlet } from "react-router-dom"
import Container from "../../Components/Container"
import DashNavbar from "./DashNavbar.jsx/DashNavbar"

function Dashboard() {
  return (
    <>
        <section>
            <DashNavbar/>
        </section>
        <Container>
            <Outlet/>
        </Container>
    </>
  )
}

export default Dashboard