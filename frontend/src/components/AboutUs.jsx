import React from "react";

const AboutUs = () => {
  return (
    <div className="w-full min-h-screen  bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white px-6 md:px-20 py-16">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        About <span className="text-yellow-400">Aura Tracker</span>
      </h2>

      {/* Content Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
          <p className="text-lg leading-relaxed mb-6">
            Aura Tracker is a smart academic management platform designed for{" "}
            <span className="text-yellow-300">Students, Teachers </span> {" "}
            {/* <span className="text-yellow-300">Admins</span>.   */}
            Our mission is to make learning and teaching more organized, goal-oriented, 
            and stress-free by bringing everything in one place and doing gamified.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Why Aura Tracker?</h3>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>
              🎯 <b>For Students:</b> Track assignments, manage goals, and complete chapters.
            </li>
            <li>
              📚 <b>For Teachers:</b> Allocate tasks, review student progress, and guide learning.
            </li>
            {/* <li>
              🛠️ <b>For Admins:</b> Manage student/teacher profiles and monitor activities.
            </li> */}
          </ul>
        </div>

        {/* Right Side - Illustration */}
        <div className="flex justify-center">
          <img
            src="/assets/aboutus.png" // add your own illustration image in public/assets
            alt="About Aura Tracker"
            className="rounded-2xl shadow-lg w-4/5 hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
