import { motion} from "motion/react";

function HeadingTitle({headingData}){
    const {heading, desc} = headingData || {};
  return (

    <section
    className="flex flex-col justify-center items-center gap-3 mb-5">
        <motion.div initial={{x:'100%', opacity:0}} whileInView={{x:0, opacity:1}} transition={{duration:1.5, delay:1}} viewport={{once:true}} className="border-b-[2px] border-logo-yellow/35 w-full"/>
        <div className="text-center">
        <div className="my-2 overflow-hidden">
        <motion.h1
        initial={{y:'100%', opacity:0}}
        whileInView={{y:0, opacity:1}}
        exit={{opacity:0, x:"100%"}}
        transition={{duration:0.5, delay:0}}
        viewport={{once:true}}
         className="text-center md:text-5xl text-3xl font-bold text-logo-yellow font-heading my-3">{heading}</motion.h1>
        </div>
        {
            desc? <motion.p initial={{x:'100%', opacity:0}} whileInView={{x:0, opacity:1}} transition={{duration:0.5, delay:0.5}} viewport={{once:true}} className="text-gray-400 text-sm font-para md:text-center lg:w-10/12 w-full mx-auto md:line-clamp-3 line-clamp-2">{desc}</motion.p> : ""
        }
        </div>
        <motion.div initial={{x:'-100%', opacity:0}} whileInView={{x:0, opacity:1}} transition={{duration:1.5, delay:1}} viewport={{once:true}} className="border-b-[2px] border-logo-yellow/35 w-full"/>
    </section>

  )
}

export default HeadingTitle