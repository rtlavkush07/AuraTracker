import React, { useState } from "react";

const AddCourse = ({ onSubmit }) => {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [studentsEnrolled, setStudentsEnrolled] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      courseName,
      courseCode,
      studentsEnrolled,
    };
    onSubmit(courseData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Add or Edit Course</h2>

      {/* Course Name */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Course Name</label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Course Code */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Course Code</label>
        <input
          type="text"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Add Course
      </button>
    </form>
  );
};

export default AddCourse;
