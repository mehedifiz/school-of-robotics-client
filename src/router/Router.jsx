// import "@material-tailwind/react/tailwind.css";
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/error/ErrorPage";
import Home from "../pages/home/Home";

import DashboardHome from "@/components/dashboard/DashboardHome";
import Dashboard from "@/layout/Dashboard";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Management from "@/pages/management/Management";
import ContactUs from "../pages/contactUs/ContactUs";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Root />,
    children: [
      { index: true, element: <Home /> },

      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/course",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/contact",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/management",
        element: <Management></Management>,
      },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "user-dashboard",
        element: <DashboardHome></DashboardHome>,
      },
    ],
  },
]);

export default router;
