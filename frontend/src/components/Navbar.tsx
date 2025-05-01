import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X, ShoppingCart, Play, MessageSquareText, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import React from "react";

const Navbar = ({ onPreviewClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Chatbot", path: "/chatbot", icon: MessageSquareText },
  ];

  const protectedLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Start Saving", path: "/start-saving" },
    { name: "Business News", path: "/news", icon: Newspaper },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-1">
              <ShoppingCart className="h-5 w-5 text-blue-400" />
              <NavLink 
                to="/" 
                className="text-2xl font-bold text-blue-700 dark:text-blue-300"
                onClick={handleHomeClick}
              >
                SanghBuy
              </NavLink>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                link.name === "Home" ? (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={handleHomeClick}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                        isActive
                          ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40"
                          : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ) : link.name === "Features" ? (
                  <React.Fragment key={link.name}>
                    <Button
                      onClick={onPreviewClick}
                      variant="ghost"
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                    >
                      <Play className="w-4 h-4" />
                      <span>Preview</span>
                    </Button>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40"
                            : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </React.Fragment>
                ) : link.icon ? (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center gap-1 ${
                        isActive
                          ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40"
                          : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      }`
                    }
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </NavLink>
                ) : (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                        isActive
                          ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40"
                          : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                )
              ))}

              <SignedIn>
                {protectedLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                        isActive
                          ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40"
                          : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </SignedIn>

              <SignedOut>
                <NavLink
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  Sign In
                </NavLink>
                <Button asChild>
                  <NavLink to="/signup">Sign Up</NavLink>
                </Button>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-950"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={(e) => {
                    setIsOpen(false);
                    if (link.name === "Home") {
                      handleHomeClick();
                    }
                  }}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40"
                        : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <SignedIn>
                {protectedLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-base font-medium ${
                        isActive
                          ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40"
                          : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </SignedIn>

              <SignedOut>
                <NavLink
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Sign Up
                </NavLink>
              </SignedOut>

              <SignedIn>
                <div className="px-3 py-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;