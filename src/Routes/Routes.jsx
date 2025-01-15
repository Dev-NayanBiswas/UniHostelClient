import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayouts from "../MainLayouts";
import Home from "../Pages/Home/Home";
import Meals from "../Pages/Meals/Meals";
import JoinUs from "../Pages/JoinUs/JoinUs";
import UpComingMeals from "../Pages/Meals/UpComingMeals";
import Login from "../Pages/JoinUs/Login";
import Register from "../Pages/JoinUs/Register";

const Routers = createBrowserRouter([
    {
        path:"/",
        element:<MainLayouts/>,
        errorElement:<h1>Error Pages Goes here</h1>,
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
                path:"upcoming",
                element:<UpComingMeals/>
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
    }
])

export default Routers;