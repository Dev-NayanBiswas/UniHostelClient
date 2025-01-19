function HeadingTitle({headingData}){
    const {heading, desc} = headingData || {};
  return (
    <section className="flex flex-col justify-center items-center gap-3 mb-5">
        <div className="border-b-[2px] border-logo-yellow/35 w-full"/>
        <div className="text-center">
        <div className="my-2">
        <h1 className="text-center md:text-5xl text-3xl font-bold text-logo-yellow font-heading">{heading}</h1>
        </div>
        {
            desc? <p className="text-gray-400 text-sm font-para md:text-center lg:w-10/12 w-full mx-auto md:line-clamp-3 line-clamp-2">{desc}</p> : ""
        }
        </div>
        <div className="border-b-[2px] border-logo-yellow/35 w-full"/>
    </section>
  )
}

export default HeadingTitle