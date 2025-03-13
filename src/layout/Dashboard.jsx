import DashboardNav from "@/components/dashboard/DashboardNav";
import UserSidebar from "@/components/dashboard/UserSidebar";
import { Outlet } from "react-router-dom";


const Dashboard = () => {

    const role = 'user'
    return (
        <div>
           <div>
      <div className="flex bg-[#E5E5E5] min-h-screen">
        <div className={`hidden lg:block ${role === "admin" ? "min-w-[250px]" : "min-w-[150px]"}`}></div>

        {/* Sidebar for larger screens */}
        <div className={`hidden fixed lg:block bg-white ${role === "admin" ? "min-w-[250px]" : "min-w-[150px]"}`}>
          {role === "user" && <UserSidebar />}
        </div>

        {/* Main content area */}
        <div className="flex-grow max-w-[1320px] mx-auto">
          <div className="bg-[#FAFAFC] px-6 sm:px-14 sticky z-20 top-0 left-0 right-0 min-h-[100px]">
            <DashboardNav />
          </div>
          <div className="px-6 sm:px-14">
            <Outlet />
          </div>
        </div>
      </div>

     

      {/* Overlay for small screens */}
      {/* {sidebar && <div className="fixed inset-0 bg-primary/10 bg-opacity-50 z-20 md:hidden" onClick={() => setSidebar(false)}></div>} */}
    </div> 
        </div>
    );
};

export default Dashboard;