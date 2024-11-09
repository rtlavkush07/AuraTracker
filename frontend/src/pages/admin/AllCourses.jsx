import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/admin/getAllCourse');
        setCourses(response.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Courses</h1>
      <ul className="w-full max-w-2xl bg-white rounded-lg shadow-lg px-9">
        {courses.map((course, index) => (
          <li key={index} className="border-b border-gray-200 p-4 last:border-none">
            <p className="text-lg font-semibold text-gray-800">
              <span className="font-bold text-gray-900">Course Name:</span> {course.courseName}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              <span className="font-bold text-gray-900">Course Code:</span> {course.courseCode}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllCourses;
