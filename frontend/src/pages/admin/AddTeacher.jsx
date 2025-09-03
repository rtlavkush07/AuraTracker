import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTeacher = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subjects, setSubjects] = useState([]); // reserved for subject assignment
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const teacherData = {
      name,
      email,
      password,
    };

    try {
      await axios.post("/api/admin/addTeacher", teacherData);
      navigate("/admin"); // redirect after success
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  const handleSubjectChange = (subjectId) => {
    setSubjects((prevSubjects) =>
      prevSubjects.includes(subjectId)
        ? prevSubjects.filter((id) => id !== subjectId)
        : [...prevSubjects, subjectId]
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 px-4">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg transform transition-transform duration-300 hover:scale-105 border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
          Add New Teacher
        </h2>

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1">Name*</label>
            <input
              type="text"
              placeholder="Enter teacher name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email*</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password*</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >
            Add Teacher
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTeacher;
