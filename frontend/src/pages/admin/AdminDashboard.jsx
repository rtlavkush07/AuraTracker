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
} from "react-icons/fa";

// Import all necessary components
import AddTeacher from "./AddTeacher";
import AddCourse from "./AddCourse";
import AllTeachers from "./AllTeachers";
import AllCourses from "./AllCourses";
import AllStudent from "./AllStudent";
import AddSubject from "./AddSubject";

const AdminDashboard = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
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

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const DashboardHome = () => (
    <main className="flex-1 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <StatsCard
          icon={<FaUserGraduate />}
          title="Students"
          count={students.length}
          color="text-blue-500"
        />
        <StatsCard
          icon={<FaUserFriends />}
          title="Teachers"
          count={teachers.length}
          color="text-pink-500"
        />
        <StatsCard
          icon={<FaBook />}
          title="Courses"
          count={courses.length}
          color="text-yellow-500"
        />
      </div>
      <TodoList
        todos={todos}
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        addTodo={addTodo}
        deleteTodo={deleteTodo}
      />
    </main>
  );

  const StatsCard = ({ icon, title, count, color }) => (
    <div
      className={`bg-white p-4 rounded shadow flex items-center space-x-4 ${color}`}
    >
      {icon}
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </div>
  );

  const TodoList = ({ todos, newTodo, setNewTodo, addTodo, deleteTodo }) => (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Admin To-Do List</h3>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new task"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex items-center justify-between space-x-3"
            >
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>{todo}</span>
              </div>
              <button onClick={() => deleteTodo(index)}>
                <FaTrashAlt className="text-red-500" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="flex w-full overflow-hidden">
      <div
        className="absolute inset-0 flex bg-cover bg-center"
        style={{
          backgroundImage: "url('../public/assets/sp5.jpg')",
          width: '100%',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <aside className="w-1/5 text-white mt-12">
          <div className="p-4 mt-10">
            <h1 className="text-2xl font-bold">Admin</h1>
          </div>
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
                  label="All Teachers"
                  onClick={() => navigate("allTeachers")}
                  icon={<FaUserFriends />}
                />
              </li>
              <li>
                <NavButton
                  label="Add New Teacher"
                  onClick={() => navigate("addTeacher")}
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
                  label="Add New Subject"
                  onClick={() => navigate("addSubject")}
                  icon={<FaUserPlus />}
                />
              </li>
            </ul>
          </nav>
        </aside>
        <div className="w-1/5 flex-1 overflow-scroll">
          <Routes>
            <Route path="" element={<DashboardHome />} />
            <Route path="allTeachers" element={<AllTeachers />} />
            <Route path="allStudents" element={<AllStudent />} />
            <Route path="addTeacher" element={<AddTeacher />} />
            <Route path="allCourses" element={<AllCourses />} />
            <Route path="addCourse" element={<AddCourse />} />
            <Route path="addSubject" element={<AddSubject />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const NavButton = ({ label, onClick, icon }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-4 py-2 hover:bg-gray-700"
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);

export default AdminDashboard;
