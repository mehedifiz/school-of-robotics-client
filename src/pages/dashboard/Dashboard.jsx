import { Outlet } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import DashboardSidebar from "./DashboardSidebar";

const Dashboard = () => {
   return (
      <div className="flex">
         <div className="md:fixed">
            <DashboardSidebar />
         </div>
         <div className="md:ml-[255px] ml-8">
            <div className="fixed right-0 md:left-[255px] w-full md:w-auto">
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