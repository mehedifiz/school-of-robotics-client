import Dashboard from "@/layout/Dashboard";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Books from "@/pages/books/Books";
import ManageBooks from "@/pages/dashboard/admin/ManageBooks/ManageBooks";
import DashboardHome from "@/pages/dashboard/common/DashboardHome/DashboardHome";
import EditProfile from "@/pages/dashboard/common/profile/EditProfile";
import Profile from "@/pages/dashboard/common/profile/Profile";
import StudentBooks from "@/pages/dashboard/student/studentBook/StudentBooks";
import Management from "@/pages/management/Management";
import PrivateRoute from "@/routes/PrivateRoute";
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ContactUs from "../pages/contactUs/ContactUs";
import ErrorPage from "../pages/error/ErrorPage";
import Home from "../pages/home/Home";
import VerifyOtp from "@/pages/auth/VerifyOtp";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/contact",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/management",
        element: <Management></Management>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "books",
        element: <Books></Books>,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp/> ,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // common routes
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "editProfile",
        element: <EditProfile></EditProfile>,
      },

      // admin routes
      {
        path: "admin-dashboard",
        element: <DashboardHome />,
      },
      {
        path: "manage-books",
        element: <ManageBooks></ManageBooks>,
      },

      // student routes
      {
        path: "student-dashboard",
        element: <DashboardHome />,
      },
      {
        path: "student-book",
        element: <StudentBooks></StudentBooks>,
      },
    ],
  },
]);

export default router;
