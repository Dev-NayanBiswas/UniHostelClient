import { faArrowsToEye,faBellConcierge,faBowlFood, faBowlRice, faCog, faCommentAlt, faHomeAlt, faPeopleGroup, faPlateWheat, faSync, faUserCog, faUserGraduate, faWallet, faWheatAlt, faWheatAwnCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillSun } from "react-icons/ai";
import { FaMoon} from "react-icons/fa";
import useAdmin from "../../../Hooks/Admin/useAdmin";
import useAuth from "../../../Hooks/useAuth";





const userMenu = [
  { name: 'My Profile', path: '/dashboard/student/studentProfile', icon:faUserGraduate},
  { name: 'Requested Meals', path: '/dashboard/student/requestedMeals', icon:faBellConcierge},
  { name: 'My Reviews', path: '/dashboard/student/myReviews', icon:faCommentAlt},
  { name: 'My Payments', path: '/dashboard/student/transactions', icon:faWallet}

];
const adminMenu = [
  { name: 'Admin Profile', path: '/dashboard/admin/adminProfile', icon:faUserCog},
  { name: 'All Users', path: '/dashboard/admin/allUsers', icon:faPeopleGroup},
  { name: 'Add Meal', path: '/dashboard/admin/addMeal', icon:faBowlFood},
  { name: 'All Meals', path: '/dashboard/admin/allMeals', icon:faWheatAlt},
  { name: 'All Reviews', path: '/dashboard/admin/allReviews',icon:faArrowsToEye},
  { name: 'Serve Meals', path: '/dashboard/admin/serve',icon:faPlateWheat},
  { name: 'Upcoming Meals', path: '/dashboard/admin/upcomingMeals',icon:faWheatAwnCircleExclamation},
];
const floatMenu = [
  { path: '/', icon:faHomeAlt},
  { path: '/meals', icon:faBowlRice},
  { path: '/upcoming', icon:faSync},
]



function DashNavbar(){
  const {loading, userData} = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
  const {data:adminInfo, isLoading:adminLoading, isError:adminIsError, error:adminError} = useAdmin();

if (adminLoading || loading) {
  return (
    <p className='text-center text-5xl text-green-500 font-semibold italic'>
      Loading . . .
    </p>
  );
}

if (adminIsError) {
  // console.log(adminError)
  return (
    <p className='text-center text-5xl text-red-500 font-semibold italic'>
      {adminError?.response?.data?.message}
    </p>
  );
}



const dashMenu = adminInfo ? adminMenu : userMenu;

// console.log(dashMenu);


function handleNavLink(path){
    navigate(path)
}


  return (
    <>
      <section>
        <div className='drawer relative z-40'>
          <nav className="absolute top-0 right-0 w-fit flex gap-4 my-2 mr-4">
            {
              floatMenu.map(({path, icon}, index)=><button className="px-2 py-[7px] border-2 border-logo-yellow rounded-full" onClick={()=>handleNavLink(path)} key={index}>
              <FontAwesomeIcon className={`${icon == faSync ? "fa-spin text-xl rounded-full text-logo-yellow duration-300 transition-all" : "text-xl rounded-full text-logo-yellow duration-300 transition-all"}`}  icon={icon}/>
            </button>)
            }
          </nav>
          <input id='my-drawer' type='checkbox' className='drawer-toggle' />
          <div className='drawer-content absolute top-0 left-3 my-4 cursor-pointer hover:animate-pulse hover:scale-105 group'>
            <label
              htmlFor='my-drawer'
              className='drawer-button rounded-full p-2 border-2 border-logo-yellow cursor-pointer'>
              <FontAwesomeIcon className="text-xl fa-beat rounded-full text-logo-yellow duration-300 transition-all group-hover:animate-spin" icon={faCog}/>
            </label>
          </div>
          <div className='drawer-side'>
            <label
              htmlFor='my-drawer'
              aria-label='close sidebar'
              className='drawer-overlay'></label>
            <section className='menu bg-gray-bg flex flex-col gap-2 items-start justify-start text-base-content min-h-full w-80 p-4'>
              <div className="flex w-full justify-between items-center px-3 py-2 border-[1px] border-logo-yellow/25 rounded-lg my-20">
              <h1  className="w-full text-logo-yellow text-center text-2xl font-semibold">{adminInfo? 'Admin Dashboard' : 'Student Dashboard'}</h1>
              <DarkTheme/>
              </div>
            {dashMenu.map((item, index) => (
                  <button onClick={()=>handleNavLink(item.path)}
                    key={index}
                    className={location.pathname === item.path
                        ? 'text-logo-yellow hover:scale-105 transition-all duration-300 hover:text-logo-yellow  text-xl px-3 py-2 font-medium'
                        : 'text-gray-400 hover:scale-105 transition-all duration-300 hover:text-logo-yellow rounded-md px-3 py-2 text-xl font-medium'}
                  >
                    <FontAwesomeIcon icon={item.icon} className="text-inherit mx-3"/>
                    {item.name}
                  </button>
                ))}
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

export default DashNavbar;


function DarkTheme(){
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "lemonade");
    
        const toggleTheme = () => {
            const newTheme = theme === "lemonade" ? "sunset" : "lemonade";
            setTheme(newTheme);
            localStorage.setItem("theme", newTheme);
        };
    
        useEffect(() => {
            document.documentElement.setAttribute("data-theme", theme);
        }, [theme]);
    return(
        <div className="flex items-center gap-2">
                    <button
                        className="px-3"
                        onClick={toggleTheme}
                    >
                        {theme === "sunset" ? <FaMoon className="text-sky-300" size={20} /> : <AiFillSun fill="gold" size={20}/>}
                    </button>
                </div>
    )
            
}
