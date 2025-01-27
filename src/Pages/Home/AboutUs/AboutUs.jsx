import { ParallaxBanner } from "react-scroll-parallax"
import HeadingTitle from "../../../Components/HeadingTitle/HeadingTitle"

const headingData = {
    heading:"About Us",
    desc:"Providing affordable, nutritious meal plans tailored for university students. We’re here to simplify your life with fresh, wholesome meals that fuel your ambitions and ensure you stay focused, energized, and ready to achieve your goals every day."
  }

  const image = "https://i.ibb.co.com/j6pxBbw/front-view-friends-spending-time-together.jpg"
function AboutUs() {
  return (
    <>
        <HeadingTitle headingData={headingData}/>
        <section>
            <ParallaxBanner
                    // style={{ aspectRatio: '2 / 1', objectFit:'scale-down' }}
                      className='lg:h-[75vh] h-[50vh] relative group object-center'
                      layers={[{ image: image, speed: -20}]}>
                      <div className='inset-0 absolute z-[2] w-full h-full top-0 bottom-0 right-0 left-0 bg-black/25'/>
                      <div className='flex relative h-full w-full justify-center items-center gap-2 lg:p-6 p-4'>
                          <div className="h-full flex-col bg-black/25 rounded-xl border-2 border-logo-yellow w-full mx-auto flex justify-center items-center gap-3">
                              <p className="text-white z-40 md:text-lg lg:line-clamp-6 line-clamp-3 text-xs px-1 md:w-8/12 w-full">Welcome to UniHostel, a dedicated space where students can enjoy delicious, nutritious meals in a warm and friendly environment. We understand the importance of good food in fueling academic success and maintaining overall well-being. At UniHostel, we take pride in providing freshly prepared, balanced meals that cater to diverse tastes and dietary needs.</p>
                              <p className="text-white z-40 md:text-lg text-xs lg:line-clamp-6 line-clamp-3 px-1 md:w-8/12 w-full">Our mission goes beyond simply serving food; we aim to create a welcoming space where students can relax, connect, and feel at home. With a focus on quality ingredients, hygienic preparation, and a variety of choices, UniHostel makes dining a convenient and enjoyable experience. Whether you're catching a quick meal between classes or sharing stories with friends over dinner, UniHostel ensures that every bite is both satisfying and memorable.</p>
                          </div>
                      </div>
                    </ParallaxBanner>
        </section>
    </>
  )
}

export default AboutUs