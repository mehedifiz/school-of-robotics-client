import Dashboard from "@/layout/Dashboard";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Books from "@/pages/books/Books/Books";
import ManageBooks from "@/pages/dashboard/admin/ManageBooks/ManageBooks";
import DashboardHome from "@/pages/dashboard/common/DashboardHome/DashboardHome";
import EditProfile from "@/pages/dashboard/common/profile/EditProfile";
import Profile from "@/pages/dashboard/common/profile/Profile";
import StudentBooks from "@/pages/dashboard/student/studentBooks/StudentBooks";
import Management from "@/pages/management/Management";
import PrivateRoute from "@/routes/PrivateRoute";
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Pricing from "../pages/Pricing/Pricing";
import ContactUs from "../pages/contactUs/ContactUs";
import ErrorPage from "../pages/error/ErrorPage";
import Home from "../pages/home/Home";
import AllAdmin from "@/pages/dashboard/admin/ManageAllAdmin/AllAdmin";
import Plan from "@/pages/dashboard/student/plan/Plan";
import VerifyOTP from "@/pages/auth/VerifyOtp";
import BookDetails from "@/pages/books/BookDetails/BookDetails";
import ManageChapters from "@/pages/dashboard/admin/ManageChapters/ManageChapters";
import ManageChaptersQuiz from "@/pages/dashboard/admin/ManageChaptersQuiz/ManageChaptersQuiz";
import AddPlan from "@/pages/dashboard/admin/ManagePlan/AddPlan";
import ManagePlans from "@/pages/dashboard/admin/ManagePlan/ManagePlan";
import UpdatePlan from "@/pages/dashboard/admin/ManagePlan/UpdatePlan";
import ManageNotice from "@/pages/dashboard/admin/ManageNotice/ManageNotice";
import Notice from "@/pages/dashboard/student/notice/Notice";
import BookReading from "@/pages/dashboard/student/BookReading/BookReading";
import BookQuiz from "@/pages/dashboard/student/BookQuiz/BookQuiz";
import PaymentFailed from "@/pages/Payment/PaymentFailed";
import PaymentSuccess from "@/pages/Payment/PaymentSuccess";
import QuizDetails from "@/pages/dashboard/student/BookQuiz/QuizDetails";
import Checkout from "@/pages/Payment/Checkout";
import TransactionHistory from "@/pages/dashboard/student/TransactionHistory";
import Alltransactions from "@/pages/dashboard/admin/ManagePlan/Alltransactions";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import Statistics from "@/pages/dashboard/student/Statistics/Statistics";


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
        path: "/pricing",
        element: <Pricing></Pricing>,
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
      {
        path: "payment/failed",
        element: (
          <PrivateRoute>
            <PaymentFailed />
          </PrivateRoute>
        ),
      },
      {
        path: "payment/success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ), 
      },
      {
        path: "payment/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "reset-password",
        element: <ResetPassword />
      }
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
        path: 'managePlan',
        element: <ManagePlans />
      },
      {
        path: 'updatePlan/:id',
        element: <UpdatePlan />,
        loader: ({ params }) => fetch(`http://localhost:7000/api/plan/${params.id}`)
      },
      {
        path: 'manageNotice',
        element: <ManageNotice />
      },
      
      // student routes
      {
        path: "student-dashboard",
        element: <Statistics />,
      },
      {
        path: "student-book",
        element: <StudentBooks></StudentBooks>,
      },
      {
        path: "book-reading/:bookId/chapter/:chapterId",
        element: (
            <BookReading />
        ),
      },
      {
        path: "book-quiz/:bookId/chapter/:chapterId",
        element: (
            <BookQuiz />
        ),
      },
      {
        path: "quiz-details/:bookId/chapter/:chapterId/submission/:submissionId",
        element: (
            <QuizDetails />
        ),
      },
      {
        path: 'plan',
        element: <Plan />
      },
      {
        path: 'notice',
        element: <Notice/>
      },
      
      {
        path: 'my-transactions',
        element: <TransactionHistory />
      },
       
      {
        path: 'all-transactions',
        element: <Alltransactions />
      },

    ],
  },
]);

export default router;
