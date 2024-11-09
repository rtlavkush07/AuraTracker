import React, { useState, useEffect } from "react";
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
import AddTeacher from "./AddTeacher";
import AddCourse from "./AddCourse";
import AllTeachers from "./AllTeachers";
import AllCourses from "./AllCourses";
import AllStudent from "./AllStudent";
import AddSubject from "./AddSubject";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("Home");
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const response = await axios.get("/api/student/getAllStudents");
        setStudents(response.data);
      } catch (error) {
        console.error("Failed to fetch all students:", error);
      }
    };
    fetchAllStudents();
  }, []);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("/api/admin/getAllTeacher");
        setTeachers(response.data);
      } catch (error) {
        console.error("Failed to fetch teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/admin/getAllCourse");
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
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

  const renderRightSection = () => {
    switch (selectedSection) {
      case "All Teachers":
        return <AllTeachers />;
      case "Add New Teacher":
        return <AddTeacher />;
      case "All Students":
        return <AllStudent />;
      case "All Courses":
        return <AllCourses />;
      case "Add New Courses":
        return <AddCourse />;
      case "Add New Subject":
        return <AddSubject />;
      default:
        return (
          <main className="flex-1 p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">{selectedSection}</h1>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
                <FaUserGraduate className="text-3xl text-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold">Students</h3>
                  <p className="text-2xl font-bold">{students.length}</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
                <FaUserFriends className="text-3xl text-pink-500" />
                <div>
                  <h3 className="text-lg font-semibold">Teachers</h3>
                  <p className="text-2xl font-bold">{teachers.length}</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
                <FaUserFriends className="text-3xl text-yellow-500" />
                <div>
                  <h3 className="text-lg font-semibold">Courses</h3>
                  <p className="text-2xl font-bold">{courses.length}</p>
                </div>
              </div>
            </div>

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
          </main>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin</h1>
        </div>
        <nav>
          <ul>
            <li>
              <button
                onClick={() => setSelectedSection("Home")}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                <FaTachometerAlt className="inline-block mr-2" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection("All Teachers")}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                <FaUserFriends className="inline-block mr-2" />
                All Teachers
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection("Add New Teacher")}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                <FaUserPlus className="inline-block mr-2" />
                Add New Teacher
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection("All Students")}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                <FaUserFriends className="inline-block mr-2" />
                All Students
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection("All Courses")}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                <FaBook className="inline-block mr-2" />
                All Courses
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection("Add New Courses")}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                <FaUserPlus className="inline-block mr-2" />
                Add New Courses
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection("Add New Subject")}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                <FaUserPlus className="inline-block mr-2" />
                Add New Subject
              </button>
            </li>
          </ul>
        </nav>
      </aside>

     <div className=" w-full overflow-scroll">
     {renderRightSection()}
     </div>
    </div>
  );
};

export default AdminDashboard;
