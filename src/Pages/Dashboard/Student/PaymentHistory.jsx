import { useQuery } from "@tanstack/react-query"
import FoodLoading from "../../../Components/Loadings/FoodLoading";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/AxiosAPI/useAxiosSecure";
import HeadingTitle from "../../../Components/HeadingTitle/HeadingTitle";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldBlank } from "@fortawesome/free-solid-svg-icons";
import dateConverter from "../../../Utilities/dateConverter";

function PaymentHistory(){
  const {userData, loading} = useAuth();
  const axiosSecure = useAxiosSecure()
  const email = userData?.email;

  const {data, isLoading, isError, error} = useQuery({
    queryKey:["myTransactions", email],
    queryFn:async()=>{
      const response = await axiosSecure.get(`/transactions/studentTransactions/${email}`);
      const result = await response.data;
      return result;
    },
    enabled:!!email && !loading,
  })

  if (isLoading) {
    return <FoodLoading/>;
  }

  if (isError) {
    return (
      <p className='text-2xl text-red-600 text-center my-28 font-semibold font-heading'>
        {error.message}
      </p>
    );
  }

  const headingData = {
    heading:"Payment History",
    desc:"The Transaction History page lets you securely view your past transactions. Just a reminder: never share your transaction ID (TXID) with anyone to protect your privacy and avoid unauthorized access."
  }

  return (
    <>
    <HeadingTitle headingData={headingData}/>
      <section>
      <section className="w-full mx-auto">
      <div className="overflow-x-auto">
  
    {
      data?.result?.length ? 
      <table className="table text-center text-gray-400">
    <thead className="font-heading md:text-lg text-sm border-[2px] rounded-full border-logo-yellow/45 text-logo-yellow">
      <tr>
        <th></th>
        <th className="text-center">Transaction ID's</th>
        <th>Badge</th>
        <th className="text-center">Subscribed On</th>
      </tr>
    </thead>
      <tbody>
      {/* row 1 */}
      {
        data?.result?.map((item, index)=><TableRow key={item._id} idx={index} item={item}/>)
      }
    </tbody> 
  </table> : <section className="h-[20vh] flex flex-col justify-center items-center">
                  <h1 className="text-center text-2xl my-10 font-bold text-orange-600">Buy A Subscription First</h1>
                  <div className="text-center my-7">
                    <Link to="/" className="text-lg font-semibold px-8 py-2 rounded-lg bg-logo-yellow text-white">Go Home</Link>
                  </div>
            </section>
    }
</div>
      </section>
      </section>
    </>
  )
}


function TableRow({item,idx}){
  const {subscriptionID,date, badge, TXID, color} = item || {}
  return (
    <tr>
      <td className="w-[20px] text-lg font-heading italic">
        {idx + 1}
      </td>

        <td className="flex flex-row justify-center gap-3">
        <div>
              <div>
                <button className="md:p-2 p-1 aspect-square rounded-full bg-gray-300/10 drop-shadow-2xl shadow z-20 shadow-black/65">
                              <FontAwesomeIcon
                                style={{
                                  color:badge==='bronze'?'gray':color,
                                  filter:badge==='bronze'?'':'drop-shadow(0 0 4px gray)'
                                }}
                               icon={faShieldBlank} className="lg:text-3xl px-[3px] text-lg shadow-black"/>
                          </button>
              </div>
            </div>
            <div className="text-left flex flex-col justify-center">
            <h1><span className="text-lg font-bold">TxID :</span> {TXID}</h1>
            <h1 className="whitespace-nowrap"><span className="text-lg font-bold">SubsID :</span> {subscriptionID} </h1>
            </div>
        </td>
        <td>
          <h1 className="capitalize font-semibold text-sm">{badge}</h1>
        </td>
        <td className="text-center">
          <h1>{dateConverter(date)}</h1>
        </td>
      </tr>
  )
}
export default PaymentHistory