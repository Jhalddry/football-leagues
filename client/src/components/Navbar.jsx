import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const capitalizedUsername = user?.username
    ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
    : '';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };
  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);
  return (
    <nav className="bg-zinc-700 my-3 flex flex-col lg:flex-row justify-between py-5 px-5 rounded-lg">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold mb-3 lg:mb-0 lg:mr-5">Practice Project</h1>
        {isAuthenticated && (
          <div ref={dropdownRef} className="relative" style={{ zIndex: 10 }}>
            <button
              className="bg-black text-white px-4 py-1 rounded-sm mb-3 lg:mb-0 lg:ml-4"
              onClick={toggleDropdown}
            >
              Leagues
            </button>
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-8 bg-zinc-700 p-2 rounded-md shadow-lg" style={{ zIndex: 10 }}>
                <li>
                  <Link to="/premier-league" className="block px-4 py-2 hover:bg-gray-800">
                    Premier League
                  </Link>
                </li>
                <li>
                  <Link to="/serie-a" className="block px-4 py-2 hover:bg-gray-800">
                    Serie A
                  </Link>
                </li>
                <li>
                  <Link to="/la-liga" className="block px-4 py-2 hover:bg-gray-800">
                    La Liga
                  </Link>
                </li>
                <li>
                  <Link to="/bundesliga" className="block px-4 py-2 hover:bg-gray-800">
                    Bundesliga
                  </Link>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
      <ul className="flex flex-col lg:flex-row gap-y-2 lg:gap-y-0 items-center">
        {isAuthenticated ? (
          <>
            <li className="text-lg px-4 font-bold">
              {" "}
              Welcome {capitalizedUsername}!
            </li>
            <li>
              <button
                className="bg-red-400 px-4 py-1 rounded-sm lg:mb-0"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-sky-500 px-4 py-1 rounded-md lg:mr-2">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="bg-sky-500 px-4 py-1 rounded-md lg:mr-2">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
export default Navbar;