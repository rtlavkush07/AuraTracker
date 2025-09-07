import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  FaUserGraduate,
  FaTachometerAlt,
  FaUserPlus,
  FaUserFriends,
  FaTrashAlt,
  FaBook,
  FaChalkboardTeacher,
} from "react-icons/fa";

import CourseSubjects from "./CourseSubjects";
import CourseSchedules from "./CourseSchedules";
import Assignment from "./Assignment";
import Leaderboard from "./Leaderboard";
import Profile from "./Profile";


import { useSelector } from "react-redux";
import axios from "axios";
import Notifications from "./Notifications";
import SetGoals from "./SetGoals";

const StudentDashboard = () => {
  const [name, setName] = useState("user");
  const { token } = useSelector((state) => state.auth);
 const navigate = useNavigate();
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
    <div className="flex w-full overflow-hidden" >
      <div
        className="absolute inset-0 flex bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white"
       
      >
        {/* Sidebar */}
         <aside className="w-1/5 text-white mt-12">
                  <div className="p-4 mt-10">
                    <h1 className="text-2xl font-bold">Student Dashboard</h1>
                  </div>
                  <hr />
                  <nav>
                    <ul>
                      <li>
                        <NavButton
                          label="👨‍🎓Profile"
                          onClick={() => navigate("profile")}
                          // icon={<FaTachometerAlt />}
                        />
                      </li>
                      
                       <li>
                        <NavButton
                          label="🏆Learderboard"
                          onClick={() => navigate("leaderboard")}
                          // icon={<FaBook />}
                        />
                      </li>
                       <li>
                        <NavButton
                          label="📅Schedules"
                          onClick={() => navigate("schedules")}
                          // icon={<FaUserPlus />}
                        />
                      </li>
                       <li>
                        <NavButton
                          label="📝Assignments"
                          onClick={() => navigate("assignments")}
                        //  icon={<FaChalkboardTeacher />}
        
                        />
                      </li>
                      <li>
                        <NavButton
                          label="📚Chapters"
                          onClick={() => navigate("subject")}
                          // icon={<FaUserPlus />}
                        />
                      </li>
                       <li>
                        <NavButton
                          label="🔔Important Notifications"
                          onClick={() => navigate("notifications")}
                          // icon={<FaUserPlus />}
                        />
                      </li>
                      <li>
                        <NavButton
                          label="🎯Gamification" // daily ye ye kaam krne hai 3 problem solve
                          onClick={() => navigate("setgoals")}
                          // icon={<FaUserPlus />}
                        />
                      </li>
                     
                     
                     
                     
                     
                     
                    </ul>
                  </nav>
                </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-black bg-opacity-20 overflow-y-auto">
          {/* Header
          <header className="flex justify-between items-center mb-3 mt-10 p-5">
            <h1 className="text-3xl font-semibold text-white">Hello, {name}!</h1>
          </header> */}



          {/* Right Section Based on Route */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3">
              <Routes>
                
                <Route path="subject/*" element={<CourseSubjects />} />
                <Route path="schedules" element={<CourseSchedules />} />
                <Route path="assignments" element={<Assignment />} />
                <Route path="profile" element={<Profile/>} />
                  <Route path="leaderboard" element={<Leaderboard />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path ="/setgoals" element = { <SetGoals/>}/>
           
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
// using for navigate the like add new course all student etc 
const NavButton = ({ label, onClick, icon }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center"
  >
    <span className="mr-2">{icon}</span>
    <span>{label}</span>
  </button>
);


export default StudentDashboard;
