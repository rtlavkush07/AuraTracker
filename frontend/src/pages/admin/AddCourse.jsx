import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const navigate = useNavigate();

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const courseData = { courseName, courseCode };

    try {
      await axios.post("/api/admin/addCourse", courseData);
      notifySuccess("Course added successfully!");

      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (error) {
      console.error("Error adding Course:", error);
      notifyError("Failed to add course. Try again!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 px-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnHover
        theme="light"
      />

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transform transition-transform duration-300 hover:scale-105 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Add New Course
        </h2>

        <form className="space-y-5" onSubmit={handleFormSubmit}>
          {/* Course Name */}
          <div>
            <label className="block text-gray-700 mb-1">Course Name*</label>
            <input
              type="text"
              placeholder="eg:- MCA/Btech"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
            />
          </div>

          {/* Course Code */}
          <div>
            <label className="block text-gray-700 mb-1">Course Code*</label>
            <input
              type="text"
              placeholder="eg:- MCA101"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
