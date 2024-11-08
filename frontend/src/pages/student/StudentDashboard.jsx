import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaCalendarAlt } from 'react-icons/fa'; // Import specific icon

import CourseSchedules from './CourseSchedules';
import CourseSubjects from './CourseSubjects';
import Assignment from './Assignment';

const StudentDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('Home'); // Manage which section to display

  // Sample student data (could be fetched from backend)
  const student = {
    courses: [
      { name: 'Operating System', progress: 80, schedule: 'Tue- 9:00-11:00, Wed- 9:00 - 11:00' },
      { name: 'Analysis Of Algorithm', progress: 70, schedule: 'Wed- 2:00-3:00, Tue- 8:00 - 10:00' },
      { name: 'Data Management System', progress: 85, schedule: 'Tue- 2:00-4:00, Fri- 10:00 - 12:00' },
      { name: 'Object Based Modeling', progress: 65, schedule: 'Thu- 10:00-12:00, Fri- 5:00 - 6:00' },
      { name: 'Soft Computing', progress: 60, schedule: 'Mon- 2:00-4:00, Wed- 1:00 - 2:00' },
    ],
  };

  // Simplified render function for the right section based on selected tab
  const renderRightSection = () => {
    switch (selectedSection) {
      case 'Schedule':
        return <CourseSchedules />;
      case 'ASSIGNMENT':
        return <Assignment />;
      case 'SUBJECTS':
        return <CourseSubjects />;

      default:
        return <h1 className="text-center text-5xl">Welcome To Student Dashboard</h1>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-1/5 bg-black p-4 border-r border-green-600 flex flex-col">
        <div className="text-2xl font-bold text-green-500 mb-8">STUDENT DASHBOARD</div>
        <nav className="flex flex-col gap-4">
          {['Schedule', 'ASSIGNMENT', 'SUBJECTS'].map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedSection(item)} // Set selected section on click
              className="text-left text-white flex items-center gap-3 py-2 px-4 hover:bg-green-700 rounded"
            >
              <i className={`fas ${[
                'fa-calendar-alt',   // Schedule
                'fa-tasks',          // ASSIGNMENT
                'fa-book',           // COURSES
                'fa-bullseye',       // CHALLENGES
                'fa-chart-line',     // RESULTS
              ][index]}`}></i>
              {item}
            </button>
          ))}
        </nav>
        <button className="text-left mt-auto text-white flex items-center gap-3 py-2 px-4 hover:bg-red-700 rounded">
          <i className="fas fa-sign-out-alt"></i> Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Hello, ABC!</h1>
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Right Section Based on Selection */}
        <div className="grid grid-cols-3 gap-6">
          {/* Main Content Right Section */}
          <div className="col-span-3">
            {renderRightSection()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
