import { Link } from "react-router-dom"
import { motion } from "motion/react";


function MealCard({cardData, index}){
  const {rating,title,price,category,image,_id} = cardData || {};
  return (
    <>
        <div
          
        className="relative rounded-xl group overflow-hidden duration-500 h-80 aspect-square text-gray-50 border-4 border-logo-yellow">
      
            <img className="h-full w-full object-cover object-center z-40 rounded-lg" src={image} alt="" />
            <Link to={`/details/${_id}`} className="bg-gray-bg/75 group-hover:w-5/12 w-4/12 duration-500 rounded-s-full text-logo-yellow font-semibold px-3 py-1 absolute top-5 right-0">See Details</Link>
      <div className="rounded-lg">
        <div className="group-hover:scale-110 w-full h-80 duration-500" />

        <div className="absolute w-full h-40 left-0 px-5 pt-4 -bottom-16 min-w-full duration-500 group-hover:-translate-y-16">
          <div className="absolute -z-10 left-0 w-full h-44  opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-gray-900" />


          <p className="text-[17px] w-fit mx-auto font-semibold font-heading my-3 px-2 py-2 bg-black/45 border border-white/45  rounded-lg">{title}</p>
          <table className="group-hover:opacity-100 w-full duration-500 opacity-0 text-left">
                    <tbody>
                    <tr className="">
                        <td className="">Category</td>
                        <td className="pl-0">:</td>
                        <td className="capitalize">{category}</td>
                    </tr>
                    <tr>
                        <td className="">Price</td>
                        <td className="w-1/6">:</td>
                        <td className="">$ {price}</td>
                    </tr>
                    </tbody>
                </table>
        </div>


      </div>
    </div>
    </>
  )
}

export default MealCard