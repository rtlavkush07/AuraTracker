// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useSelector((state) => state.auth); // Get auth state from Redux

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login"); // Redirect to login if not authenticated
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data);
      } catch (err) {
        setError("Failed to fetch profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Profile
      </h2>
      {userDetails ? (
        <div>
          {/* Display Profile Picture */}
          {userDetails.profilePicture ? (
            <div className="flex justify-center mb-4">
              <img
                src={userDetails.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
              />
            </div>
          ) : (
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-400">
                <span className="text-gray-500">No Image</span>
              </div>
            </div>
          )}

          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700">Name:</h4>
            <p className="text-gray-600">{userDetails.name}</p>
          </div>
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700">Email:</h4>
            <p className="text-gray-600">{userDetails.email}</p>
          </div>
          {/* Add more fields as necessary */}
        </div>
      ) : (
        <div className="text-center text-gray-600">No user data available.</div>
      )}
    </div>
  );
};

export default Profile;
