// import "@material-tailwind/react/tailwind.css";
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/error/ErrorPage";
import Home from "../pages/home/Home";
 
import ContactUs from "../pages/contactUs/ContactUs";
import Management from "@/pages/management/Management";
import Dashboard from "@/layout/Dashboard";
import DashboardHome from "@/components/dashboard/DashboardHome";


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
      element: <Dashboard></Dashboard>,
      children: [
         {
            path: 'user-dashboard',
            element: <DashboardHome></DashboardHome>
         }
      ]
   }
]);

export default router;