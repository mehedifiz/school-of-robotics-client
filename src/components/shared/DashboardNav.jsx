import useAuth from "@/Hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { Link } from "react-router-dom";

const DashboardNav = () => {
  const { logoutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="py-6 w-full bg-white ">
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

            <Link to="/dashboard/manageNotice" className="flex items-center gap-2 text-[#C5C5C5] hover:text-blue-600 duration-300">
              <IoNotificationsOutline size={24} className="" />
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="relative z-[1] border-2 border-gray-100 max-w-11 max-h-11 rounded-full overflow-hidden focus:outline-none cursor-pointer flex items-center"
                aria-label="User menu"
                aria-expanded={dropdownOpen}
              >
                <img src="https://iili.io/2pLtKmJ.jpg" alt="profile" className="w-10 h-10 rounded-full object-cover" />
                <IoMdArrowDropdown className="text-gray-600 ml-2" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                  <Link to="/dashboard/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link to="/dashboard/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Settings
                  </Link>
                  <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logoutUser();
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
