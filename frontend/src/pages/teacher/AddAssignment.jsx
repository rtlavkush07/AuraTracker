import React, { useState } from 'react';

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
  });

  // Handler to show/hide form
  const handleAddAssignmentClick = () => {
    setShowForm(!showForm);
  };

  // Handler to update input fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewAssignment((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handler to add new assignment
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
    });
    setShowForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Assignments</h2>
      
      {/* Button to show/hide form */}
      <button
        onClick={handleAddAssignmentClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {showForm ? 'Cancel' : 'Add New Assignment'}
      </button>

      {/* Form for new assignment */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 border p-4 rounded-lg shadow-md">
          <div>
            <label className="block font-semibold">Assessment ID</label>
            <input
              type="text"
              name="assessmentID"
              value={newAssignment.assessmentID}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold">Assessment Name</label>
            <input
              type="text"
              name="assessmentName"
              value={newAssignment.assessmentName}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold">Assessment Date</label>
            <input
              type="date"
              name="assessmentDate"
              value={newAssignment.assessmentDate}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold">Assessment Last Date</label>
            <input
              type="date"
              name="assessmentLastDate"
              value={newAssignment.assessmentLastDate}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold">Assessment Content</label>
            <textarea
              name="assessmentContent"
              value={newAssignment.assessmentContent}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold">Aura Coins</label>
            <input
              type="number"
              name="auraCoins"
              value={newAssignment.auraCoins}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold">Rating Point</label>
            <input
              type="number"
              name="ratingPoint"
              value={newAssignment.ratingPoint}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold">Upload File</label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Assignment
          </button>
        </form>
      )}

      {/* List of assignments */}
      <div className="mt-8">
        {assignments.length > 0 ? (
          assignments.map((assignment, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md mb-4">
              <p><strong>Assessment ID:</strong> {assignment.assessmentID}</p>
              <p><strong>Assessment Name:</strong> {assignment.assessmentName}</p>
              <p><strong>Assessment Date:</strong> {assignment.assessmentDate}</p>
              <p><strong>Assessment Last Date:</strong> {assignment.assessmentLastDate}</p>
              <p><strong>Content:</strong> {assignment.assessmentContent}</p>
              <p><strong>Aura Coins:</strong> {assignment.auraCoins}</p>
              <p><strong>Rating Point:</strong> {assignment.ratingPoint}</p>
              {assignment.file && (
                <p><strong>File:</strong> {assignment.file.name}</p>
              )}
               <button className='bg-blue-700 p-3 rounded-md m-2 text-white'>Check Submission</button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No assignments added yet.</p>
        )}
      </div>
     
    </div>
  );
};

export default AddAssignment;
