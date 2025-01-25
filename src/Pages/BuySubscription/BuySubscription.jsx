import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {useParams } from "react-router-dom"
import SubscriptionCard from "../../Components/SubscriptionCard/SubscriptionCard";
import HeadingTitle from "../../Components/HeadingTitle/HeadingTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield } from "@fortawesome/free-solid-svg-icons";

const fetchSubscriptionData = async(id)=>{
    const response = await axios.get(`/subscriptions/${id}`);
    const result = await response?.data;
    return result;
}



const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)

function BuySubscription(){
    const {id} = useParams();
    // console.log(id)
    const {data, isPending, isLoading, isError, error} = useQuery({
        queryKey:["buySubs", id],
        queryFn:()=>fetchSubscriptionData(id),
        enabled:!!id
    })

    if(isLoading || isPending){
        return <p>Loading . . .</p>
    }


    const cardData = data.result;
    const {_id,color, name, description, price, mealsPerDay, menuHighlights, extras, validity, badge} = cardData || {}


    const headingData = {
        heading:`${name} Subscription`,
        desc:"Enjoy a hassle-free month with our hostel meals package! Savor nutritious, delicious, and freshly prepared meals every day. Perfectly balanced for students, this subscription ensures convenience, variety, and quality. Buy now and focus on what matters most"
    }


  return (
    <>
        <section>
            <HeadingTitle headingData={headingData}/>
        </section>
        <section className="md:my-20 my-10 flex md:flex-row flex-col justify-center items-center gap-5">
            <section className="w-full h-full flex justify-center">
                <SubscriptionCard cardData={cardData}/>
            </section>
            <section className="w-full h-full flex flex-col text-gray-500">
                <section className="mb-5">
                <h1 className="text-2xl font-semibold font-heading md:mb-2 my-5">{name} Package</h1>
                <table className="w-fit">
                    <tbody className="space-y-3">
                        <tr className="h-[50px]">
                            <td className="text-lg font-semibold pr-2">Validity</td>
                            <td className="text-lg font-semibold px-2">:</td>
                            <td className="text-lg font-semibold">{validity}</td>
                        </tr>
                        <tr className="lg:h-[50px] h-[80px]">
                            <td className="text-lg font-semibold pr-2">Everyday</td>
                            <td className="text-lg font-semibold px-2">:</td>
                            <td>
                                <ul className="flex flex-wrap gap-4">
                                    {
                                        menuHighlights?.map((item, index)=><li style={{background:color}} className="py-[2px] rounded-md shadow shadow-black px-2 font-semibold" key={index}>{item}</li>)
                                    }
                                </ul>
                            </td>
                        </tr>
                        <tr className="lg:h-[50px] h-[100px]">
                            <td className="text-lg font-semibold pr-2">Extras</td>
                            <td className="text-lg font-semibold px-2">:</td>
                            <td>
                           
                                <ul className="flex flex-wrap gap-4">
                                    {
                                        extras?.map((item, index)=><li style={{background:color}} className="py-[2px] rounded-md shadow shadow-black px-2 font-semibold" key={index}>{item}</li>)
                                    }
                                </ul>
                       
                            </td>
                        </tr>
                        <tr className="lg:h-[50px]">
                            <td className="text-lg font-semibold pr-2">Badge</td>
                            <td className="text-lg font-semibold px-2">:</td>
                            <td className="flex justify-start items-center gap-3">
                                <FontAwesomeIcon style={{
                                                color:color,
                                                filter:'drop-shadow(0 0 2px gray)'
                                            }} className="badgeShadow text-2xl drop-shadow-2xl my-2" icon={faShield}/> <p className="font-semibold">{name}</p>
                            </td>
                        </tr>
                        <tr className="lg:h-[50px]">
                            <td className="text-lg font-semibold pr-2">Price</td>
                            <td className="text-lg font-semibold px-2">:</td>
                            <td className="">
                            <p className="font-semibold text-3xl">$ {price}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </section>
                    <section className="self-stretch">
                    <Elements stripe={stripePromise}>
                            <CheckoutForm cardData={cardData}/>
                    </Elements>
                    </section>
            </section>
        </section>
    </>
  )
}

export default BuySubscription