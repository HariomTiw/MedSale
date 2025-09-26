import React, { useState } from "react";
import { ChevronDown, User, LogOut, Settings } from "lucide-react";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const UserImageAccordion = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, isLoading } = useLogout();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".user-dropdown")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  if (!user) {
    return null; // Don't render anything if no user is provided
  }

  const { fullName, avatar } = user;

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/user/profile");
    setIsOpen(false);
  };

  const handleSettingsClick = () => {
    navigate("/user/settings");
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".user-dropdown")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative user-dropdown">
      {/* User Avatar Button */}
      <button
        className="flex items-center focus:outline-none group"
        onClick={toggleAccordion}
      >
        <div className="relative">
          {/* Avatar with gradient border */}
          <div className="w-10 h-10 p-0.5 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full">
            <div className="w-full h-full overflow-hidden rounded-full bg-white">
              <img
                src={avatar}
                alt={fullName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Online status indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        </div>

        {/* Chevron with smooth animation */}
        <ChevronDown
          className={`ml-2 w-4 h-4 text-slate-600 transition-all duration-300 group-hover:text-teal-600 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-3 w-64 bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden border border-white/20 transition-all duration-300 transform origin-top-right z-50 ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        {/* User Info Header */}
        <div className="bg-gradient-to-r from-teal-500 to-indigo-500 p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 p-0.5 bg-white/20 rounded-full">
              <div className="w-full h-full overflow-hidden rounded-full bg-white">
                <img
                  src={avatar}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-white font-semibold text-sm">{fullName}</p>
              <p className="text-teal-100 text-xs">Healthcare Professional</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          {/* Profile Link */}
          <button
            onClick={handleProfileClick}
            className="w-full flex items-center px-4 py-3 text-slate-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-indigo-50 hover:text-teal-700 transition-all duration-200 group"
          >
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-teal-100 transition-colors duration-200">
              <User className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium">My Profile</div>
              <div className="text-xs text-slate-500">
                View and edit profile
              </div>
            </div>
          </button>

          {/* Settings Link */}
          <button
            onClick={handleSettingsClick}
            className="w-full flex items-center px-4 py-3 text-slate-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-indigo-50 hover:text-teal-700 transition-all duration-200 group"
          >
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-teal-100 transition-colors duration-200">
              <Settings className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium">Settings</div>
              <div className="text-xs text-slate-500">Account preferences</div>
            </div>
          </button>

          {/* Divider */}
          <div className="my-2 mx-4 border-t border-slate-200"></div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className={`w-full flex items-center px-4 py-3 transition-all duration-200 group ${
              isLoading
                ? "text-slate-400 cursor-not-allowed"
                : "text-red-600 hover:bg-red-50 hover:text-red-700"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-colors duration-200 ${
                isLoading ? "bg-slate-100" : "bg-red-100 group-hover:bg-red-200"
              }`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <LogOut className="w-4 h-4" />
              )}
            </div>
            <div className="text-left">
              <div className="text-sm font-medium">
                {isLoading ? "Logging Out..." : "Sign Out"}
              </div>
              <div className="text-xs text-slate-500">
                {isLoading ? "Please wait..." : "Sign out of your account"}
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
          <div className="text-xs text-slate-500 text-center">
            Vijaya Pharmaceuticals • Your Health, Our Priority
          </div>
        </div>
      </div>

      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

UserImageAccordion.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
};

export default UserImageAccordion;
