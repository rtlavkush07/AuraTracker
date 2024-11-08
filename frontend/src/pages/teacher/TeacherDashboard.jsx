import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FaCalendarAlt } from "react-icons/fa";
import AddAssignment from "./AddAssignment";
import AddSubjectData from "./AddSubjectData";

const TeacherDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("Home");

  // Function to render the main content based on the selected section
  const renderRightSection = () => {
    switch (selectedSection) {
      case "Manage Assignment":
        return <AddAssignment />;
      case "Manage Study Material":
        return <AddSubjectData />;
      default:
        return (
          <>
            <h1 className="text-3xl font-bold">
              Welcome to the Teacher Dashboard
            </h1>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        </div>
        <nav>
          <ul>
            <li>
              <button
                onClick={() => setSelectedSection("Home")}
                className={`w-full text-left px-4 py-2 ${
                  selectedSection === "Home"
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection("Manage Assignment")}
                className={`w-full text-left px-4 py-2 ${
                  selectedSection === "Manage Assignment"
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                Manage Assignments
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection("Manage Study Material")}
                className={`w-full text-left px-4 py-2 ${
                  selectedSection === "Manage Study Material"
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                Manage Study Materials
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{renderRightSection()}</main>
    </div>
  );
};

export default TeacherDashboard;
