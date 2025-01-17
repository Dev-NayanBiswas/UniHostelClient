import { ParallaxBanner } from "react-scroll-parallax";
import HeadingTitle from "../../Components/HeadingTitle/HeadingTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt,faStar,faThumbsUp } from "@fortawesome/free-solid-svg-icons";


function MealDetails(){
    const bannerData = {
        title: "Butter Chicken with Naan",
        category: "Lunch",
        image: "https://i.ibb.co.com/drYxfxk/featured.jpg",
        ingredients: ["Chicken", "Tomato Cream Sauce", "Butter", "Garlic", "Naan Bread"],
        description: "Indulge in the rich and creamy flavors of Butter Chicken, a beloved Indian dish. Tender chicken pieces are simmered in a luscious tomato-based cream sauce infused with aromatic spices and butter. Served with soft and fluffy naan bread, this dish is a perfect blend of savory and slightly sweet flavors, offering a satisfying lunch experience.",
        price: 11.99,
        date:"dateToday",
        email:'email@email',
        adminName:'Nayan Biswas',
        adminPhoto:'https://i.ibb.co.com/LZS0Br0/Whats-App-Image-2025-01-08-at-12-00-12-AM.jpg',
        reviewCount:20,
        likes:10,
        rating:26,
        state:"published"
      }


    const {category, bannerImage,ingredients, description,price, image,title,adminName,reviewCount,adminPhoto,likes,rating,state,email,date} = bannerData || {};
    console.log(title);
  return (
    <>
    <HeadingTitle headingData={{heading:title}}/>
        <ParallaxBanner className=" w-full h-[80vh] relative z-[1]" layers={[
            { image: image, speed: -20 },
        ]}>
        <div className='inset-0 absolute z-[2] w-full h-full top-0 bottom-0 right-0 left-0'></div>

        <section className="bg-gray-bg/45 absolute left-0 bottom-0 h-fit w-full p-2 text-white font-para">
                <table className="px-2">
                    <tr className="px-2">
                        <td className="px-2">Published By</td>
                        <td className="">:</td>
                        <td className="px-2">{adminName}</td>
                    </tr>
                    <tr>
                        <td className="px-2">Ingredients</td>
                        <td className="">:</td>
                        <td className="px-2">
                        {
                            ingredients.map((item,index)=><span className="mr-2" key={index}>{item}{","}</span>)
                        }
                        </td>
                    </tr>
                    <tr>
                        <td className="px-2">Price</td>
                        <td className="">:</td>
                        <td className="px-2">$ {price}</td>
                    </tr>
                </table>
        </section>

        </ParallaxBanner>
        <section className="text-gray-500">
            <p className="my-2 font-para"><span className="font-heading font-semibold text-lg">Description :</span> {description}</p>


                        <section className="my-4">
                        <table className="px-2 font-normal text-gray-500">
                    <tr className="px-2">
                        <td className="px-2 font-semibold font-heading">
                            <button>
                            <FontAwesomeIcon className="text-blue-400 md:text-2xl text-lg" icon={faThumbsUp}/>
                            </button>
                            <span className="mx-3">{likes} Likes</span>
                        </td>
                        <td className="px-2 font-semibold font-heading">
                        <FontAwesomeIcon className="text-blue-400 md:text-2xl text-lg" icon={faCommentAlt}/>
                        <span className="mx-3">{reviewCount} Comments</span>
                        </td>
                        <td className="px-2 font-semibold font-heading">
                        <FontAwesomeIcon className="text-logo-yellow md:text-2xl text-lg" icon={faStar}/>
                        <span className="mx-3">{Math.ceil(rating/likes)}/5</span>
                        </td>
                    </tr>
                    
                </table>
                        </section>



            <div className="flex justify-start items-center gap-2">
                <section>
                    <img className="avatar rounded-full max-h-12 ring-2 ring-logo-yellow object-cover aspect-square" src={adminPhoto} alt="" />
                </section>
            <table className="px-2 font-normal text-gray-500">
                    <tr className="px-2">
                        <td className="px-2 font-semibold font-heading">Admin</td>
                        <td className="px-2">-</td>
                        <td className="px-2">{adminName}</td>
                    </tr>
                    <tr>
                        <td className="px-2 font-semibold font-heading">From</td>
                        <td className="px-2">-</td>
                        <td className="px-2">{date}</td>
                    </tr>
                </table>
            </div>
        </section>
    </>
  )
}

export default MealDetails
