import useAuth from "@/Hooks/useAuth";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardNav from "../components/shared/DashboardNav";
import DashboardSidebar from "../components/shared/DashboardSidebar";

const Dashboard = () => {
  const role = useAuth()?.user?.role;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      if (role === "student") {
        navigate("/dashboard/student-dashboard");
      } else if (role === "admin") {
        navigate("/dashboard/admin-dashboard");
      }
    }
  }, [role, navigate]);
  return (
    <div className="flex">
      <div className="lg:fixed">
        <DashboardSidebar />
      </div>
      <div className="lg:ml-[255px] w-full bg-white">
        <div className="fixed lg:max-w-[1280px] mx-auto px-8 right-0 lg:left-[255px] w-full lg:w-auto z-[99]">
          <DashboardNav />
        </div>
        <div className=" lg:max-w-[1280px] lg:pt-8 w-full mx-auto p-8 mt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
