import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const capitalizedUsername = user?.username?.charAt(0).toUpperCase() + user?.username?.slice(1);

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to={
        isAuthenticated ? "/task" : "/"
      }>
        <h1 className="text-2xl font-bold">Practice Project</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li className="text-lg px-4 font-bold"> Welcome {capitalizedUsername}!</li>

            <li>
              <Link
                to="/login"
                className="bg-red-400 px-4 py-1 rounded-sm"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-sky-500 px-4 py-1 rounded-md">
                Login
              </Link>
            </li>

            <li>
              <Link to="/register" className="bg-sky-500 px-4 py-1 rounded-md"
              >
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
