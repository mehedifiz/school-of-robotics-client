import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/error/ErrorPage";

const router = createBrowserRouter([
   {
      path: "/",
      errorElement: <ErrorPage />,
      element: <Root />,
   },
]);

export default router;