import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/Logo/UniHostelYellow.png"
import { faBars, faBed, faBellConcierge} from "@fortawesome/free-solid-svg-icons";
import SwitchTheme from "./SwitchTheme";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";




const navMenu = [
  {name:"home", path:"/"},
  {name:"meals", path:"/meals"},
  {name:"upcoming", path:"/upcoming"},
  {name:"join us", path:"/joinUs"},
  {name:"register", path:"/joinUs/register"}
]

function Navbar(){
  const {userData,signOutUser} = useAuth()
  const location = useLocation();
  const navigate = useNavigate();

  console.log(userData);

  function handleNavLink(path){
      navigate(path);
  }
  return (
    <div className='navbar navContainer flex'>
      <div className='navbar-start'>
        <figure className="w-44 py-2">
            <img className="object-contain w-full h-full" src={logo} alt="" />
        </figure>
      </div>

      <div className="navbar-center flex-1 h-full lg:block hidden">
        <section className="flex h-full justify-center gap-2">
        {
          navMenu.map(({name, path},index)=><button key={index} onClick={()=>handleNavLink(path)} className={
            path === location.pathname? 'text-lg w-[150px] whitespace-nowrap px-3 py-2 items-end uppercase text-logo-yellow font-button font-semibold' : "text-lg w-[150px] whitespace-nowrap px-3 text-gray-400 font-button font-semibold"
          }>{name}</button>)
        }
        </section>
      </div>

      <div className='navbar-end'>

          {/* Notification */}
        <div className='dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
          
      <div className="indicator hidden md:block">
        <FontAwesomeIcon icon={faBellConcierge} className="text-2xl text-logo-yellow"/>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
          </div>
        </div>

        <div>
          <SwitchTheme/>
        </div>


        {/* Avatar */}
        <div className='dropdown dropdown-end'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full ring-2 ring-gray-bg'>
              <img
                alt='Tailwind CSS Navbar component'
                src={userData?.photoURL}
              />
            </div>
          </div>
          <section
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-md z-[1] mt-3 w-fit p-2 shadow space-y-3'>
            <p className='text-lg text-center w-[150px] py-2 px-8 whitespace-nowrap items-end capitalize text-gray-400 font-button font-semibold'>{userData?.displayName}</p>
            <button className='text-lg w-[150px] py-2 px-8 whitespace-nowrap items-end bg-gray-bg/65 text-logo-yellow font-button font-semibold'>Dashboard</button>
            <button onClick={signOutUser} className='text-lg w-[150px] py-2 px-8 whitespace-nowrap items-end bg-red-500/85 text-white font-button font-semibold'>Signout</button>
          </section>
          </div>


        {/* Small MenuBar */}
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <FontAwesomeIcon className="text-2xl" icon={faBars}/>
      </div>
      <section
        tabIndex={0}
        className="menu dropdown-content bg-base-100 rounded-md z-[1] mt-3 p-3 shadow text-center space-y-3">
        {
          navMenu.map(({name, path},index)=><button key={index} onClick={()=>handleNavLink(path)} className={
            path === location.pathname? 'text-lg w-[150px] py-2 px-8 whitespace-nowrap items-end uppercase bg-gray-bg/65 text-logo-yellow font-button font-semibold' : "text-lg py-2 w-[150px] whitespace-nowrap bg-transparent text-gray-400 font-button font-semibold"
          }>{name}</button>)
        }
        
      </section>
    </div>
        
      </div>

    </div>
  );
}

export default Navbar;
