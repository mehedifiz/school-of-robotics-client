import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink, Link, useLocation } from "react-router-dom";
import useAuth from "@/Hooks/useAuth";
import { FaRegUser } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineLogout } from "react-icons/ai";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logoutUser } = useAuth();
  const { pathname } = useLocation();
  const profileMenuRef = useRef(null);
  const profileButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

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
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Books", href: "/books" },
    { name: "Pricing", href: "/pricing" },
    { name: "Team", href: "/management" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out py-4 px-6 lg:px-8",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : pathname === "/books" ? "bg-white" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/src/assets/home/logo-dark.png" alt="SRS Logo" className="h-11 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {item.name}
            </NavLink>
          ))}

          {/* User Profile Dropdown */}
          {!user && (
            <Button asChild className="ml-4 bg-primary hover:bg-primary/90 text-white">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </nav>

        <div className="flex items-center gap-6">
          {user ? (
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
                <Link to="/dashboard" className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-4">
                  <RxDashboard />
                  <span>Dashboard</span>
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
          ) : (
            <Button asChild className="ml-4 bg-primary hover:bg-primary/90 text-white">
              <Link to="/login">Login</Link>
            </Button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button className="lg:hidden text-gray-700 relative z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 pt-24 transform transition-transform duration-300 ease-in-out lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col gap-4 bg-white px-6 pb-6 relative">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="py-3 text-lg font-medium text-gray-700 hover:text-primary border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Nav;