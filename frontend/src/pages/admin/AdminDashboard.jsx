import React from "react";
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-10">
        Admin Dashboard
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Manage Courses Card */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Courses</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Here you can add new courses, assign subjects, and manage course details efficiently.
          </p>
          <div className="flex gap-4">
            <Link
              to="addcourse"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-6 text-center w-full transition-colors duration-200"
            >
              Add Course
            </Link>
            <Link
              to="addsubject"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-6 text-center w-full transition-colors duration-200"
            >
              Add Subject
            </Link>
          </div>
        </div>

        {/* Manage Professors Card */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Professors</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Manage all professors, including adding or removing them from the system for efficient coordination.
          </p>
          <Link
            to="addteacher"
            className="bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 px-6 text-center w-full transition-colors duration-200"
          >
            Manage Professors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
