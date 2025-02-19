import { useState } from 'react'
import HeadingTitle from '../HeadingTitle/HeadingTitle'


const galleryItems = ["cart.jpg","dinning.jpg","foodCart.jpg","kitchen.jpg","kitchen2.jpg","outside.jpg"]

function Gallery(){
    const [imge, setImge] = useState("bar.jpg")
  return (
    <>
    <HeadingTitle headingData={{heading:"Gallery"}}/>
    <section>
        <section className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <figure className="h-[40vh] w-full aspect-video border-2 border-logo-yellow rounded-lg">
            <img src={dynamicImage(imge)} className="w-full h-full object-cover object-center rounded-lg" alt={imge} />
            </figure>
            <section className="grid grid-cols-3 gap-3">
                {
                    galleryItems.map((item, index)=><OptionImages key={index} onImageChange = {()=>setImge(item)} imge={item}/>)
                }
            </section>
        </section>
    </section>
    </>
  )
}

function OptionImages({imge, onImageChange}){
    return(
        <section>
            <figure onClick={onImageChange} className="w-full h-full border-[2px] border-logo-yellow rounded-lg">
                <img className="w-full h-full object-cover rounded-lg" src={dynamicImage(imge)} alt="" />
            </figure>
        </section>
    )
}

export default Gallery

function dynamicImage(img){
    return new URL(`../../assets/gallery/${img}`, import.meta.url).href
}