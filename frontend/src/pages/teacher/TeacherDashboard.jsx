import React from "react";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-10">
        Teacher Dashboard
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Add Assignments Card */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Assignments</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Create and manage assignments to keep students engaged and on track.
          </p>
          <Link
            to="addassignment"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-6 text-center w-full transition-colors duration-200"
          >
            Add Assignment
          </Link>
        </div>

        {/* Add Study Materials Card */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Study Materials</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Upload study materials and resources to help students learn effectively.
          </p>
          <Link
            to="addsubjectdata"
            className="bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 px-6 text-center w-full transition-colors duration-200"
          >
            Add Material
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
