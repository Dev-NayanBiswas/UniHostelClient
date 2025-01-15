import { Outlet } from "react-router-dom"
import Container from "./Components/Container"
import Navbar from "./Components/Navbar/Navbar"

function MainLayouts() {
  return (
    <>
      <section>
          <section className="fixed top-0 left-0 right-0 w-11/12 mx-auto z-50">
          <Navbar/>
          </section>
          <section className="h-[12vh] mx-auto w-11/12 md:w-11/12"/>
        <Container>
          <section className="min-h-screen">
            <Outlet/>
          </section>
        </Container>
        <h1 className="min-h-[30vh]">Footer</h1>
      </section>
    </>
  )
}

export default MainLayouts