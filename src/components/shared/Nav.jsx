import useAuth from "@/Hooks/useAuth";
import { useEffect, useState } from "react";
import { HiMenu, HiSearch, HiX } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import logoDark from "../../assets/home/logo-dark.png";
import logoLight from "../../assets/home/logo-light.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logoutUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white "
          : "bg-gradient-to-r from-gray-900 via-gray-500 to-teal-50"
      }`}
    >
      <div className=" mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center shadow-lg">
          <img
            src={isScrolled ? logoDark : logoLight}
            alt="Logo"
            className="h-8 transition-all duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex space-x-6 text-l text-sm font-sm">
            {["home", "about", "course", "contact", "dashboard"].map((link) => (
              <NavLink
                key={link}
                to={`/${link}`}
                className={({ isActive }) =>
                  `px-3 py-2 transition duration-300 ${
                    isActive
                      ? "text-white hover:text-teal-200 underline underline-offset-4"
                      : "text-teal-950 font-semibold "
                  }`
                }
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </NavLink>
            ))}
          </ul>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-48 pl-10 pr-4 py-1 border bg-teal-50 border-teal-400 rounded-full shadow-lg focus:ring-2 focus:ring-teal-500"
            />
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 w-5 h-5" />
          </div>

          {/* Auth Buttons */}
          {user ? (
            <button
              onClick={logoutUser}
              className="bg-[#00635A] hover:bg-[#004d40] text-white px-6 py-2 rounded-full shadow-lg  font-semibold transition duration-300 "
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className=" px-6 py-1  rounded-2xl bg-[#00635A] hover:bg-[#004d40] shadow-lg text-white font-semibold transition duration-300 hover:text-teal-50 "
            >
              Sign Up
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-3xl text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-teal-800 text-white flex flex-col p-6 shadow-lg transform transition-transform duration-300 lg:hidden">
          <button
            className="absolute top-5 right-5 text-2xl"
            onClick={() => setIsOpen(false)}
          >
            <HiX />
          </button>

          {/* Search Input for Mobile */}
          <div className="relative mt-10 mb-6">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-teal-300 rounded-full focus:ring-2 focus:ring-teal-500 text-gray-900"
            />
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 w-5 h-5" />
          </div>

          <ul className="flex flex-col space-y-4 text-lg font-medium">
            {["home", "about", "course", "contact", "dashboard"].map((link) => (
              <NavLink
                key={link}
                to={`/${link}`}
                className="py-2 transition duration-300 hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </NavLink>
            ))}
          </ul>

          {/* Auth Buttons */}
          {user ? (
            <button
              onClick={logoutUser}
              className="mt-6 bg-teal-700 px-6 py-2 rounded-full text-white font-semibold transition duration-300 hover:bg-teal-800"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="mt-6 bg-white px-6 py-2 rounded-full text-teal-700 font-semibold transition duration-300 hover:bg-teal-200"
            >
              Signup
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
