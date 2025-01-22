import { faShield} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

function SubscriptionCard({cardData}){
      const {_id,color, name, description, price, mealsPerDay, menuHighlights, extras, validity, badge} = cardData || {}
  return (
    <>
<div className="group relative h-96 md:w-72 w-80  [perspective:2000px]">
  <div
  style={{
    background:`${color}72`,
    border:`4px solid ${color}`,

  }}
    className="absolute rounded-xl duration-1000 w-full h-full [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]"
  >
    <div
    style={{
        color:badge === 'silver' && "#374151" || badge === 'gold' && "#713f12" || badge === 'platinum' && '#334155'
    }}
      className="absolute w-full h-full !rounded-xl p-6 [backface-visibility:hidden]"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start">
          <div className="text-5xl flex justify-between items-center text-center gap-4 w-full rounded-s-full bg-black/25 relative -right-[24px]">
          
                <p style={{
                color:color,
                filter:`drop-shadow(0 0 0.5px gray)`
            }} className="text-[40px] mx-auto font-bold font-heading">{name}</p>
     
            
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-6xl text-center font-semibold">
            ${price}
          </p>
          <p className="text-center text-xl my-4">for {validity}</p>
          <FontAwesomeIcon style={{
                color:color,
                filter:'drop-shadow(0 0 2px gray)'
            }} className="badgeShadow text-8xl drop-shadow-2xl my-2" icon={faShield}/>
        </div>
        <div className="mt-auto text-center">
          <p className="text-sm opacity-75">with <span className="text-xl font-bold mx-1">{mealsPerDay}</span> Meals</p>
          <p className="text-sm opacity-75">with<span className="text-xl font-bold mx-1">{extras.length}</span> Extras</p>
        </div>
      </div>
    </div>
            {/* Back */}
    <div
    style={{
        background:`${color}80`,
      }}
      className="absolute w-full h-full p-6 [transform:rotateX(180deg)] [backface-visibility:hidden]"
    >
      <div
      style={{
        color:badge === 'silver' && "#374151" || badge === 'gold' && "#713f12" || badge === 'platinum' && '#334155'
    }}
       className="flex flex-col h-full">
        <div className="text-xl font-bold mb-2">{name} ${price}</div>
        <div className="flex-grow">
        <p className="text-xs">{description}</p>
            <p className="text-lg font-semibold text-center">Meals</p>
            <div className="border-b-[1px]"/>
          <ul className="pl-4 flex justify-between gap-3 flex-wrap">
            {
                menuHighlights.map((item,index)=><li className="list-disc" key={index}>{item}</li>)
            }
          </ul>
            <p className="text-lg font-semibold text-center mt-1">Extras</p>
            <div className="border-b-[1px]"/>
          <ul className="pl-4 flex flex-col justify-start my-1">
            {
                extras.map((item,index)=><li className="list-disc" key={index}>{item}</li>)
            }
          </ul>
        </div>
        <div className="flex justify-between items-center mt-auto">
          <Link to={`/subscription/${_id}`}
            className="px-4 py-2 bg-gray-bg text-logo-yellow rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Get the Badge
          </Link>
          <span className="text-3xl">
          <FontAwesomeIcon style={{
                color:color,
                filter:`drop-shadow(0 0px 0.1rem ${'black'})`
            }} className="badgeShadow text-2xl" icon={faShield}/>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default SubscriptionCard