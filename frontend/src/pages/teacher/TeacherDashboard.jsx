import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";  // Make sure FontAwesome is imported
import AddAssignment from "./AddAssignment";
import AddSubjectData from "./AddSubjectData";

const TeacherDashboard = () => {
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
      }
    };

    fetchTeacherProfile();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="w-74 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
          {teacher ? (
            <p className="mt-2 text-gray-300 font-bold text-lg text-center">{teacher.name}</p>
          ) : error ? (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          ) : (
            <p className="text-gray-400 text-sm mt-2">Loading...</p>
          )}
        </div>
        <nav>
          <ul className="m-4 space-y-2">
            <li>
              <Link
                to="manageassignment"
                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <i className="fas fa-tasks mr-2"></i> Manage Assignments
              </Link>
            </li>
            <li>
              <Link
                to="managestudymaterial"
                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <i className="fas fa-book mr-2"></i> Manage Study Materials
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<AddSubjectData />} />
          <Route path="manageassignment" element={<AddAssignment />} />
          <Route path="managestudymaterial" element={<AddSubjectData />} />
        </Routes>
      </main>
    </div>
  );
};

export default TeacherDashboard;
