import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../../Layout/Main"
import Home from "../../Pages/Home/Home/Home";
import Blog from "../../Pages/Blog/Blog";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import DashBoard from "../../Layout/DashBoard";
import AdminProfile from "../../Pages/DashBoard/Profile/AdminProfile";
import DonorProfile from "../../Pages/DashBoard/Profile/DonorProfile";
import CreateDonationReq from "../../Pages/DashBoard/CreteaDonatonReq/CreteaDonatonReq";
import VolunteerProfile from "../../Pages/DashBoard/Profile/VolunteerProfile";
import VolunteerHome from "../../Pages/DashBoard/Home/VolunteerHome";
import DonationRequest from "../../Pages/DashBoard/DonationRequest/DonationRequest";
import BloodDonationDetails from "../../Pages/BloodDonationDetails/BloodDonationDetails";
import DonorHome from "../../Pages/DashBoard/Home/DonorHome";
import CreateRequestToDonate from "../../Pages/DashBoard/CreateRequestToDonate/CreateRequestToDonate";
import RequestedDonationDetails from "../../Pages/DashBoard/Home/RequestedDonationDetails";
import EditDonationRequest from "../../Pages/DashBoard/EditDonationRequest/EditDonationRequest";
import MyDonationRequestPage from "../../Pages/DashBoard/MyDonationRequestPage/MyDonationRequestPage";
import EditProfile from "../../Components/UserInfo/EditProfile";
import AdminHome from "../../Pages/DashBoard/Home/AdminHome";
import AllUsers from "../../Pages/DashBoard/AllUsers/AllUsers";
import AllBloodDonationRequests from "../../Pages/DashBoard/AllBloodDonationRequests/AllBloodDonationRequests";
import ContentManagement from "../../Pages/DashBoard/ContentManagement/ContentManagement";
import AddBlog from "../../Pages/DashBoard/ContentManagement/AddBlog.jsx/AddBlog";
import PrivateRoute from "../../Providers/PrivateRoute";
import SearchPage from "../../Pages/Search Page/SearchPage";
import VolunteerAllBloodDonation from "../../Pages/DashBoard/VolunteerAllBloodDonation/VolunteerAllBloodDonation";

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
            {
                path: "/search",
                element: <SearchPage/>
            },
            {
                path: "/donationRequests",
                element: <PrivateRoute><DonationRequest/></PrivateRoute>
            },
            {
                path: "/bloodDonationDetails/:id",
                element: <PrivateRoute><BloodDonationDetails/></PrivateRoute>,
                loader: ({params})=> fetch(`http://localhost:5000/donationRequest/${params.id}`),
            },
           
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><DashBoard/></PrivateRoute>,
        children: [
            {
                path:"adminProfile",
                element: <AdminProfile/>
            },
            {
                path:"donorProfile",
                element: <DonorProfile/>
            },
            {
                path:"editProfile",
                element: <EditProfile/>
            },
            {
                path:"volunteerProfile",
                element: <VolunteerProfile/>
            },
            {
                path:"createDonationRequest",
                element: <CreateDonationReq/>
            },
            {
                path:"volunteerHome",
                element: <VolunteerHome/>
            },
            {
                path:"donorHome",
                element: <DonorHome/>
            },
            {
                path:"adminHome",
                element: <AdminHome/>
            },
            {
                path:"all-users",
                element: <AllUsers/>
            },
            {
                path:"content-management",
                element: <ContentManagement/>
            },
            {
                path:"content-management/add-blog",
                element: <AddBlog/>
            },
            {
                path:"all-blood-donation-request",
                element: <AllBloodDonationRequests/>
            },
            {
                path:"create-donation-request",
                element: <CreateRequestToDonate/>
            },
            {
                path:"volunteer-all-blood-donation-request",
                element: <VolunteerAllBloodDonation/>
            },
            {
                path:"my-donation-requests",
                element: <MyDonationRequestPage/>
            },
            {
                path: "RequestedDonationDetails/:id",
                element: <RequestedDonationDetails/>,
                loader: ({params})=> fetch(`http://localhost:5000/donationRequest/${params.id}`),
            },
            {
                path: "editDonationRequest/:id",
                element: <EditDonationRequest/>,
                loader: ({params})=> fetch(`http://localhost:5000/donationRequest/${params.id}`),
            },
        ]
    },
])