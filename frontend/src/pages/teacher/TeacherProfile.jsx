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

  // Corrected: Removed full-screen classes from error/loading states
  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="p-6">
        <p className="text-white text-lg">Loading teacher profile...</p>
      </div>
    );
  }

  // Corrected: Removed background, min-h-screen, and padding from the root div
  return (
    <div className="text-white w-full">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        {/* Corrected: Removed fixed margin 'ml-20' for better flexibility */}
        <div className="flex flex-col sm:flex-row items-center mb-10">
          <img
            src={teacher.profilePicture || "https://via.placeholder.com/150"}
            alt={teacher.name}
            className="w-40 h-40 rounded-full border-2 border-blue-600 object-cover mr-0 sm:mr-8 mb-4 sm:mb-0"
          />
          <div>
            <h1 className="text-4xl font-bold">{teacher.name}</h1>
            <p className="text-white text-lg">{teacher.department || "Department of Computer Science"}</p>
          </div>
        </div>

        {/* Info Cards */}
        {/* Corrected: Removed fixed margin 'ml-20' */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black bg-opacity-30 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-400 mb-2">Email Address</h2>
            <p className="text-xl">{teacher.email}</p>
          </div>
          <div className="bg-black bg-opacity-30 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-400 mb-2">Teacher ID</h2>
            {/* Corrected: 'text-l' is not a valid Tailwind class, changed to 'text-xl' for consistency */}
            <p className="text-xl">{teacher._id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;