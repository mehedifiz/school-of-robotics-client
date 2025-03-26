import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import useAuth from "@/Hooks/useAuth";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logoutUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Books', href: '/books' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Team', href: '/management' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 ease-in-out py-4 px-6 lg:px-8',
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/src/assets/home/logo-dark.png" alt="SRS Logo" className="h-11 w-auto" />
        </Link>
        
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.href}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <Button 
              onClick={logoutUser} 
              className="ml-4 bg-primary hover:bg-primary/90 text-white"
            >
              Logout
            </Button>
          ) : (
            <Button asChild className="ml-4 bg-primary hover:bg-primary/90 text-white">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </nav>
        
        <button 
          className="lg:hidden text-gray-700 relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn(
        "fixed inset-0 bg-white z-40 pt-24 transform transition-transform duration-300 ease-in-out lg:hidden",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="flex flex-col gap-4 bg-white px-6 pb-6">
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
          {user ? (
            <Button 
              onClick={() => {
                logoutUser();
                setMobileMenuOpen(false);
              }} 
              className="mt-4 bg-primary hover:bg-primary/90 text-white"
            >
              Logout
            </Button>
          ) : (
            <Button asChild className="mt-4 bg-primary hover:bg-primary/90 text-white">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Nav;