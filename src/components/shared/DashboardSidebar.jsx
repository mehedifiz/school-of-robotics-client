import logo from "@/assets/logo.png";
import useAuth from "@/Hooks/useAuth";
import { BookOpen } from "lucide-react";
import { useState } from "react";
import { BsCalendar4Week } from "react-icons/bs";
import { CiMenuBurger } from "react-icons/ci";
import { HiOutlineUsers } from "react-icons/hi";
import { HiOutlineArchiveBox, HiOutlineDocumentText } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import { SiApplenews, SiGoogletagmanager } from "react-icons/si";
import { AiOutlineFileAdd } from "react-icons/ai";
import { LiaUserLockSolid } from "react-icons/lia";
import { MdOutlineCloudDownload } from "react-icons/md";
import { PiSealQuestion, PiSquaresFourFill } from "react-icons/pi";
import { TbBrandAppleNews, TbBrandPlanetscale, TbTransactionPound, TbTransactionRupee } from "react-icons/tb";
import { VscClose } from "react-icons/vsc";
import { Link, NavLink } from "react-router-dom";

const DashboardSidebar = () => {
  const { user, logoutUser } = useAuth();
  const role = user?.role;
  console.log(role);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const linkStyles = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
      isActive ? "bg-primary/10 text-primary font-medium" : "text-gray-600 hover:bg-gray-100 hover:text-primary"
    }`;

  const handleMobileClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <div className="">
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border rounded-sm transition-colors cursor-pointer"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <VscClose size={24} /> : <CiMenuBurger size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          lg:relative lg:h-screen flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-100">
          <Link to="/" onClick={handleMobileClick}>
            <img
              src={logo}
              alt="Dashboard Logo"
              className="w-20 mx-auto"
              onError={(e) => {
                e.target.src = "/path/to/fallback-logo.png"; // Fallback image
              }}
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="flex flex-col gap-y-4 h-full">
            {/* admin navigation */}
            {role === "admin" && (
              <div className="space-y-3 grow">
                <li>
                  <NavLink to="/dashboard/admin-dashboard" className={linkStyles} onClick={handleMobileClick}>
                    <PiSquaresFourFill size={20} />
                    <span>Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allAdmins" className={linkStyles} onClick={handleMobileClick}>
                    <LiaUserLockSolid size={20} />
                    <span>All Admins</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-books" className={linkStyles} onClick={handleMobileClick}>
                    <BookOpen size={20} />
                    <span>Manage Books</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-chapters" className={linkStyles} onClick={handleMobileClick}>
                    <HiOutlineDocumentText size={20} />
                    <span>Manage Chapters</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-chapter-quizzes" className={linkStyles} onClick={handleMobileClick}>
                    <PiSealQuestion size={20} />
                    <span className="max-w-[165px]">Manage Chapters Quizzes</span>
                  </NavLink>
                </li>
                
                <li>
                  <NavLink to="/dashboard/managePlan" className={linkStyles} onClick={handleMobileClick}>
                    <SiGoogletagmanager size={20} />
                    <span className="max-w-[165px]">Manage Plan</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageNotice" className={linkStyles} onClick={handleMobileClick}>
                    <TbBrandAppleNews size={20} />
                    <span className="max-w-[165px]">Manage Notice</span>
                  </NavLink>
                </li>
              </div>
            )}

            {/* student navigation */}
            {role === "student" && (
              <div className="space-y-3 grow">
                <li>
                  <NavLink to="/dashboard/student-dashboard" className={linkStyles} onClick={handleMobileClick}>
                    <PiSquaresFourFill size={20} />
                    <span>Dashboard</span>
                  </NavLink>
                </li>
                
                <li>
                  <NavLink to="/dashboard/student-book" className={linkStyles} onClick={handleMobileClick}>
                    <BookOpen size={20} />
                    <span>My Books</span>
                  </NavLink>
                </li>
                
                
               
                <li>
                  <NavLink to="/dashboard/notice" className={linkStyles} onClick={handleMobileClick}>
                    <SiApplenews size={20} />
                    <span>Notice</span>
                  </NavLink>
                </li>
              </div>
            )}
            <div>
           
                {role === "student" && (
                   <div className="space-y-3 grow">
                       
                   <li>
                     <NavLink to="/dashboard/plan" className={linkStyles} onClick={handleMobileClick}>
                       <TbBrandPlanetscale size={20} />
                       <span>Plan</span>
                     </NavLink>
                   </li>
                  
                   <li>
                   <NavLink to="/dashboard/my-transactions" className={linkStyles} onClick={handleMobileClick}>
                     <TbTransactionPound size={20} />
                     <span>My Transactions</span>
                   </NavLink>
                 </li>
                 </div>

                )}
                {role === "admin" && (
                    <div className="space-y-3 grow">
                
                   <li>
                   <NavLink to="/dashboard/all-transactions" className={linkStyles} onClick={handleMobileClick}>
                     <TbTransactionPound size={20} />
                     <span>All Transactions</span>
                   </NavLink>
                 </li>
                 </div>

                )}
              <li className="mt-auto">
                <button
                  className="flex items-center p-2 mt-4 space-x-4 text-red-600 cursor-pointer bg-red-600/10 border border-red-500/30 rounded-md w-full"
                  onClick={() => {
                    logoutUser();
                    handleMobileClick();
                  }}
                >
                  <IoIosLogOut className="text-2xl" />
                  <span>Log Out</span>
                </button>
              </li>
            </div>
          </ul>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={toggleSidebar} aria-hidden="true" />}
    </div>
  );
};

export default DashboardSidebar;
