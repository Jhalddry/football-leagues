import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/solid";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) =>!prevState);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) =>!prevState);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current &&!dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  const closeSidebar = (e) => {
    if (e.target === e.currentTarget) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    document.addEventListener("mousedown", closeSidebar);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
      document.removeEventListener("mousedown", closeSidebar);
    };
  }, []);

  return (
    <nav className="bg-gray-800 py-5 px-5 rounded-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Football App</h1>
        <div className="flex items-center gap-x-4">
          {isAuthenticated && (
            <button
              className="text-white text-lg font-semibold hover:underline"
              onClick={toggleSidebar}
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          )}
          <Link
            to="/"
            className="text-white text-lg font-semibold hover:underline"
          >
            Home
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to="/profile"
                className="text-white text-lg font-semibold hover:underline"
              >
                Profile
              </Link>
              <button
                className="text-white text-lg font-semibold hover:underline"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                className="text-white text-lg font-semibold hover:underline"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white text-lg font-semibold hover:underline"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      {isAuthenticated && (
        <div
          className={`absolute top-0 left-0 w-64 h-full bg-gray-800 p-5 pt-16 transition-transform duration-300 transform ${
            isSidebarOpen? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={closeSidebar}
        >
          <button
            className="absolute top-0 right-0 mt-5 mr-5 text-white text-lg font-semibold hover:underline"
            onClick={toggleSidebar}
          >
            <XIcon className="h-6 w-6" />
          </button>
          <div className="mt-10">
            <Link
              to="/premier-league"
              className="block px-4 py-2 hover:bg-gray-700"
            >
Premier League
            </Link>
            <Link
              to="/serie-a"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Serie A
            </Link>
            <Link
              to="/la-liga"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              La Liga
            </Link>
            <Link
              to="/bundesliga"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Bundesliga
            </Link>
          </div>
          <Link
            to="/games"
            className="block px-4 py-2 hover:bg-gray-700 mt-10"
          >
            Games
          </Link>
        </div>
      )}
      {isAuthenticated && (
        <div
          className={`absolute top-0 left-0 w-64 h-full bg-gray-800 p-5 pt-16 transition-transform duration-300 transform ${
            isDropdownOpen? "translate-x-0" : "-translate-x-full"
          }`}
          ref={dropdownRef}
        >
          <button
            className="absolute top-0 right-0 mt-5 mr-5 text-white text-lg font-semibold hover:underline"
            onClick={toggleDropdown}
          >
            <XIcon className="h-6 w-6" />
          </button>
          <div className="mt-10">
            <Link
              to="/premier-league"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Premier League
            </Link>
            <Link
              to="/serie-a"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Serie A
            </Link>
            <Link
              to="/la-liga"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              La Liga
            </Link>
            <Link
              to="/bundesliga"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Bundesliga
            </Link>
          </div>
          <Link
            to="/games"
            className="block px-4 py-2 hover:bg-gray-700 mt-10"
          >
            Games
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;