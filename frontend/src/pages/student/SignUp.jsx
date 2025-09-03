// src/components/Signup.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [year, setYear] = useState("");
  const [regNo, setRegNo] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const navigate = useNavigate();

  const postDetails = (pics) => {
    if (!pics) return;
    if (pics.type !== "image/jpeg" && pics.type !== "image/png") return;

    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "AuraTracker");
    data.append("cloud_name", "dqx48ke30");

    fetch("https://api.cloudinary.com/v1_1/dqx48ke30/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.secure_url) setProfilePicture(data.secure_url);
      })
      .catch((err) => console.error("Image upload error:", err));
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/api/admin/getAllCourse");
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/signup", {
        email,
        name,
        profilePicture,
        password,
        year,
        regNo,
        course,
      });
      alert("SignUp Successful: " + response.data.message);
      setError("");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Error signing up.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg transform transition-transform duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
     <div className=" flex flex-row gap-6 p-6">
  {/* Left Column */}
  <div className=" flex-1 space-y-4 p-4 rounded-lg">
    <div>
      <label className="block text-gray-700 mb-1">Name*</label>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </div>

    <div>
      <label className="block text-gray-700 mb-1">Email*</label>
      <input
        type="email"
        placeholder="eg: abc@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </div>

    <div>
      <label className="block text-gray-700 mb-1">Password*</label>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </div>

    <div>
      <label className="block text-gray-700 mb-1">Passing Year*</label>
      <input
        type="number"
        placeholder="eg: 2026"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </div>
  </div>

  {/* Right Column */}
  <div className=" flex-1 space-y-4 p-4 rounded-lg">
    <div>
      <label className="block text-gray-700 mb-1">Registration Number*</label>
      <input
        type="text"
        placeholder="eg: 2023CA57"
        value={regNo}
        onChange={(e) => setRegNo(e.target.value)}
        required
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </div>

    <div>
      <label className="block text-gray-700 mb-1">Select Course*</label>
      <select
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        required
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
      >
        <option value="">Select Course</option>
        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.courseName}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-gray-700 mb-1">Upload Profile Photo*</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => postDetails(e.target.files[0])}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </div>
  </div>
</div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >
            Signup
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
