import React, { useEffect, useState } from "react";
import {

  Routes,
  Route,
  Link,

} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import CourseSubjects from "./CourseSubjects";
import CourseSchedules from "./CourseSchedules"
import Assignment from "./Assignment"
import { useSelector } from "react-redux";
import axios from "axios";




const StudentDashboard = () => {
  // Sample student data (could be fetched from backend)
  const [name, setName] = useState("user")
  const { token } = useSelector((state) => state.auth);


  useEffect(() => {


    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(response.data.name);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };
    fetchProfileData();
  }, [token]);


  return (
    <div className="flex h-screen bg-gray-900 text-white"
    >
      {/* Sidebar */}
      <aside className="w-1/5 bg-black p-4 border-r border-green-600 flex flex-col">
        <div className="text-2xl font-bold text-green-500 mb-8">
          STUDENT DASHBOARD
        </div>
        <nav className="flex flex-col gap-4">
          <Link
            to=""
            className="text-left text-white flex items-center gap-3 py-2 px-4 hover:bg-green-700 rounded"
          >
            <i className="fas fa-calendar-alt"></i> Schedule
          </Link>
          <Link
            to="assignments"
            className="text-left text-white flex items-center gap-3 py-2 px-4 hover:bg-green-700 rounded"
          >
            <i className="fas fa-tasks"></i> Assignment
          </Link>
          <Link
            to="subject"
            className="text-left text-white flex items-center gap-3 py-2 px-4 hover:bg-green-700 rounded"
          >
            <i className="fas fa-book"></i> Subjects
          </Link>
        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Hello, {name}!</h1>
          {/* <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
          </div> */}
        </header>

        {/* Right Section Based on Route */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3">
            <Routes>
              <Route path="subject/*" element={<CourseSubjects />} />
              <Route path="" element={<CourseSchedules />} />
              <Route path="assignments" element={<Assignment />} />

            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
