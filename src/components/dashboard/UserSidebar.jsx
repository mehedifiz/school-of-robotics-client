import { Link, NavLink } from "react-router-dom";
import logo from "./../../assets/images/logo-footer.png";
import { PiSquaresFourFill } from "react-icons/pi";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi";
import { BsCalendar4Week } from "react-icons/bs";
import { MdOutlineCloudDownload } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

const UserSidebar = () => {
  return (
    <div className="dashboard-side-nav pt-5 min-h-screen flex flex-col items-center gap-y-5 rounded-r-xl my-20">
      <Link to="/">
        <img src={logo} className="max-w-20 mx-auto" alt="Logo" />
      </Link>
      
{/* <div className="flex items-center  gap-x-1 bg-[#1294F2] rounded-lg py-2  mx-10">
      <PiSquaresFourFill size={20} className="text-white"/> <p className="text-[16px] font-semibold text-white">Dashboard</p>
      </div> */}
      <ul className="space-y-2">       
        <li>
          <NavLink
            to="/dashboard/user-dashboard"
            className="block py-3 pl-3 m-2 pr-8 rounded-xl text-[#8A8E95] hover:text-[#1294F2] duration-300"
          >
            <span className="flex items-center gap-x-2 "><PiSquaresFourFill className="size-5" /> <span className="text-[16px]">Dashboard</span></span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/"
            className="block p-3 m-2  rounded-xl text-[#8A8E95] hover:text-[#1294F2] duration-300"
          >
            <span className="flex items-center gap-x-2 "><HiOutlineArchiveBox className="size-5" /> <span className="text-[16px]">Classes</span></span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/"
            className="block p-3 m-2  rounded-xl text-[#8A8E95] hover:text-[#1294F2] duration-300"
          >
            <span className="flex items-center gap-x-2 "><HiOutlineUsers className="size-5" /> <span className="text-[16px]">Groups</span></span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/"
            className="block p-3 m-2  rounded-xl text-[#8A8E95] hover:text-[#1294F2] duration-300"
          >
            <span className="flex items-center gap-x-2 "><BsCalendar4Week className="size-5" /> <span className="text-[16px]">Groups</span></span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/"
            className="block p-3 m-2  rounded-xl text-[#8A8E95] hover:text-[#1294F2] duration-300"
          >
            <span className="flex items-center gap-x-2 "><MdOutlineCloudDownload className="size-5" /> <span className="text-[16px]">Groups</span></span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/#"
            className="block p-3 m-2  rounded-xl text-[#8A8E95] hover:text-[#1294F2] duration-300"
          >
            <span className="flex items-center gap-x-2 "><IoIosLogOut className="size-5" /> <span className="text-[16px]">Log Out</span></span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
