import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllStudent = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const response = await axios.get('/api/student/getAllStudents');
        setStudents(response.data);
      } catch (error) {
        console.error('Failed to fetch all students:', error);
      }
    };
    fetchAllStudents();
  }, []);

  // Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await axios.delete(`/api/admin/deleteStudent/${id}`);  // here i am managing delete student form admin dashboard can also delete student from student dashboard
      alert("Student removed successfully ");
      setStudents((prev) => prev.filter(student => student._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student ❌");
    }
  };

  // Edit student (only name for simplicity)
  const handleEdit = async (id, currentName) => {
    const newName = prompt("Enter new student name:", currentName);
    if (!newName) return;

    try {
      await axios.put(`/api/admin/editStudent/${id}`, { name: newName });
      setStudents((prev) =>
        prev.map(student =>
          student._id === id ? { ...student, name: newName } : student
        )
      );
    } catch (error) {
      console.error("Error editing student:", error);
      alert("Failed to edit student ");
    }
  };
  // edit email of student
    const handleEdit1 = async (id, currEmail) => {
    const newEmail = prompt("Enter new student name:", currEmail);
    if (!newEmail) return;

    try {
      await axios.put(`/api/admin/editStudent/${id}`, { email: newEmail });
      setStudents((prev) =>
        prev.map(student =>
          student._id === id ? { ...student, email: newEmail } : student
        )
      );
    } catch (error) {
      console.error("Error editing student:", error);
      alert("Failed to edit student ");
    }
  };

  return (
    <div className="p-8 mt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">Students</h1>

      <div className="overflow-scroll h-[521px]">
        <table className="w-full bg-gray-700 border border-gray-200 rounded-lg shadow-md overflow-scroll">
          <thead className="bg-blue-600 text-white sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
                 <th className="px-4 py-2 text-left">Edit Name</th>
              <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Edit Email</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id} className="border-b hover:bg-gray-600 transition-colors">
                  <td className="px-4 py-2 text-white">{student.name}</td>
                  {/* edit name  */}
                  <button
                    className="border  m-1"
                    onClick={() => {
                      const newName = prompt("Enter new name:", student.name);
                      if (newName) handleEdit(student._id, newName);
                    }}
                  >
                    🖍
                  </button>
                  <td className="px-4 py-2 text-white">{student.email}</td>
                   {/* edit email  */}
                  <button
                    className="border  m-1"
                    onClick={() => {
                      const newEmail = prompt("Enter new Email:", student.email);
                      if (newEmail) handleEdit1(student._id, newEmail);
                    }}
                  >
                    🖍
                  </button>
                  <td className="px-4 py-2 text-center space-x-2">
                   
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => alert(`Performance of ${student.name}: Coming Soon 🚀`)}
                      className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                    >
                      View Performance
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-6 text-center text-gray-400">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllStudent;
