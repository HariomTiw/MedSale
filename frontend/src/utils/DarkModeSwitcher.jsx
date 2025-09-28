import React from "react";
import { useTheme } from "../context/ThemeContext";

const DarkModeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  const darkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );

  const lightIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );

  return (
    <button
      className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-all duration-300 group"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <div
        id="switch-toggle"
        className={`w-5 h-5 transition duration-500 transform group-hover:scale-110 ${
          theme === "dark" ? "text-indigo-500" : "text-teal-500"
        }`}
      >
        {theme === "dark" ? darkIcon : lightIcon}
      </div>
    </button>
  );
};

export default DarkModeSwitcher;
