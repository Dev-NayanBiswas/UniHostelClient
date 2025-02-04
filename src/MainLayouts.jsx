import { Outlet, useLocation } from "react-router-dom"
import Container from "./Components/Container"
import Navbar from "./Components/Navbar/Navbar"
import Footer from "./Components/Footer/Footer"
import { motion } from "motion/react";

function MainLayouts(){
  return (
    <>
      <section >
          <section className="fixed top-0 left-0 right-0 w-11/12 mx-auto z-50">
          <Navbar/>
          </section>
          <section className="h-[12vh] mx-auto w-11/12 md:w-11/12"/>
        <Container>
          <motion.section 
           className="min-h-screen">
            <Outlet/>
          </motion.section>
        </Container>
        <Footer/>
      </section>
    </>
  )
}

export default MainLayouts