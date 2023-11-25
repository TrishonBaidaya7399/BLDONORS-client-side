import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../../Layout/Main"
import Home from "../../Pages/Home/Home/Home";
import Blog from "../../Pages/Blog/Blog";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import DashBoard from "../../Layout/DashBoard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/blog",
                element: <Blog/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <SignUp/>
            },
           
        ]
    },
    {
        path: "/dashboard",
        element: <DashBoard/>,
        children: []
    },
])