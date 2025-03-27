import useAuth from "@/Hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineLogout } from "react-icons/ai";

const DashboardNav = () => {
  const { logoutUser } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const profileButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        profileButtonRef.current &&
        !profileMenuRef.current.contains(event.target) &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="py-6 w-full bg-white">
      <div className="flex items-center justify-between ">
        <div className="hidden md:flex w-full md:w-3/4 bg-slate-50 px-6 rounded-full items-center gap-2 max-w-[600px] border">
          <button className="text-[#434E55] hover:text-black text-xl duration-300 cursor-pointer ">
            <HiSearch />
          </button>
          <input type="text" className="outline-0 placeholder-[#CBCED3] py-2.5 w-full bg-transparent" placeholder="Search anything..." />
        </div>

        <div className="flex items-center justify-end w-full md:w-1/4 gap-5">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-2 text-[#C5C5C5] hover:text-blue-600 duration-300">
              <TfiEmail size={20} className="" />
            </Link>

            <Link to="/dashboard" className="flex items-center gap-2 text-[#C5C5C5] hover:text-blue-600 duration-300">
              <IoNotificationsOutline size={24} className="" />
            </Link>
            <div className="relative">
              <button
                ref={profileButtonRef}
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-2 py-2 rounded-full"
              >
                <User size={20} className="text-gray-600" />
              </button>
              <div
                ref={profileMenuRef}
                className={`absolute right-8 mt-4 w-48 bg-white border border-gray-300 rounded-lg p-3 ${profileMenuOpen ? 'scale-100' : 'scale-0'} transform origin-top-right transition-transform duration-500 ease-in-out`}
              >
                <Link to="/profile" className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-4">
                  <FaRegUser />
                  <span>Profile</span>
                </Link>
                <Link to="/dashboard/setting" className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-4">
                  <IoSettingsOutline />
                  <span>Setting</span>
                </Link>
                <button
                  onClick={() => {
                    logoutUser();
                    setProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-4"
                >
                  <AiOutlineLogout />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;