
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice"; // Import logout action

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth); // Get authentication state

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-blue-500">
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/logo.gif" // Assuming logo.gif is directly in the public directory
              style={{ width: "50px", height: "50px", marginRight: "8px" }} // Added margin for spacing
              alt="Aura Tracker"
            />
            <span>Aura Tracker</span>
          </Link>
        </div>
        <div className="space-x-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-500 transition duration-200"
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-500 transition duration-200"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-500 transition duration-200"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                  Login
                </button>
              </Link>
              <Link to="/auth/signup">
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
