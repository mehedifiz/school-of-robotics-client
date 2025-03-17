// import "@material-tailwind/react/tailwind.css";
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/error/ErrorPage";
import Home from "../pages/home/Home";
 
import ContactUs from "../pages/contactUs/ContactUs";
import Management from "@/pages/management/Management";
import Dashboard from "@/layout/Dashboard";
import DashboardHome from "@/components/dashboard/DashboardHome";
 
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRoute from "@/routes/PrivateRoute";
import Profile from "@/pages/profile/Profile";
 


const router = createBrowserRouter([
   {
      path: "/",
      errorElement: <ErrorPage />,
      element: <Root />,
      children: [
         { index: true, element: <Home /> },
 
         {
            path:'/contact',
            element: <ContactUs></ContactUs>
         },
         {
            path:'/management',
            element: <Management></Management>
         },
 
         { path: "login", element: <Login /> },
         { path: "register", element: <Register /> },
         
 
      ]
   },
   {
      path: '/dashboard',
      element: <PrivateRoute><Dashboard/></PrivateRoute>,
      children: [
         {
            path: 'student-dashboard',
            element: <PrivateRoute><DashboardHome></DashboardHome></PrivateRoute>
         },
         {
            path: 'profile',
            element: <PrivateRoute><Profile /></PrivateRoute>
         },
      ]
   }
]);

export default router;