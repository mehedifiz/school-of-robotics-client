import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/error/ErrorPage";
import Home from "../pages/home/Home";

const router = createBrowserRouter([
   {
      path: "/",
      // errorElement: <ErrorPage />,
      element: <Root />,
      children: [
         { index: true, element: <Home /> },
      ]
   },
]);

export default router;