function MealCard() {
  return (
    <>
        <div className="relative rounded-xl group cursor-pointer overflow-hidden duration-500 h-80 aspect-square text-gray-50 border-4 border-logo-yellow">
      
            <img className="h-full w-full object-cover object-center z-40" src="https://i.ibb.co.com/drYxfxk/featured.jpg" alt="" />
      <div>
        <div className="group-hover:scale-110 w-full h-80 duration-500" />

        <div className="absolute w-full h-40 left-0 px-5 pt-4 -bottom-16 min-w-full duration-500 group-hover:-translate-y-16">
          <div className="absolute -z-10 left-0 w-full h-44  opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-gray-900" />


          <p className="text-xl font-semibold font-heading my-3 px-2 py-2 bg-black/65 border border-white/45  rounded-lg">Meals Title goes here</p>
          {/* <p className="group-hover:opacity-100 w-full duration-500 opacity-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rem cupiditate animi sapiente odit illum totam alias ex quibusdam ipsum modi minima officiis voluptates, dolore impedit ad, accusamus rerum 
          </p> */}
          <table className="group-hover:opacity-100 w-full duration-500 opacity-0 text-left">
                    <tr className="">
                        <td className="">Category</td>
                        <td className="pl-0">:</td>
                        <td className="capitalize">Category</td>
                    </tr>
                    <tr>
                        <td className="">Price</td>
                        <td className="w-1/6">:</td>
                        <td className="">$ 00.00</td>
                    </tr>
                </table>
        </div>


      </div>
    </div>
    </>
  )
}

export default MealCard