// src/components/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'animate.css/animate.min.css'; // Import animate.css for animations

const Signup = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [year, setYear] = useState('');
    const [regNo, setRegNo] = useState('');
    const [course, setCourse] = useState('');
    const [error, setError] = useState('');
    const [profilePicture, setProfilePicture] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate
    // profile picture handler 
    const postDetails = (pics) => {
      // Check if the file is undefined or null
      if (!pics) {
        console.error("Profile picture is not defined");
        return;
      }

      // Ensure the file type is an image (jpeg or png)
      if (pics.type !== "image/jpeg" && pics.type !== "image/png") {
        console.error("Invalid file type. Only JPEG and PNG are supported.");
        return;
      }

      // Prepare the FormData for Cloudinary upload
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "AuraTracker");
      data.append("cloud_name", "dqx48ke30");

      // Upload to Cloudinary
      fetch("https://api.cloudinary.com/v1_1/dqx48ke30/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // Check if Cloudinary returned a valid URL
          if (data.secure_url) {
            setProfilePicture(data.secure_url);
            console.log("Image uploaded successfully:", data.secure_url);
          } else {
            console.error(
              "Failed to upload image to Cloudinary:",
              data.error.message
            );
          }
        })
        .catch((err) => {
          console.error("An error occurred while uploading the image:", err);
        });
    };

    //profile handler end
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/signup', {
                email,
                name,
                profilePicture,
                password,
                year,
                regNo,
                course,
            });

            // Display success message or redirect to login
            alert("SignUp Successful: " + response.data.message);
            setError('');
            navigate('/auth/login'); // Redirect to login page
        } catch (err) {
            setError(err.response?.data?.message || 'Error signing up. Please try again.');
            console.error(err);
        }
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md animate__animated animate__fadeIn animate__delay-0.5s transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold text-center text-blue-500 mb-6 animate__animated animate__fadeInDown">
            Signup
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="animate__animated animate__fadeIn animate__delay-0.2s">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out transform hover:scale-105"
              />
            </div>
            <div className="animate__animated animate__fadeIn animate__delay-0.3s">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out transform hover:scale-105"
              />
            </div>
            <div className="animate__animated animate__fadeIn animate__delay-0.4s">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out transform hover:scale-105"
              />
            </div>
            <div className="animate__animated animate__fadeIn animate__delay-0.5s">
              <input
                type="number"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out transform hover:scale-105"
              />
            </div>
            <div className="animate__animated animate__fadeIn animate__delay-0.6s">
              <input
                type="text"
                placeholder="Registration Number"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out transform hover:scale-105"
              />
            </div>
            <div className="animate__animated animate__fadeIn animate__delay-0.7s">
              <input
                type="text"
                placeholder="Course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out transform hover:scale-105"
              />
            </div>
            {/*  profile picture div */}
            <div className="animate__animated animate__fadeIn animate__delay-0.7s">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out transform hover:scale-105"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Signup
            </button>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        </div>
      </div>
    );
};

export default Signup;
