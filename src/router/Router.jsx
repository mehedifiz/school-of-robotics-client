
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/error/ErrorPage";
import Home from "../pages/home/Home";

import ContactUs from "../pages/contactUs/ContactUs";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Management from "@/pages/management/Management";
import Dashboard from "@/pages/dashboard/Dashboard";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import PrivateRoute from "@/routes/PrivateRoute";
import Profile from "@/pages/profile/Profile";
import EditProfile from "@/pages/profile/EditProfile";
import Books from "@/pages/books/Books";
import StudentBooks from "@/pages/dashboard/studentBook/StudentBooks";


const router = createBrowserRouter([
   {
      path: "/",
      errorElement: <ErrorPage />,
      element: <Root />,
      children: [
         {
            index: true,
            element: <Home />
         },
         {
            path: '/contact',
            element: <ContactUs></ContactUs>
         },
         {
            path: '/management',
            element: <Management></Management>
         },
         {
            path: "login",
            element: <Login />
         },
         {
            path: "register",
            element: <Register />
         },
         {
            path : 'books',
            element : <Books></Books>
         },

      ]
   },
   {
      path: '/dashboard',
      element: <PrivateRoute><Dashboard/></PrivateRoute>,
      children: [
         {
            index: true,
            element: <DashboardHome />
         },
         {
            path : 'profile',
            element : <Profile></Profile>
         },
         {
            path : 'editProfile',
            element : <EditProfile></EditProfile>
         },
         {
            path : 'student-book',
            element : <StudentBooks></StudentBooks>
         },
        
      ]
   }
]);

export default router;
