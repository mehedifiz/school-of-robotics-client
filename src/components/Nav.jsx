import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // Importing icons for the menu toggle

const Nav = () => {
   const [isOpen, setIsOpen] = useState(false);

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

               {/* Register Button (Desktop) */}
               <Link
                  to="/register"
                  className="hidden lg:inline-block bg-primary px-4 py-2 rounded-full text-white text-sm font-semibold"
               >
                  Create an Account
               </Link>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
               <ul className="lg:hidden flex flex-col items-center mt-4 space-y-4">
                  <NavLink to="/about" className="hover:text-primary" onClick={() => setIsOpen(false)}>About</NavLink>
                  <NavLink to="/course" className="hover:text-primary" onClick={() => setIsOpen(false)}>Course</NavLink>
                  <NavLink to="/contact" className="hover:text-primary" onClick={() => setIsOpen(false)}>Contact</NavLink>
                  <Link
                     to="/register"
                     className="bg-primary px-4 py-2 rounded-full text-white text-sm font-semibold"
                     onClick={() => setIsOpen(false)}
                  >
                     Create an Account
                  </Link>
               </ul>
            )}
         </div>
      </nav>
   );
};

export default Nav;
