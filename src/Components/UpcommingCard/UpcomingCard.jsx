import { Link } from "react-router-dom";

function UpcomingCard({cardData}){
    const {rating,title,price,category,image,_id} = cardData || {};
  return (
    <>
    <Link to={`/details/${_id}`}>
       <div className="group before:hover:scale-95 before:hover:h-72 before:hover:rounded-xl before:hover:w-80 before:hover:h-44 before:transition-all before:rounded-t-xl before:duration-700 before:content-[''] before:w-80 before:h-24 hover:before:rounded-tl-2xl before:bg-logo-yellow/65 before:hover:bg-gray-700/65  before:absolute before:top-0 w-80 h-72 relative bg-transparent shadow-md hover:drop-shadow-2xl hover:shadow-logo-yellow/45 hover:bg-logo-yellow duration-700 flex flex-col items-center justify-center gap-2 text-center rounded-xl">
        
        <div className="w-36 h-36 rounded-full border-2 group-hover:border-logo-yellow z-10 group-hover:scale-110 group-hover:-translate-x-24 group-hover:-translate-y-20 transition-all duration-500">
        <img className="object-cover h-full w-full rounded-full bg-transparent" src={image} alt="" />
        </div>
        <div className="z-10 group-hover:-translate-y-10 transition-all group-hover:text-gray-100 duration-500 text-logo-yellow tracking-tighter">

          <p className="text-2xl font-semibold whitespace-pre-wrap">{title}</p>
          <p className="text-lg font-semibold capitalize">Category : {category}</p>
          <p>Price : $ {price}</p>


          

        </div>
      </div>
      </Link>
    </>
  )
}

export default UpcomingCard



// gradient-to-bl from-logo-yellow via-logo-yellow to-logo-yellow/25