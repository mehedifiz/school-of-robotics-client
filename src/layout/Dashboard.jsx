import DashboardNav from "@/components/dashboard/DashboardNav";
import UserSidebar from "@/components/dashboard/UserSidebar";
import { useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { Outlet } from "react-router-dom";



const Dashboard = () => {
  const [sideBar, setSideBar] = useState(false)
  const role = "user";
  return (
    <div>
      <div>
        <div className="flex bg-white min-h-screen">
          <div
            className={`hidden lg:block ${
              role === "admin" ? "min-w-[250px]" : "min-w-[150px]"
            }`}
          ></div>

          {/* Sidebar for larger screens */}
          <div
            className={`hidden fixed lg:block z-50 bg-gray-100 ${
              role === "admin" ? "min-w-[250px]" : "min-w-[150px]"
            }`}
          >
            {role === "user" && <UserSidebar />}
          </div>

         {/* Mobile Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 bg-gray-100 z-50 transition-transform duration-500 transform ${
            sideBar ? "translate-x-0" : "-translate-x-full"
          } lg:hidden min-w-[180px] p-5 shadow-md`}
        >
          <button
            className="absolute top-5 right-5 text-2xl"
            onClick={() => setSideBar(false)}
          >
            <IoMdClose />
          </button>
          {role === "user" && <UserSidebar />}
        </div>

        {/* Overlay when sidebar is open */}
        {sideBar && (
          <div
            className="fixed inset-0 bg-black opacity-40 z-40 lg:hidden"
            onClick={() => setSideBar(false)}
          ></div>
        )}

          {/* Main content area */}
          <div className="flex-grow w-full bg-white">
            <div className="w-full shadow-md">
            <div className="max-w-7xl mx-auto px-6 sticky top-0 left-0 right-0 min-h-[100px] flex items-center gap-x-8">
              {/* Menu button for mobile */}
              <button
                className="lg:hidden text-2xl"
                onClick={() => setSideBar(true)}
              >
                <IoMdMenu />
              </button>
              <DashboardNav />
            </div>
            </div>
            <div className="px-6 sm:px-14">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
