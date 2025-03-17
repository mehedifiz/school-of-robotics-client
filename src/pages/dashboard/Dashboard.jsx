import { Outlet } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import DashboardSidebar from "./DashboardSidebar";

const Dashboard = () => {
   return (
      <div className="flex">
         <DashboardSidebar />
         <div className="w-full">
            <DashboardNav />
            <div className="p-8 max-w-7xl">
               <Outlet />
            </div>
         </div>

      </div>
   );
};

export default Dashboard;