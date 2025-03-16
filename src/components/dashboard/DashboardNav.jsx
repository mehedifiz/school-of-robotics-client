// import React, { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import logo from "./../../assets/home/photo_08.jpeg"
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const DashboardNav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const role = "user";
  return (
    <div className="py-6 w-full">
      <div className="flex items-center justify-between ">
        <div className="hidden  w-full md:w-3/4 bg-[#F0F1F5] py-2 px-6 rounded-full sm:flex items-center gap-2 max-w-[600px]">
          <button className="text-[#434E55] hover:text-black text-xl duration-300 cursor-pointer ">
            <HiSearch />
          </button>
          <input
            type="text"
            className="outline-0 placeholder-[#CBCED3]"
            placeholder="Search  anything..."
          />
        </div>

        <div className="flex items-center justify-end w-full md:w-1/4 gap-5">
          <div className="flex items-center gap-8">
          <Link
              to="/dashboard/#"
              className="flex items-center gap-2 text-[#C5C5C5] hover:text-blue-600 duration-300"
            >
              <TfiEmail size={20} className="" />
            </Link>

            <Link
              to="/dashboard/#"
              className="flex items-center gap-2 text-[#C5C5C5] hover:text-blue-600 duration-300"
            >
              <IoNotificationsOutline size={24} className="" />
            </Link>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="relative z-[1] border-2 border-gray-100 max-w-11 max-h-11 rounded-full overflow-hidden focus:outline-none cursor-pointer flex items-center"
              >
                <img src={logo} alt="profile" className="w-10 h-10 rounded-full" />
                <IoMdArrowDropdown className="text-gray-600 ml-2" />
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard/logout"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
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
