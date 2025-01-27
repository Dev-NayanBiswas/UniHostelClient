import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayouts from "../MainLayouts";
import Home from "../Pages/Home/Home";
import Meals from "../Pages/Meals/Meals";
import JoinUs from "../Pages/JoinUs/JoinUs";
import UpComingMeals from "../Pages/Meals/UpComingMeals";
import Login from "../Pages/JoinUs/Login";
import Register from "../Pages/JoinUs/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import StudentContainer from "../Pages/Dashboard/Student/StudentContainer";
import Admin from "../Pages/Dashboard/Admin/Admin";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";
import Users from "../Pages/Dashboard/Admin/Users";
import AddMeal from "../Pages/Dashboard/Admin/AddMeal";
import AllMeals from "../Pages/Dashboard/Admin/AllMeals";
import AllReviews from "../Pages/Dashboard/Admin/AllReviews";
import UpcomingMeals from "../Pages/Dashboard/Admin/UpcomingMeals";
import ServeMeals from "../Pages/Dashboard/Admin/ServeMeals";
import MyProfile from "../Pages/Dashboard/Student/MyProfile";
import RequestedMeals from "../Pages/Dashboard/Student/RequestedMeals";
import MyReviews from "../Pages/Dashboard/Student/MyReviews";
import PaymentHistory from "../Pages/Dashboard/Student/PaymentHistory";
import MealDetails from "../Pages/Details/MealDetails";
import StudentRoute from "../Pages/Private/StudentRoute";
import SecureRoute from "../Pages/Private/SecureRoute";
import AdminRoute from "../Pages/Private/AdminRoute";
import BuySubscription from "../Pages/BuySubscription/BuySubscription";
import axios from "axios";
import ErrorPage from "../Pages/ErrorPage.jsx/ErrorPage";

const Routers = createBrowserRouter([
    {
        path:"/",
        element:<MainLayouts/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"meals",
                element:<Meals/>
            },
            {
                path:"details/:id",
                element:<MealDetails/>
            },
            {
                path:"upcoming",
                element:<UpComingMeals/>
            },
            {
                path:"subscription/:id",
                element:<SecureRoute>
                    <BuySubscription/>
                </SecureRoute>
            },
            {
                path:"joinUs",
                element:<JoinUs/>,
                children:[
                    {
                        index:true,
                        element:<Login/>
                    },
                    {
                        path:"register",
                        element:<Register/>
                    }
                ]
            }
        ]
    },
    {
        path:"dashboard",
        element:<SecureRoute>
            <Dashboard/>
        </SecureRoute>,
        children:[
            {
                index:true,
                element:<Navigate to="student" replace/>
            },
            {
                path:"student",
                element:<StudentRoute>
                    <StudentContainer/>
                </StudentRoute>,
                children:[
                    {
                        index:true,
                        element:<Navigate to='studentProfile' replace/>
                    },
                    {
                        path:"studentProfile",
                        element:<MyProfile/>
                    },
                    {
                        path:"requestedMeals",
                        element:<RequestedMeals/>
                    },
                    {
                        path:"myReviews",
                        element:<MyReviews/>
                    },
                    {
                        path:"transactions",
                        element:<PaymentHistory/>
                    },
                ]
            },
            {
                path:"admin",
                element:<AdminRoute>
                    <Admin/>
                </AdminRoute>,
                children:[
                    {
                        index:true,
                        element:<Navigate to='adminProfile' replace/>
                    },
                    {
                        path:'adminProfile',
                        element:<AdminProfile/>
                    },
                    {
                        path:"allUsers",
                        element:<Users/>
                    },
                    {
                        path:"addMeal",
                        element:<AddMeal/>
                    },
                    {
                        path:"allMeals",
                        element:<AllMeals/>
                    },
                    {
                        path:"allReviews",
                        element:<AllReviews/>
                    },
                    {
                        path:"serve",
                        element:<ServeMeals/>
                    },
                    {
                        path:"upcomingMeals",
                        element:<UpcomingMeals/>
                    },
                    
                ]
            }
        ]
    }
])

export default Routers;