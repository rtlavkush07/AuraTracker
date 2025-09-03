// pages/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, setError } from "../features/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notify = (message) => toast.success(message);
  const notifyErr = (message) => toast.error(message);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password, role: userRole });
      const { token, role, id } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      dispatch(loginSuccess({ token, role, id }));

      notify("Logged in Successfully!");

      setTimeout(() => {
        if (role === "admin") navigate("/admin");
        else if (role === "teacher") navigate("/teacher/profile");
        else if (role === "student") navigate("/student/dashboard/profile");
      }, 1000);
    } catch (err) {
      notifyErr(" Invalid email or password");
      const errorMessage = err.response?.data?.message || "Invalid email or password";
      dispatch(setError(errorMessage));
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 px-4">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} pauseOnHover theme="light" />

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transform transition-transform duration-300 hover:scale-105 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Login</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1">Email Id*</label>
            <input
              type="email"
              placeholder="eg:-abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password*</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Choose Your Role*</label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="" disabled>
                eg:- Student, Teacher, Admin
              </option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && (
            <p className="mt-2 text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to="/student/signup" className="text-blue-600 hover:underline">
              Register Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
