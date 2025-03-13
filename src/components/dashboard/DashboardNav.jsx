// import React, { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";

const DashboardNav = () => {
  const role = "user";
//   const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="py-6">
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
            //   onClick={() => setIsOpen(!isOpen)}
              className="relative z-[1] max-w-11 max-h-11 rounded-full overflow-hidden focus:outline-none cursor-pointer"
            >
             profile
            </button>
          </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
