import React from "react";
import {Link} from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Admin Dashboard
      </h1>
      <div className="flex w-full">
        {/* Manage Courses Card */}
        <div className="bg-white rounded-lg p-6 " style={{width:'50%'}}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Courses</h2>
          <p className="text-gray-600">
            Here you can manage all the courses which includes include New course exclude courses and also add chapters in every courses or delete also.
          </p>
          <Link to={'addcourse'} className=" bg-blue-500 text-white rounded-lg p-3">
            Manage Courses
          </Link>
        </div>

        {/* Manage Professors Card */}
        <div className="bg-white rounded-lg p-6" style={{width:'50%'}}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Professors</h2>
          <p className="text-gray-600">
           here you can manage all the Professors 
          </p>
          <button className=" bg-green-500 text-white rounded-lg p-3">
            Manage Professors
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
