import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import useAuth from "@/Hooks/useAuth";

const Nav = () => {
   const [isOpen, setIsOpen] = useState(false);
   const navigate = useNavigate();
   const { user, logoutUser } = useAuth();

   const handleLogout = () => {
      logoutUser();
      navigate('/login');
   };

   return (
      <nav className="border-b absolute top-0 z-20 w-full bg-slate-50 border-gray-200">
         <div className="max-w-7xl mx-auto p-4">
            <div className="flex justify-between items-center">
               {/* Logo */}
               <Link to="/" className="text-3xl text-primary font-bold">Logo</Link>

               {/* Mobile Menu Button */}
               <button
                  className="lg:hidden text-2xl"
                  onClick={() => setIsOpen(!isOpen)}
               >
                  {isOpen ? <HiX /> : <HiMenu />}
               </button>

               {/* Nav Links (Desktop) */}
               <ul className="hidden lg:flex space-x-6 font-light">
                  <NavLink to="/about" className="hover:text-primary">About</NavLink>
                  <NavLink to="/course" className="hover:text-primary">Course</NavLink>
                  <NavLink to="/contact" className="hover:text-primary">Contact</NavLink>
               </ul>

               {/* Auth Buttons (Desktop) */}
               <div className="hidden lg:flex space-x-4">
                  {user ? (
                     <>
                        <span className="text-gray-600">Welcome, {user?.name}</span>
                        <button 
                           onClick={handleLogout}
                           className="bg-red-500 px-4 py-2 rounded-full text-white text-sm font-semibold hover:bg-red-600"
                        >
                           Logout
                        </button>
                     </>
                  ) : (
                     <>
                        <Link
                           to="/login"
                           className="bg-primary px-4 py-2 rounded-full text-white text-sm font-semibold"
                        >
                           Login
                        </Link>
                        <Link
                           to="/register"
                           className="border border-primary px-4 py-2 rounded-full text-primary text-sm font-semibold"
                        >
                           Register
                        </Link>
                     </>
                  )}
               </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
               <ul className="lg:hidden flex flex-col items-center mt-4 space-y-4">
                  <NavLink to="/about" className="hover:text-primary" onClick={() => setIsOpen(false)}>About</NavLink>
                  <NavLink to="/course" className="hover:text-primary" onClick={() => setIsOpen(false)}>Course</NavLink>
                  <NavLink to="/contact" className="hover:text-primary" onClick={() => setIsOpen(false)}>Contact</NavLink>
                  {user ? (
                     <button 
                        onClick={() => {
                           handleLogout();
                           setIsOpen(false);
                        }}
                        className="bg-red-500 px-4 py-2 rounded-full text-white text-sm font-semibold"
                     >
                        Logout
                     </button>
                  ) : (
                     <>
                        <Link
                           to="/login"
                           className="bg-primary px-4 py-2 rounded-full text-white text-sm font-semibold"
                           onClick={() => setIsOpen(false)}
                        >
                           Login
                        </Link>
                        <Link
                           to="/register"
                           className="border border-primary px-4 py-2 rounded-full text-primary text-sm font-semibold"
                           onClick={() => setIsOpen(false)}
                        >
                           Register
                        </Link>
                     </>
                  )}
               </ul>
            )}
         </div>
      </nav>
   );
};

export default Nav;
