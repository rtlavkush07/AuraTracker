import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    assessmentID: '',
    assessmentName: '',
    assessmentDate: '',
    assessmentLastDate: '',
    assessmentContent: '',
    auraCoins: 0,
    ratingPoint: 0,
    file: null,
    subject: '',
    status: 'Pending',
  });
  const [subjects, setSubjects] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [assFile, setAssFile] = useState("");

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      try {
        const response = await axios.get("/api/user/teacher/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTeacherId(response.data._id);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTeacherProfile();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!teacherId) return;
      try {
        const response = await axios.get(`/api/teacher/getSubjects/${teacherId}`);
        setSubjects(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubjects();
  }, [teacherId]);

  const postcloudinary = (myfile) => {
    if (!myfile) return;
    const data = new FormData();
    data.append("file", myfile);
    data.append("upload_preset", "AuraTracker");
    data.append("cloud_name", "dqx48ke30");

    fetch("https://api.cloudinary.com/v1_1/dqx48ke30/image/upload", {
      method: "POST",
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        if (data.secure_url) {
          setAssFile(data.secure_url);
          setNewAssignment(prev => ({ ...prev, assessmentContent: data.secure_url }));
        }
      })
      .catch(err => console.error(err));
  };

  const handleAddAssignmentClick = () => setShowForm(!showForm);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewAssignment(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const addAssignmentToSubject = async (teacherId, subjectId, assignmentData) => {
    try {
      const url = `/api/teacher/${teacherId}/${subjectId}/addAssignment`;
      await axios.post(url, assignmentData);
      alert('Assignment added successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to add assignment');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAssignments([...assignments, newAssignment]);
    if (selectedSubject) {
      addAssignmentToSubject(teacherId, selectedSubject, newAssignment);
    }
    setNewAssignment({
      assessmentID: '',
      assessmentName: '',
      assessmentDate: '',
      assessmentLastDate: '',
      assessmentContent: '',
      auraCoins: 0,
      ratingPoint: 0,
      file: null,
      subject: '',
      status: 'Pending',
    });
    setShowForm(false);
  };

  const handleDelete = (index) => {
    const updated = assignments.filter((_, i) => i !== index);
    setAssignments(updated);
  };

  const handleEdit = (index) => {
    const assignment = assignments[index];
    setNewAssignment(assignment);
    setSelectedSubject(assignment.subject);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Manage Assignments
        </h2>

        <button
          onClick={handleAddAssignmentClick}
          className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 mb-6"
        >
          {showForm ? "Cancel" : "Add New Assignment"}
        </button>

        {/* Form remains same */}
        {showForm && (
          <form onSubmit={handleSubmit} className="border border-gray-200 p-6 rounded-lg space-y-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Assessment ID</label>
                <input
                  type="text"
                  name="assessmentID"
                  value={newAssignment.assessmentID}
                  onChange={handleChange}
                  required
                  className="w-full text-gray-800 bg-white border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Assessment Name</label>
                <input
                  type="text"
                  name="assessmentName"
                  value={newAssignment.assessmentName}
                  onChange={handleChange}
                  required
                  className="w-full text-gray-800 bg-white border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Start Date</label>
                <input
                  type="date"
                  name="assessmentDate"
                  value={newAssignment.assessmentDate}
                  onChange={handleChange}
                  required
                  className="w-full text-gray-800 bg-white border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">End Date</label>
                <input
                  type="date"
                  name="assessmentLastDate"
                  value={newAssignment.assessmentLastDate}
                  onChange={handleChange}
                  required
                  className="w-full text-gray-800 bg-white border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Aura Coins</label>
                <input
                  type="number"
                  name="auraCoins"
                  value={newAssignment.auraCoins}
                  onChange={handleChange}
                  required
                  className="w-full text-gray-800 bg-white border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Rating Point</label>
                <input
                  type="number"
                  name="ratingPoint"
                  value={newAssignment.ratingPoint}
                  onChange={handleChange}
                  required
                  className="w-full text-gray-800 bg-white border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">Subject</label>
                <select
                  name="subject"
                  value={selectedSubject}
                  onChange={e => setSelectedSubject(e.target.value)}
                  required
                  className="w-full text-gray-800 bg-white border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(sub => <option key={sub._id} value={sub._id}>{sub.subjectName}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">Upload File</label>
                <input
                  type="file"
                  onChange={e => postcloudinary(e.target.files[0])}
                  required
                  className="w-full text-gray-700 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
            <button type="submit" className="w-full mt-4 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
              Add Assignment
            </button>
          </form>
        )}

        {/* Assignment list as row/table */}
        {/* <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length > 0 ? assignments.map((assignment, index) => (
                <tr key={index} className="text-center border">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{assignment.assessmentName}</td>
                  <td className="px-4 py-2 border">{assignment.status}</td>
                  <td className="px-4 py-2 border space-x-2">
                    <a href={assignment.assessmentContent} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-sm">View</a>
                    <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-sm">Edit</button>
                    <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm">Delete</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center text-gray-500">No assignments added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
};

export default AddAssignment;
