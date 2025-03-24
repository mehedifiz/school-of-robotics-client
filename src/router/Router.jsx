import Dashboard from "@/layout/Dashboard";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Books from "@/pages/books/Books/Books";
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
import AllAdmin from "@/pages/dashboard/admin/ManageAllAdmin/AllAdmin";
import Plan from "@/pages/dashboard/student/plan/Plan";
import Settings from "@/pages/dashboard/common/profile/Settings";
import VerifyOTP from "@/pages/auth/VerifyOtp";
import BookDetails from "@/pages/books/BookDetails/BookDetails";
import ManageChapters from "@/pages/dashboard/admin/ManageChapters/ManageChapters";
import ManageChaptersQuiz from "@/pages/dashboard/admin/ManageChaptersQuiz/ManageChaptersQuiz";
import AddPlan from "@/pages/dashboard/admin/ManagePlan/AddPlan";
import ManagePlans from "@/pages/dashboard/admin/ManagePlan/ManagePlan";
import UpdatePlan from "@/pages/dashboard/admin/ManagePlan/UpdatePlan";


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
        path: "/book-details/:id",
        element: <BookDetails></BookDetails>,
      },
      {
        path: "verify-otp",
        element: <VerifyOTP />,
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
      {
        path: "settings",
        element: <Settings></Settings>,
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
      {
        path: "allAdmins",
        element: <AllAdmin />
      },
      {
        path: "manage-chapters",
        element: <ManageChapters></ManageChapters>,
      },
      {
        path: "manage-chapter-quizzes",
        element: <ManageChaptersQuiz />,
      },
      {
        path: 'addPlan',
        element: <AddPlan />
      },
      {
        path: 'managePlan',
        element: <ManagePlans />
      },
      {
        path: 'updatePlan/:id',
        element: <UpdatePlan />,
        loader: ({ params }) => fetch(`http://localhost:7000/api/plan/${params.id}`)
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
      {
        path: 'plan',
        element: <Plan />
      }

    ],
  },
]);

export default router;
