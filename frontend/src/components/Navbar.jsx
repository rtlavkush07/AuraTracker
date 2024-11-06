import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

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
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-blue-500">
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/logo/logo.gif"
              style={{ width: "50px", height: "50px", marginRight: "8px" }}
              alt="Aura Tracker"
            />
            <span>Aura Tracker</span>
          </Link>
        </div>

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
              <Link
                to="/admin"
                className="block py-2 md:py-0 text-gray-700 hover:text-blue-500 transition duration-200"
              >
                Admin
              </Link>

              <Link to="/profile" className="block py-2 md:py-0">
                <img
                  src={user?.profilePicture || "../public/assets/default-profile.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-blue-500"
                />
              </Link>

              <button
                onClick={handleLogout}
                className="block py-2 md:py-1.5 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login button with dropdown */}
              <div className="relative inline-block text-left">
                <button
                  onClick={toggleDropdown}
                  className="block py-2 md:py-1.5 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Login
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <Link
                        to="/auth/login/student"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Student
                      </Link>
                      <Link
                        to="/auth/login/professor"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Professor
                      </Link>
                      <Link
                        to="/auth/login/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Admin
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/auth/signup">
                <button className="block py-2 md:py-1.5 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300">
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
