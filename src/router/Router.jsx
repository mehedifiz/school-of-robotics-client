import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/error/ErrorPage";
import Home from "../pages/home/Home";
import ContactUs from "../pages/contactUs/ContactUs";
import Management from "@/pages/management/Management";

const router = createBrowserRouter([
   {
      path: "/",
      // errorElement: <ErrorPage />,
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
      ]
   },
]);

export default router;