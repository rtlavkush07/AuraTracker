// pages/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, setError } from "../features/authSlice"; // Import actions

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.auth.error); // Access state
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted:", { email, password, role: userRole });
    try {
      const response = await axios.post("/api/auth/login", { email, password, role: userRole });
      const { token, role, id } = response.data;
      console.log("response =  " + response);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      console.log("Login successful:", response.data);
      console.log(id);
      dispatch(loginSuccess({ token, role, id })); // redux state
      if (role === 'admin') {
        navigate("/admin");
      } else if (role === 'teacher') {
        navigate("/teacher/profile");
      } else if (role === 'student') {
        navigate('/student/profile');
      }

      // Redirect to home page
    } catch (err) {
      dispatch(setError(errorMessage)); // call seterror method
      if (err.response) {
        setError(err.response.data.message || "Invalid email or password");
      } else {
        setError("Something went wrong");
      }
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen " style={{ backgroundImage: "url('../public/assets/sp1.jpg')" }}>
      <div className="bg-white bg-opacity-10 text-white p-8 rounded-lg shadow-lg w-96 transform transition-transform duration-300 hover:scale-105 border border-white">

        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Login
        </h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3  border border-white bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
            />
          </div>
          <div className="mt-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-white bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
            />
          </div>
          <div className="mt-4">
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              required
              className="w-full p-3 border border-white bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
            >
              <option value="" disabled className="bg-transparent">
                Select your role
              </option>
              <option className="bg-transparent text-gray-700" value="student">Student</option>
              <option className="bg-transparent text-gray-700" value="teacher">Teacher</option>
              <option className="bg-transparent text-gray-700" value="admin">Admin</option>
            </select>
          </div>
          {error && (
            <p className="mt-2 text-red-600 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="mt-6 w-full py-3 bg-transparent border border-white text-white rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;