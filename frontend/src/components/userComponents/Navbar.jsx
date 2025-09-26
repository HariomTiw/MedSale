import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import DarkModeSwitcher from "../../utils/DarkModeSwitcher";
import useLogout from "../../hooks/useLogout";
import useCart from "../../hooks/useCart";
import { useTheme } from "../../context/ThemeContext";
import useAuth from "../../hooks/useAuth";
import UserImageAccordion from "./UserImageAccordion";
import "./App.css";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("#home");
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { theme } = useTheme();
  const { logout, isLoading } = useLogout();
  const { state: authState } = useAuth();
  const isAuthenticated = authState.isAuthenticated;

  const { state: cartState } = useCart();
  const cartItemCount = cartState.items.length;

  const handleNavLinkClick = (href) => {
    setActiveLink(href);
    setIsNavOpen(false);
  };

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const navItems = [
    { href: "user/home", text: "Home" },
    { href: "user/product", text: "Product" },
    { href: "user/company", text: "Company" },
    { href: "user/contact", text: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setShowStickyNav(offset > 95);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <nav
        className={`${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 dark"
            : "bg-white/95 border-slate-200"
        } backdrop-blur-lg border-b shadow-sm transition-all duration-300 ${
          showStickyNav ? "fixed top-0 left-0 right-0 z-50 shadow-lg" : ""
        }`}
      >
        <div className="flex justify-between items-center mx-auto max-w-screen-xl px-6 py-4">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span
              className={`text-xl font-bold bg-gradient-to-r ${
                theme === "dark"
                  ? "from-teal-400 to-indigo-400"
                  : "from-teal-600 to-indigo-600"
              } bg-clip-text text-transparent`}
            >
              Vijaya Pharmaceuticals
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={`/${item.href}`}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-teal-500 to-indigo-500 text-white shadow-lg"
                      : theme === "dark"
                      ? "text-gray-200 hover:bg-gray-700/50 hover:text-white"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                {item.text}
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              to="/user/cart"
              className={`relative p-2 rounded-xl ${
                theme === "dark"
                  ? "text-gray-200 hover:bg-gray-700/50 hover:text-white"
                  : "text-slate-700 hover:bg-slate-100"
              } transition-all duration-300 group`}
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium shadow-lg animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Dark Mode Switcher */}
            <div className="hidden sm:block">
              <DarkModeSwitcher />
            </div>

            {/* User Authentication */}
            {isAuthenticated ? (
              <div className="hidden sm:block">
                <UserImageAccordion user={authState.user} />
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-500 text-white text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={handleToggleNav}
              className={`md:hidden p-2 rounded-xl ${
                theme === "dark"
                  ? "text-gray-200 hover:bg-gray-700/50 hover:text-white"
                  : "text-slate-700 hover:bg-slate-100"
              } transition-all duration-300`}
            >
              {isNavOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white/95 border-slate-200"
          } backdrop-blur-lg border-t transition-all duration-300 ${
            isNavOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={`/${item.href}`}
                onClick={() => handleNavLinkClick(item.href)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-teal-500 to-indigo-500 text-white shadow-lg"
                      : theme === "dark"
                      ? "text-gray-200 hover:bg-gray-700/50 hover:text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                {item.text}
              </NavLink>
            ))}

            {/* Mobile Dark Mode Switcher */}
            <div className="px-4 py-3">
              <DarkModeSwitcher />
            </div>

            {/* Mobile User Section */}
            {isAuthenticated ? (
              <>
                <div className="px-4 py-3">
                  <UserImageAccordion user={authState.user} />
                </div>
                <button
                  onClick={logout}
                  disabled={isLoading}
                  className="w-full flex items-center px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 text-sm font-medium"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {isLoading ? "Logging Out..." : "Logout"}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsNavOpen(false)}
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-500 text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
