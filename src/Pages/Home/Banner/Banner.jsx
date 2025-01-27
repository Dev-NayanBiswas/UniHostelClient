import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './banner.css';
import { ParallaxBanner } from 'react-scroll-parallax';
import { useQuery } from '@tanstack/react-query';
import MealLoading from '../../../Components/Loadings/MealLoading';
import axios from 'axios';



const cardData = {
    _id:"678f99b81bd613f88e7d9b38",
    title: "Chicken Wrap",
    category: "lunch",
    ingredients: [
      "Grilled",
      "Chicken",
      "Hummus",
      "Cucumber",
      ""
    ],
    description: "Enjoy a fresh and flavorful Mediterranean Chicken Wrap, perfect for a light yet satisfying lunch. Grilled chicken seasoned with aromatic spices is paired with crisp cucumber, juicy tomato slices, and thinly sliced red onions. A generous layer of creamy hummus and crumbled feta cheese adds richness, while crisp lettuce provides a refreshing crunch. Everything is wrapped in a soft whole wheat tortilla and finished with a drizzle of tangy tzatziki sauce. This healthy and portable meal is packed with Mediterranean flavors and nutrients to fuel your day.",
    image: "https://i.ibb.co.com/W5BLsKB/chicken-Wrap.jpg",
    price: 10,
    date: 1737464248088,
    email: "mr.nayan.biswas@gmail.com",
    adminName: "Nayan Biswas",
    adminPhoto: "https://lh3.googleusercontent.com/a/ACg8ocJrogE9U_2TK_TRs_EE-We37cA_mcDjqX8yQq2r6h9u3imhsEGh=s96-c",
    reviewCount: 0,
    likes: 2,
    rating: 0,
    state: "published"
  };



function Banner(){

    const {data, isLoading, isError, error} = useQuery({
      queryKey:['categoryMeals'],
      queryFn:async()=>{
        const response = await axios.get(`/meals`);
        const result = await response.data.result?.map(item=>item.image);
        return result;
      },
    })

    if(isLoading){
      return <MealLoading/>;
    }
    if(isError){
      return <p className="text-center text-3xl font-semibold text-red-600">{error.message}</p>
    }

    // console.log(data)
    
  return (
    <Swiper
        spaceBetween={20}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        <SwiperSlide>
        <ParallaxBanner
        // style={{ aspectRatio: '2 / 1', objectFit:'scale-down' }}
          className='lg:h-[75vh] h-[50vh] relative group object-center'
          layers={[{ image: data[0], speed: -20}]}>
          <div className='inset-0 absolute z-[2] w-full h-full top-0 bottom-0 right-0 left-0 bg-black/25'/>
          <div className='flex relative h-full w-full justify-center items-center gap-2 px-4'>
              <div className="md:h-[30vh] flex-col bg-black/25 rounded-xl border-2 border-logo-yellow h-[20vh] md:w-8/12 w-full mx-auto flex justify-center items-center">
                  <h1 className="text-center lg:text-9xl md:text-6xl text-6xl text-white z-40 font-bold tracking-wide font-heading">UniHostel</h1>
                  <p className="text-gray-400 z-40 text-sm md:line-clamp-2 line-clamp-1 px-3">Affordable Meal Plans for University Students – Enjoy 3 daily meals with hassle-free monthly subscriptions</p>
              </div>
          </div>
        </ParallaxBanner>
      </SwiperSlide>
        <SwiperSlide>
        <ParallaxBanner
        // style={{ aspectRatio: '2 / 1', objectFit:'scale-down' }}
          className='lg:h-[75vh] h-[50vh] relative group object-center'
          layers={[{ image: data[1], speed: -20}]}>
          <div className='inset-0 absolute z-[2] w-full h-full top-0 bottom-0 right-0 left-0 bg-black/25'/>
          <div className='flex relative h-full w-full justify-center items-center gap-2 px-4'>
              <div className="md:h-[30vh] flex-col bg-black/25 rounded-xl border-2 border-logo-yellow h-[20vh] md:w-8/12 w-full mx-auto flex justify-center items-center">
                  <h1 className="text-center lg:text-9xl md:text-6xl text-6xl text-white z-40 font-bold tracking-wide font-heading">UniHostel</h1>
                  <p className="text-gray-400 z-40 text-sm md:line-clamp-2 line-clamp-1 px-3">Affordable Meal Plans for University Students – Enjoy 3 daily meals with hassle-free monthly subscriptions</p>
              </div>
          </div>
        </ParallaxBanner>
      </SwiperSlide>
        <SwiperSlide>
        <ParallaxBanner
        // style={{ aspectRatio: '2 / 1', objectFit:'scale-down' }}
          className='lg:h-[75vh] h-[50vh] relative group object-center'
          layers={[{ image: data[2], speed: -20}]}>
          <div className='inset-0 absolute z-[2] w-full h-full top-0 bottom-0 right-0 left-0 bg-black/25'/>
          <div className='flex relative h-full w-full justify-center items-center gap-2 px-4'>
              <div className="md:h-[30vh] flex-col bg-black/25 rounded-xl border-2 border-logo-yellow h-[20vh] md:w-8/12 w-full mx-auto flex justify-center items-center">
                  <h1 className="text-center lg:text-9xl md:text-6xl text-6xl text-white z-40 font-bold tracking-wide font-heading">UniHostel</h1>
                  <p className="text-gray-400 z-40 text-sm md:line-clamp-2 line-clamp-1 px-3">Affordable Meal Plans for University Students – Enjoy 3 daily meals with hassle-free monthly subscriptions</p>
              </div>
          </div>
        </ParallaxBanner>
      </SwiperSlide>
        <SwiperSlide>
        <ParallaxBanner
        // style={{ aspectRatio: '2 / 1', objectFit:'scale-down' }}
          className='lg:h-[75vh] h-[50vh] relative group object-center'
          layers={[{ image: data[3], speed: -20}]}>
          <div className='inset-0 absolute z-[2] w-full h-full top-0 bottom-0 right-0 left-0 bg-black/25'/>
          <div className='flex relative h-full w-full justify-center items-center gap-2 px-4'>
              <div className="md:h-[30vh] flex-col bg-black/25 rounded-xl border-2 border-logo-yellow h-[20vh] md:w-8/12 w-full mx-auto flex justify-center items-center">
                  <h1 className="text-center lg:text-9xl md:text-6xl text-6xl text-white z-40 font-bold tracking-wide font-heading">UniHostel</h1>
                  <p className="text-gray-400 z-40 text-sm md:line-clamp-2 line-clamp-1 px-3">Affordable Meal Plans for University Students – Enjoy 3 daily meals with hassle-free monthly subscriptions</p>
              </div>
          </div>
        </ParallaxBanner>
      </SwiperSlide>
        <SwiperSlide>
        <ParallaxBanner
        // style={{ aspectRatio: '2 / 1', objectFit:'scale-down' }}
          className='lg:h-[75vh] h-[50vh] relative group object-center'
          layers={[{ image: data[4], speed: -20}]}>
          <div className='inset-0 absolute z-[2] w-full h-full top-0 bottom-0 right-0 left-0 bg-black/25'/>
          <div className='flex relative h-full w-full justify-center items-center gap-2 px-4'>
              <div className="md:h-[30vh] flex-col bg-black/25 rounded-xl border-2 border-logo-yellow h-[20vh] md:w-8/12 w-full mx-auto flex justify-center items-center">
                  <h1 className="text-center lg:text-9xl md:text-6xl text-6xl text-white z-40 font-bold tracking-wide font-heading">UniHostel</h1>
                  <p className="text-gray-400 z-40 text-sm md:line-clamp-2 line-clamp-1 px-3">Affordable Meal Plans for University Students – Enjoy 3 daily meals with hassle-free monthly subscriptions</p>
              </div>
          </div>
        </ParallaxBanner>
      </SwiperSlide>
        <SwiperSlide>
        <ParallaxBanner
        // style={{ aspectRatio: '2 / 1', objectFit:'scale-down' }}
          className='lg:h-[75vh] h-[50vh] relative group object-center'
          layers={[{ image: data[5], speed: -20}]}>
          <div className='inset-0 absolute z-[2] w-full h-full top-0 bottom-0 right-0 left-0 bg-black/25'/>
          <div className='flex relative h-full w-full justify-center items-center gap-2 px-4'>
              <div className="md:h-[30vh] flex-col bg-black/25 rounded-xl border-2 border-logo-yellow h-[20vh] md:w-8/12 w-full mx-auto flex justify-center items-center">
                  <h1 className="text-center lg:text-9xl md:text-6xl text-6xl text-white z-40 font-bold tracking-wide font-heading">UniHostel</h1>
                  <p className="text-gray-400 z-40 text-sm md:line-clamp-2 line-clamp-1 px-3">Affordable Meal Plans for University Students – Enjoy 3 daily meals with hassle-free monthly subscriptions</p>
              </div>
          </div>
        </ParallaxBanner>
      </SwiperSlide>
        <SwiperSlide>
        <ParallaxBanner
        // style={{ aspectRatio: '2 / 1', objectFit:'scale-down' }}
          className='lg:h-[75vh] h-[50vh] relative group object-center'
          layers={[{ image: data[8], speed: -20}]}>
          <div className='inset-0 absolute z-[2] w-full h-full top-0 bottom-0 right-0 left-0 bg-black/25'/>
          <div className='flex relative h-full w-full justify-center items-center gap-2 px-4'>
              <div className="md:h-[30vh] flex-col bg-black/25 rounded-xl border-2 border-logo-yellow h-[20vh] md:w-8/12 w-full mx-auto flex justify-center items-center">
                  <h1 className="text-center lg:text-9xl md:text-6xl text-6xl text-white z-40 font-bold tracking-wide font-heading">UniHostel</h1>
                  <p className="text-gray-400 z-40 text-sm md:line-clamp-2 line-clamp-1 px-3">Affordable Meal Plans for University Students – Enjoy 3 daily meals with hassle-free monthly subscriptions</p>
              </div>
          </div>
        </ParallaxBanner>
      </SwiperSlide>
        
      </Swiper>
  )
}


// function SwiperSliderCard({image}){
//     console.log(image)
//     return (
//         <SwiperSlide>
//         <ParallaxBanner
//         // style={{ aspectRatio: '2 / 1', objectFit:'scale-down' }}
//           className='lg:h-[75vh] h-[50vh] relative group object-center'
//           layers={[{ image: image, speed: -20}]}>
//           <div className='inset-0 absolute z-[2] w-full h-full top-0 bottom-0 right-0 left-0 bg-black/25'/>
//           <div className='flex relative h-full w-full justify-center items-center gap-2 px-4'>
//               <div className="md:h-[30vh] flex-col bg-black/25 rounded-xl border-2 border-logo-yellow h-[20vh] md:w-8/12 w-full mx-auto flex justify-center items-center">
//                   <h1 className="text-center lg:text-9xl md:text-6xl text-6xl text-white z-40 font-bold tracking-wide font-heading">UniHostel</h1>
//                   <p className="text-gray-400 z-40 text-sm md:line-clamp-2 line-clamp-1 px-3">Affordable Meal Plans for University Students – Enjoy 3 daily meals with hassle-free monthly subscriptions</p>
//               </div>
//           </div>
//         </ParallaxBanner>
//       </SwiperSlide>
//     )
// }

export default Banner