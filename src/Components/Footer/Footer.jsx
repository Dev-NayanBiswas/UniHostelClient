import { RiGithubFill } from "react-icons/ri"
import { FaFacebook, FaLinkedinIn } from "react-icons/fa"
import { Link } from "react-router-dom";
import {motion} from "motion/react";

function Footer(){
    
    const allPaths = [
        {name:"Home", path:"/"},
        {name:"Meals", path:"/meals"},
        {name:"Upcoming", path:"/upcoming"},
        {name:"Register", path:"/joinUs/register"}
      ]
  return (
    <>
        <motion.footer
        initial={{
            opacity:0,
            scale:0.8,
            y:50
        }}
        whileInView={{
            opacity:1,
            scale:1,
            y:0,
            transition:{
                duration:0.5
            }
        }}
         className="bg-defaultColor/45 bg-logo-yellow
          text-inherit !text-white">
    <section className="container px-6 py-8 mx-auto">
        <section className="flex flex-col items-center text-center">
            <div className="navbar-start relative text-center w-full">
                <h1 className="btn btn-ghost text-4xl font-bold font-heading text-defaultColor ml-4">UniHostel</h1>
                <p className="font-para text-sm lg:w-5/12 mx-auto">At UniHostel, we’ve spent over 10 years dedicated to supporting students with affordable, reliable meal plans. Serving with pride, care, and loyalty, we’re here to make student life easier and more fulfilling</p>
              </div>

            <section className="flex flex-wrap justify-center mt-6 -mx-4">
                {
                    allPaths?.map(({path, name}, index)=><Link key={index} to={path} className="mx-4 text-sm text-inherit font-heading font-semibold transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Reddit"> {name} </Link>)
                }
            </section>

        </section>

        <hr className="my-6 border-gray-200 md:my-10 w-full mx-auto" />

        <section className="flex flex-col items-center sm:flex-row sm:justify-between">
            <p className="text-sm !text-white dark:text-gray-300">© Copyright 2021. All Rights Reserved UniHostel.</p>

            <section className="flex gap-2 items-center">
        <a href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F" target="_blank"><FaFacebook size={30} fill="#1877F2"/></a>
        <a href="https://github.com/Dev-NayanBiswas" target="_blank"><RiGithubFill size={30} /></a>
        <a href="https://www.linkedin.com/in/nayan-biswas1996/" target="_blank"><FaLinkedinIn size={30} fill="#1877F2"/></a>
    </section>
        </section>
    </section>
</motion.footer>
    </>
  )
}

export default Footer