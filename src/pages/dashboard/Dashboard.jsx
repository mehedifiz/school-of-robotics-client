import useAuth from "@/Hooks/useAuth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import DashboardSidebar from "./DashboardSidebar";

const Dashboard = () => {
  const role = useAuth()?.user?.role;
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "student") {
      navigate("/dashboard/student-dashboard");
    } else if (role === "admin") {
      navigate("/dashboard/admin-dashboard");
    }
  }, [role, navigate]);
  return (
    <div className="flex">
      <div className="md:fixed">
        <DashboardSidebar />
      </div>
      <div className="md:ml-[255px] w-full">
        <div className="fixed md:max-w-7xl mx-auto px-8 right-0 md:left-[255px] w-full md:w-auto">
          <DashboardNav />
        </div>
        <div className=" md:max-w-7xl md:pt-8 w-full mx-auto p-8 mt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
