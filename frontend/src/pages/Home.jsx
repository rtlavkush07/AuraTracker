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
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700">Name:</h4>
            <p className="text-gray-600">{userDetails.name}</p>
          </div>
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700">Email:</h4>
            <p className="text-gray-600">{userDetails.email}</p>
          </div>
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700">Year:</h4>
            <p className="text-gray-600">{userDetails.year}</p>
          </div>
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700">Course:</h4>
            <p className="text-gray-600">{userDetails.course}</p>
          </div>
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-gray-700">Reg No:</h4>
            <p className="text-gray-600">{userDetails.regNo}</p>
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
