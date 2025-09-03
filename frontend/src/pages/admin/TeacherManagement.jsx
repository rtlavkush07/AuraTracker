import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TeacherManagement = () => {
  // start for adding new teacher
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const teacherData = {
      name,
      email,
      password,
    };
    try {
      const response = await axios.post("/api/admin/addTeacher", teacherData);
      // console.log(response.data); // Check if teacher added successfully
      // Redirect to admin dashboard after successful addition
      alert("Teacher added successfully");
      navigate("/admin/teacherManagement");
      setShowForm(false);
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  // when student will select the subject then added in teachers
  const handleSubjectChange = (subjectId) => {
    setSubjects((prevSubjects) =>
      prevSubjects.includes(subjectId)
        ? prevSubjects.filter((id) => id !== subjectId)
        : [...prevSubjects, subjectId]
    );
  };

  // end for adding new teacher

  // start of delete teacher

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?"))
      return;

    try {
      await axios.delete(`/api/admin/deleteTeacher/${id}`);
      alert("Teacher removed successfully");
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  // end of delete teacher



  // Fetch all teachers

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("/api/admin/getAllTeacher");
        setTeachers(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

  // Add teacher
  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/admin/addTeacher", { name, email, password });
      setName("");
      setEmail("");
      setPassword("");
      setShowForm(false);
      fetchTeachers();
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  // Edit teacher (for simplicity only name edit)
  const handleEdit = async (id, newName) => {
    try {
      await axios.put(`/api/admin/editTeacher/${id}`, { name: newName });
 setTeachers((prev) =>
      prev.map((teacher) =>
        teacher._id === id ? { ...teacher, name: newName } : teacher
      )
    );

      alert("Teacher details updated successfully");
    } catch (error) {
      console.error("Error editing teacher:", error);
      alert("Failed to edit teacher details");
    }
  };
  const handleEdit1 = async (id, newMail) => {
    try {
      await axios.put(`/api/admin/editTeacher/${id}`, { email: newMail });
  setTeachers((prev) =>
      prev.map((teacher) =>
        teacher._id === id ? { ...teacher, email: newMail } : teacher
      )
    );

      alert("Teacher details updated successfully");
    } catch (error) {
      console.error("Error editing teacher:", error);
      alert("Failed to edit teacher details");
    }
  };

  return (
    <div className="p-8 mt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black ">
      {/* Top Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold ">Teachers</h2>
      </div>

      {/* Add Teacher Form */}

      {/* Teacher Table */}
      <div className="overflow-scroll h-[521px] ">
        <table className="w-full bg-gray-700  border border-gray-200 rounded-lg shadow-md overflow-scroll">
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
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <tr key={teacher._id} className="border-b">
                  <td className="px-4 py-2">{teacher.name}</td>
                  {/* edit name  */}
                  <button
                    className="border  m-1"
                    onClick={() => {
                      const newName = prompt("Enter new name:", teacher.name);
                      if (newName) handleEdit(teacher._id, newName);
                    }}
                  >
                    🖍
                  </button>
                  <td className="px-4 py-2">{teacher.email} </td>
                  {/* edit email  */}
                  <button
                    className="border  m-1"
                    onClick={() => {
                      const newMail = prompt("Enter new Email:", teacher.email);
                      if (newMail) handleEdit1(teacher._id, newMail);
                    }}
                  >
                    🖍
                  </button>

                  <td className="px-4 py-2 text-center space-x-2">
                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(teacher._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    {/* View Performance */}
                    <button
                      onClick={() =>
                        alert(`Performance of ${teacher.name}: Coming Soon 🚀`)
                      }
                      className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                    >
                      View Performance
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-6 text-center text-gray-500">
                  No teachers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherManagement;
