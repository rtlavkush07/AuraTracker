import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AddAssignment from "./AddAssignment";
import AddSubjectData from "./AddSubjectData";
import TeacherProfile from "./TeacherProfile";

// Reusable NavButton
const NavButton = ({ label, onClick, icon }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center"
  >
    <span className="mr-2">{icon}</span>
    <span>{label}</span>
  </button>
);

const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      try {
        const response = await axios.get("/api/user/teacher/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTeacher(response.data);
      } catch (err) {
        setError("Error fetching teacher profile. Please try again later.");
      }
    };

    fetchTeacherProfile();
  }, []);

  return (
    // <div className="flex w-full overflow-hidden h-screen">
    <div className="flex w-full overflow-scroll "
    style={{height: '90vh', overflowY: 'scroll'}}>
      {/* Background Gradient */}
      <div className="absolute inset-0 flex bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white"></div>

      {/* Sidebar */}
      <aside className="w-1/5 text-white mt-1 relative z-10 h-screen overflow-y-auto">
        <div className="p-4 mt-10">
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
          {teacher && (
           <>
           
            <p className="mt-2 text-sm text-gray-200">
              Welcome, <span className="font-semibold">{teacher.name}</span>
            </p>
             <p className="mt-2 text-sm text-gray-200">
              Email:- <span className="font-semibold">{teacher.email}</span>
            </p>
           </>
            
          )}
          {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}


        </div>
<hr />
        <nav>
          <ul>
            {/* <li>
              <NavButton label="📝 Profile" onClick={() => navigate("profile")} />
            </li> */}
            <li>
              <NavButton label="📝 Manage Assignments" onClick={() => navigate("manageassignment")} />
            </li>
            <li>
              <NavButton label="📚 Manage Study Materials" onClick={() => navigate("managestudymaterial")} />
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-black bg-opacity-20 overflow-auto relative z-10">
        <Routes>
          <Route path="/" element={<AddSubjectData />} />
          <Route path="manageassignment" element={<AddAssignment />} />
          <Route path="managestudymaterial" element={<AddSubjectData />} />
          {/* <Route path="profile" element={<TeacherProfile />} /> */}
        </Routes>
      </main>
    </div>
  );
};

export default TeacherDashboard;
