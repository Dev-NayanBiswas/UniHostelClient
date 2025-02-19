import HeadingTitle from '../HeadingTitle/HeadingTitle';


function MeetOurTeam(){
  return (
    <>
    <HeadingTitle headingData={{heading:"Our Team"}}/>
    <section className="flex flex-col-reverse lg:flex-row items-center p-6 rounded-lg gap-5">
            

            <section className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-4 " >
                {
                    teamData?.map((item)=><TeamCard key={item.id} cardData={item}/>)
                }
            </section>
            <article className="lg:w-9/12 w-full flex flex-col gap-5">
                <p className="line-clamp-5">At the heart of our hostel community is a dedicated team committed to providing nutritious and delicious meals for university students. We understand the importance of a well-balanced diet in supporting academic success and overall well-being. Our chefs and kitchen staff work tirelessly to prepare meals that are not only healthy but also cater to different tastes and dietary preferences. From hearty breakfasts to fulfilling dinners, we ensure that every student has access to fresh, home-style meals in a welcoming environment.</p>
                <p className="line-clamp-5">Beyond just serving food, our team fosters a sense of community within the hostel. We believe that shared meals bring people together, creating a space where students can connect, relax, and recharge after a long day of studies. Our friendly staff members strive to make the dining experience enjoyable, ensuring that every student feels valued and cared for. Whether it's through special meal events, themed dinners, or personalized service, we go the extra mile to make dining a highlight of student life.</p>
                <p className="line-clamp-5">We take pride in maintaining high standards of hygiene, quality, and service. Our team continuously seeks feedback to improve the menu and enhance the overall experience for our residents. By providing consistent, nutritious meals in a warm and inclusive setting, we aim to make students feel at home away from home. For us, it's not just about food; it's about creating a supportive environment where students can thrive both academically and personally.</p>
            </article>
        </section>
    </>
  )
}

export default MeetOurTeam

function TeamCard({cardData}){
    const {name, image, contribution, designation} = cardData || {}
  return (
    <>
      <div className='group relative overflow-hidden md:h-[28vh] h-[20vh] w-full aspect-square hover:shadow-lg'>
        <img
          className='h-full group-hover:scale-95 transition-all duration-500 w-full object-top max-w-full bg-gradient-to-b from-logo-yellow/25 to-logo-yellow/15 object-cover'
          src={dynamicImage(image)}
          alt='gallery-photo'
        />
        <section className='absolute h-full -bottom-24 group-hover:bottom-0 opacity-0 group-hover:opacity-90 transition-all duration-300 left-0 w-full bg-gray-700/85 px-3 py-10'>
          <p className='text-2xl text-white font-heading font-semibold'>
            {name}
          </p>
          <p className='text-white'>
            {contribution}
          </p>
          <figure className='text-white flex justify-start items-center gap-2'>
            <span className='text-xl italic font-ubuntu'>{designation}</span>
          </figure>
        </section>
      </div>
    </>
  );
}



function dynamicImage(img){
    return new URL(`../../assets/team/${img}`, import.meta.url).href
}


const teamData = [
    {
      id: 1,
      name: "Anthony",
      image: "1.png",
      contribution: "Anthony, a top content writer on our website, excels in creating engaging, insightful, and high-quality articles that captivate readers worldwide",
      designation: "Lead Designer",
    },
    {
      id: 2,
      name: "Johnson",
      image: "2.png",
      contribution: "Senior Developer focusing on backend architecture and API integrations.",
      designation: "Senior Developer",
    },
    {
      id: 3,
      name: "Daisy",
      image: "3.png",
      contribution: "Marketing Specialist driving brand strategy and digital marketing campaigns.",
      designation: "UI/UX",
    },
    {
      id: 4,
      name: "David Lee",
      image: "4.png",
      contribution: "Project Manager overseeing project timelines, resources, and team coordination.",
      designation: "Manager",
    },
    {
      id: 5,
        name: "Jenny",
      image: "5.png",
      contribution: "Marketing Specialist driving brand strategy and digital marketing campaigns.",
      designation: "Web Dev",
    },
    {
      id: 6,
      name: "Lina",
      image: "6.png",
      contribution: "Project Manager overseeing project timelines, resources, and team coordination.",
      designation: "HR",
    }
  ]
