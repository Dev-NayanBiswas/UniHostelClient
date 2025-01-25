import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './checkoutForm.css'
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/AxiosAPI/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import useTX from "../../Hooks/useTX";
import { useNavigate } from "react-router-dom";

function CheckoutForm({cardData}){
    const navigate = useNavigate();
    const postTransactionData = useTX();
    const {userData} = useAuth();
    const [clientSecret, setClientSecret] = useState("")
    const [error, setError] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    
    const {price,name,_id,color,badge} = cardData || {};
    
    useEffect(()=>{
        axiosSecure.post('/payment',{price:price})
        .then(res=>{
            // console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret)
        })
        .catch(error=>console.log(error))
    },[price,axiosSecure])
    
    // console.log(cardData);

    const handleSubmit = async(event)=>{
        event.preventDefault();
        if (!stripe || !elements) {
            return;
          }
          const card = elements.getElement(CardElement);
      
          if (card == null) {
            return;
          }
          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
      
          if (error) {
            // console.log('[error]', error);
            setError(error.message);
          } else {
            console.log('Payment Description', paymentMethod);
            setError("");
          }
          const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:card,
                billing_details:{
                    name:userData?.displayName,
                    email:userData?.email,
                }
            }
          });
          if(confirmError){
            // console.log("Confirm Error",confirmError)
          }else{
            // console.log("Payment Intent",paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                // console.log("TXID", paymentIntent.id);
                const paymentData = {
                    email:userData?.email,
                    name:userData?.displayName,
                    subscriptionID:_id,
                    color:color,
                    badge:badge,
                    TXID:paymentIntent.id,
                    date:Date.now()
                }
                postTransactionData(paymentData);
                navigate("/")
                // console.log(paymentData);
            }
          }
    }

  return (
    <>
    <form className="space-y-3" onSubmit={handleSubmit}>
    <CardElement
    className="defaultInput"
        options={{
            style: {
                base: {
                  fontSize: '16px',
                  borderRadius: "0.5rem",
                  color: '#424770',
                  '::placeholder': {
                    // color: '#aab7c4',
                    color: "#FBBF24",
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
        }}
      />
      <button className="px-5 py-2 bg-logo-yellow text-lg font-semibold font-heading rounded-lg text-white" type="submit" disabled={!stripe || !clientSecret}>
        Buy Subscription
      </button>
    </form>
    <p className="text-red-400 font-semibold font-para">{error}</p>
    </>
  )
}

export default CheckoutForm


// style={{
//     fontSize: "16px",
//     fontWeight: "600",
//     border: "2px solid #FBBF24", // Assuming logo-yellow is #FBBF24
//     outline: "none",
//     borderRadius: "0.5rem",
//     backgroundColor: "transparent",
//     padding: "12px",
//     width: "100%",
//     transition: "transform 0.3s",
//   }}


// style: {
//     base: {
//       fontSize: '16px',
//       color: '#424770',
//       '::placeholder': {
//         color: '#aab7c4',
//       },
//     },
//     invalid: {
//       color: '#9e2146',
//     },
//   },