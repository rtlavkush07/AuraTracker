import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      try {
        const response = await axios.get("/api/user/teacher/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTeacher(response.data);
      } catch (err) {
        setError("Error fetching teacher profile. Please try again later.");
        console.error("Fetch Error:", err);
      }
    };

    fetchTeacherProfile();
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-black bg-opacity-80 rounded-2xl">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="p-4 bg-black bg-opacity-80 rounded-2xl">
        <p className="text-white text-lg">Loading teacher profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-black bg-opacity-80 rounded-2xl p-6">
      <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">
        Teacher Profile
      </h2>

      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <img
          src={teacher.profilePicture || "https://via.placeholder.com/150"}
          alt={teacher.name}
          className="w-32 h-32 rounded-full border-2 border-blue-600 object-cover mr-0 sm:mr-6 mb-4 sm:mb-0"
        />
        <div>
          <h1 className="text-2xl font-bold text-white">{teacher.name}</h1>
          <p className="text-gray-300 text-lg">
            {teacher.department || "Department of Computer Science"}
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-400 mb-1">Email Address</h2>
          <p className="text-white text-lg">{teacher.email}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-400 mb-1">Teacher ID</h2>
          <p className="text-white text-lg">{teacher._id}</p>
        </div>
      </div>

      {/* Optional: Add more info cards here if needed */}
    </div>
  );
};

export default TeacherProfile;
