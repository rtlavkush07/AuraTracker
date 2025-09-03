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

  // Delete course
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(`/api/admin/deleteCourse/${id}`);
      alert("Course removed successfully ✅");
      setCourses((prev) => prev.filter(course => course._id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course ❌");
    }
  };

  // Edit course (only course name for simplicity)
  const handleEdit = async (id, currentName) => {
    const newName = prompt("Enter new course name:", currentName);
    if (!newName) return;

    try {
      await axios.put(`/api/admin/editCourse/${id}`, { courseName: newName });
      alert("Course name updated successfully");
      setCourses((prev) =>
        prev.map(course =>
          course._id === id ? { ...course, courseName: newName } : course
        )
      );
    } catch (error) {
      console.error("Error editing course:", error);
      alert("Failed to edit course ");
    }
  };
// edit course code 
 const handleEdit1 = async (id, currCode) => {
    const newCode = prompt("Enter new course name:", currCode);
    if (!newCode) return;

    try {
      await axios.put(`/api/admin/editCourse/${id}`, { courseCode: newCode });

      alert("Course code updated successfully");
      setCourses((prev) =>
        prev.map(course =>
          course._id === id ? { ...course, courseCode: newCode } : course
        )
      );
    } catch (error) {
      console.error("Error editing course:", error);
      alert("Failed to edit course ❌");
    }
  };
  return (
    <div className="p-8 mt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">Courses</h1>

      <div className="overflow-scroll h-[521px]">
        <table className="w-full bg-gray-700 border border-gray-200 rounded-lg shadow-md overflow-scroll">
          <thead className="bg-blue-600 text-white sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left">Course Name</th>
              <th className="px-4 py-2 text-left">Edit Course Name</th>
              <th className="px-4 py-2 text-left">Course Code</th>
              <th className="px-4 py-2 text-left">Edit Course Code</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course._id} className="border-b hover:bg-gray-600 transition-colors">
                  <td className="px-4 py-2 text-white">{course.courseName}</td>
                   <button
                      onClick={() => handleEdit(course._id, course.courseName)}
                    className="border  m-1"
                    >
                    🖍
                    </button>
                  <td className="px-4 py-2 text-white">{course.courseCode}</td>
                   <button
                      onClick={() => handleEdit1(course._id, course.courseCode)}
                     className="border  m-1"
                    >
                     🖍
                    </button>
                  <td className="px-4 py-2 text-center space-x-2">
                
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-6 text-center text-gray-400">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCourses;
