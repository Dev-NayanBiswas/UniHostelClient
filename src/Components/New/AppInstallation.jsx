import application from "../../assets/bg/appInstallation.svg"
import HeadingTitle from '../HeadingTitle/HeadingTitle'

function AppInstallation() {
  return (
    <>
    <section className="grid grid-cols-2">
        <section className="flex flex-col justify-evenly">
    <HeadingTitle headingData={{heading:"App Installation"}}/>
            <p>
            Experience convenience like never before by installing our latest app from the Play Store! Designed to enhance your hostel dining experience, our app allows university students to seamlessly browse daily menus, place meal orders, and stay updated on special offers and events. With a user-friendly interface, easy navigation, and real-time notifications, you’ll never miss out on your favorite meals. Simply search for our app on the Google Play Store, hit the install button, and get instant access to a hassle-free way of managing your meals. Whether you’re pre-ordering dinner, checking meal schedules, or providing feedback, our app puts everything at your fingertips. Download it today and enjoy a smarter, more efficient way to stay connected with your hostel dining services!
            </p>
            <a href="../../assets/bg/resume.pdf" download target="_blank" className="bg-logo-yellow self-center px-7 py-2 rounded-lg font-semibold font-heading text-white mt-7">Download Now</a>
        </section>
        <figure className="h-[40vh] w-full aspect-video">
        <img className="w-full h-full object-cover" src={application} alt="" />
        </figure>
    </section>
    </>
  )
}

export default AppInstallation