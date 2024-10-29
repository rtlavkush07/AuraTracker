import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"; // Import axios
import { logout } from "../features/authSlice"; // Import logout action

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth); // Get authentication state including token
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track dropdown visibility
  const [user, setUser] = useState(null); // State to store user profile

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Assuming response.data contains user profile
        if (response.data && response.data.userProfile) {
          setUser(response.data.userProfile);
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    if (isAuthenticated) {
      fetchProfileData();
    }
  }, [isAuthenticated, token]);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };

  // Toggle menu visibility on small screens
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <div className="text-2xl font-bold text-blue-500">
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/logo/logo.gif" // Assuming logo.gif is in the public/logo directory
              style={{ width: "50px", height: "50px", marginRight: "8px" }}
              alt="Aura Tracker"
            />
            <span>Aura Tracker</span>
          </Link>
        </div>

        {/* Toggle Button for Small Screens */}
        <button
          onClick={toggleMenu}
          className="block md:hidden text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Menu Items */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:space-x-4 absolute md:relative bg-white w-full md:w-auto top-16 md:top-0 left-0 md:left-auto md:items-center p-4 md:p-0 shadow-md md:shadow-none`}
        >
          <Link
            to="/"
            className="block py-2 md:py-0 text-gray-700 hover:text-blue-500 transition duration-200"
          >
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="block py-2 md:py-0 text-gray-700 hover:text-blue-500 transition duration-200"
              >
                Dashboard
              </Link>
              <Link
                to="/store"
                className="block py-2 md:py-0 text-gray-700 hover:text-blue-500 transition duration-200"
              >
                Store
              </Link>

              {/* Profile Icon with Image */}
              <Link to="/profile" className="block py-2 md:py-0">
                <img
                  src={user?.profilePicture || "../public/assets/default-profile.png"} // Fallback if no profile picture
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-blue-500"
                />
              </Link>

              <button
                onClick={handleLogout}
                className="block py-2 md:py-0 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login">
                <button className="block py-2 md:py-0 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                  Login
                </button>
              </Link>
              <Link to="/auth/signup">
                <button className="block py-2 md:py-0 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300">
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
