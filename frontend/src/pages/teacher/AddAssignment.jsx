import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddAssignment = () => {
  // --- All state and logic remains unchanged ---
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
  });
  const [subjects, setSubjects] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [assFile, setAssFile] = useState("");

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      try {
        const response = await axios.get("/api/user/teacher/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTeacherId(response.data._id);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTeacherProfile();
  }, []);

  const postcloudinary = (myfile) => {
    if (!myfile) {
      console.error("Assignment file is not defined");
      return;
    }
    const data = new FormData();
    data.append("file", myfile);
    data.append("upload_preset", "AuraTracker");
    data.append("cloud_name", "dqx48ke30");
    fetch("https://api.cloudinary.com/v1_1/dqx48ke30/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.secure_url) {
          setAssFile(data.secure_url);
          handleFile(data.secure_url);
          console.log("Image uploaded successfully:", data.secure_url);
        } else {
          console.error("Failed to upload file to Cloudinary:", data.error.message);
        }
      })
      .catch((err) => {
        console.error("An error occurred while uploading the file:", err);
      });
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        if (teacherId) {
          const response = await axios.get(`/api/teacher/getSubjects/${teacherId}`);
          setSubjects(response.data);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchSubjects();
  }, [teacherId]);

  const handleAddAssignmentClick = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewAssignment((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFile = (child) => {
    setNewAssignment((prev) => ({
      ...prev,
      assessmentContent: child ? child : "",
    }));
  };

  const addAssignmentToSubject = async (teacherId, subjectId, assignmentData) => {
    try {
      const url = `/api/teacher/${teacherId}/${subjectId}/addAssignment`;
      const response = await axios.post(url, assignmentData);
      console.log('Assignment added successfully:', response.data);
      alert('Assignment added successfully');
    } catch (error) {
      console.error('Error adding assignment:', error.response ? error.response.data : error.message);
      alert('Failed to add assignment');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAssignments([...assignments, newAssignment]);
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
    });
    setShowForm(false);
    if (selectedSubject) {
      addAssignmentToSubject(teacherId, selectedSubject, newAssignment);
    }
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  return (
    <div className="min-h-screen  bg-gradient-to-r from-blue-900 to-blue-600 p-4 sm:p-8">
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

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="border border-gray-200 p-6 rounded-lg space-y-4 mb-8"
          >
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
                  onChange={handleSubjectChange}
                  required
                  className="w-full text-gray-800 bg-white border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select Subject</option>
                  {subjects.length > 0 ? (
                    subjects.map((subject) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.subjectName}
                      </option>
                    ))
                  ) : (
                    <option disabled>No subjects available</option>
                  )}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">Upload File</label>
                <input
                  type="file"
                  onChange={(e) => postcloudinary(e.target.files[0])}
                  required
                  className="w-full text-gray-700 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Add Assignment
            </button>
          </form>
        )}

        {/* List of assignments */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-blue-900 border-b pb-2">Created Assignments</h3>
          {assignments.length > 0 ? (
            assignments.map((assignment, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <h4 className='text-xl font-bold text-gray-800 mb-2'>{assignment.assessmentName}</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <p><strong className="text-gray-800">ID:</strong> {assignment.assessmentID}</p>
                  <p><strong className="text-gray-800">Subject:</strong> {assignment.subject}</p>
                  <p><strong className="text-gray-800">Start:</strong> {assignment.assessmentDate}</p>
                  <p><strong className="text-gray-800">End:</strong> {assignment.assessmentLastDate}</p>
                  <p><strong className="text-gray-800">Coins:</strong> {assignment.auraCoins}</p>
                  <p><strong className="text-gray-800">Rating:</strong> {assignment.ratingPoint}</p>
                </div>
                 <div className='mt-4'>
                    <a href={assignment.assessmentContent} target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:underline'>View Assignment File</a>
                </div>
                <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mt-4 text-sm">
                  Check Submissions
                </button>
              </div>
            ))
          ) : (
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg text-center">
              <p className="text-gray-500">No assignments have been added yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAssignment;