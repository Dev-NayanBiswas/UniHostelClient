import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ReviewCard() {
  return (
    <div className="bg-logo-yellow p-[4px] w-fit rounded-xl h-full">
        <div className="w-full h-full max-w-md bg-black/45 rounded-xl shadow-md overflow-hidden mx-auto relative">
      <div className="flex justify-between items-center px-6 py-4 z-40">
        <div className="flex space-x-4">
          <div className="h-20 aspect-square rounded-full bg-gray-200 ring-2 ring-logo-yellow">
            <img src="" alt="" />
          </div>
          <div>
            <div className="text-lg font-bold dark:text-white">Manish Gole</div>

            <section className="relative isolate">
                
                <div className="w-28 absolute top-0">
                {
                    Array(5).fill(null).map((_,index)=><FontAwesomeIcon icon={faStar} className="text-white/10 isolate bg-blend-multiply" key={index}/>)
                }
                </div>
                <div className="w-28">
                {
                    Array(4).fill(null).map((_,index)=><FontAwesomeIcon icon={faStar}  className="text-logo-yellow " style={{
                        left:index * 40
                    }} key={index}/>)
                }
                </div>
            </section>

          </div>
        </div>
        <div>
        </div>
      </div>
      <div className="px-6 py-4 z-40">
        <div className="text-sm text-white font-para">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          pellentesque id erat at blandit. Donec ullamcorper turpis vitae dolor
          lacinia mollis. Donec at augue eget ipsum porttitor interdum.
        </div>
      </div>
    </div>
    </div>
  )
}

export default ReviewCard