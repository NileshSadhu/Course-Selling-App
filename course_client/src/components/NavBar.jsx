import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";

const NavBar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className="flex items-center shadow-md py-5 justify-around">
      <div className="flex gap-6 items-center">
        <span className="font-semibold text-2xl">
          100
          <Link href="#" className="text-red-600">
            x
          </Link>
          Dev
        </span>
        <p className="hover:text-blue-500">Home</p>
        <p className="hover:text-blue-500">Course</p>
      </div>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="type to search"
          className="border border-gray-300 rounded px-4"
        />
        {isLoggedIn ? (
          <>
            <Link
              to="/profile"
              className="border border-gray-300 px-3 py-1 rounded"
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="border border-red-300 px-3 py-1 rounded text-red-500"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
            >
              login
            </Link>
            <Link
              to="/register"
              className="border-none text-white px-3 py-1 rounded bg-blue-500 hover:bg-blue-600"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
