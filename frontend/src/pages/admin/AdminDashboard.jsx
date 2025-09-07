import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
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


// Import all necessary components
import AddTeacher from "./AddTeacher";
import AddCourse from "./AddCourse";
import AllTeachers from "./AllTeachers";
import AllCourses from "./AllCourses";
import AllStudent from "./AllStudent";
import AddSubject from "./AddSubject";
import TeacherManagement from "./TeacherManagement";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [studentsRes, teachersRes, coursesRes] = await Promise.all([
          axios.get("/api/student/getAllStudents"),
          axios.get("/api/admin/getAllTeacher"),
          axios.get("/api/admin/getAllCourse"),
        ]);

        setStudents(studentsRes.data);
        setTeachers(teachersRes.data);
        setCourses(coursesRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchAllData();
  }, []);





  const DashboardHome = () => (
    <main className="flex-1 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl mt-12 font-bold text-white">Dashboard</h1>
      </div>
      <div className="grid grid-cols-3 gap-6 mb-6 ">
        {/* number of student  */}
        <StatsCard

          icon={<FaUserGraduate />}
          title="Students"

          count={students.length}


        />
        {/* number of teachers   */}
        <StatsCard
          icon={<FaUserFriends />}
          title="Teachers"
          count={teachers.length}

        />
        {/* number of courses   */}
        <StatsCard
          icon={<FaBook />}
          title="Courses"
          count={courses.length}

        />
      </div>

    </main>
  );

  const StatsCard = ({ icon, title, count, color }) => (
    <div
      className={`bg-black bg-opacity-40 border border-white p-4 text-white rounded shadow flex items-center space-x-4 `}
    >

      <div>
        <div className="flex ">
          <div className="p-2"> {icon}</div>
          <div><h3 className="text-lg font-semibold">   {title}</h3></div>
        </div>
        <p className="text-2xl text-center font-bold">{count}</p>
      </div>
    </div>
  );



  return (
    <div className="flex w-full overflow-hidden ">
      <div
      className="absolute inset-0 flex bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white"
        // className="absolute inset-0 flex bg-cover bg-center "
        // style={{
        //   backgroundImage: "url('../public/assets/sp5.jpg')",
        //   width: '100%',
        //   backgroundPosition: 'center',
        //   backgroundSize: 'cover',
        //   backgroundRepeat: 'no-repeat',
        // }}
      >
        <aside className="w-1/5 text-white mt-12">
          <div className="p-4 mt-10">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>

          <hr />
          <nav>
            <ul>
              <li>
                <NavButton
                  label="Dashboard"
                  onClick={() => navigate("")}
                  icon={<FaTachometerAlt />}
                />
              </li>
               <li>
                <NavButton
                  label="Teacher Management"
                  onClick={() => navigate("teacherManagement")}
                 icon={<FaChalkboardTeacher />}

                />
              </li>
              <li>
                <NavButton
                  label="Add New Teacher"
                  onClick={() => navigate("addTeacher")}
                  icon={<FaUserPlus />}
                />
              </li>
              {/* <li>
                <NavButton
                  label="All Teachers"
                  onClick={() => navigate("allTeachers")}
                  icon={<FaUserFriends />}
                />
              </li> */}
              <li>
                <NavButton
                  label="All Courses"
                  onClick={() => navigate("allCourses")}
                  icon={<FaBook />}
                />
              </li>
               <li>
                <NavButton
                  label="Add New Course"
                  onClick={() => navigate("addCourse")}
                  icon={<FaUserPlus />}
                />
              </li>
             
             
             
               <li>
                <NavButton
                  label="All Students"
                  onClick={() => navigate("allStudents")}
                  icon={<FaUserGraduate />}
                />
              </li>
               <li>
                <NavButton
                  label="Add New Subject"
                  onClick={() => navigate("addSubject")}
                  icon={<FaUserPlus />}
                />
              </li>
            </ul>
          </nav>
        </aside>
        <div className="w-1/5 flex-1 ">
          <Routes>
            <Route path="" element={<DashboardHome />} />
            {/* <Route path="allTeachers" element={<AllTeachers />} /> */}
            <Route path="allStudents" element={<AllStudent />} />
            <Route path="addTeacher" element={<AddTeacher />} />
            <Route path="allCourses" element={<AllCourses />} />
            <Route path="addCourse" element={<AddCourse />} />
            <Route path="addSubject" element={<AddSubject />} />
            <Route path="teacherManagement" element={<TeacherManagement />} />
            
          </Routes>
        </div>
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

export default AdminDashboard;
