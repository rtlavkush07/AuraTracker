import React, { useState } from 'react';

const Assignment = () => {
    const assignmentsData = [
        { id: 1, name: 'Assignment 1', dueDate: '15 Sept 11:55', status: 'Pending' },
        { id: 2, name: 'Assignment 2', dueDate: '15 Sept 11:55', status: 'Pending' },
        { id: 3, name: 'Assignment 3', dueDate: '15 Sept 11:55', status: 'Submitted' },
        { id: 4, name: 'Assignment 4', dueDate: '15 Sept 11:55', status: 'Pending' },
        { id: 5, name: 'Assignment 5', dueDate: '15 Sept 11:55', status: 'Submitted' },
    ];

    const [assignments, setAssignments] = useState(assignmentsData);
    const [activeTab, setActiveTab] = useState('Pending');

    // Handle file upload and change assignment status to "Submitted"
    const handleFileUpload = (assignmentId) => {
        const updatedAssignments = assignments.map((assignment) =>
            assignment.id === assignmentId ? { ...assignment, status: 'Submitted' } : assignment
        );
        setAssignments(updatedAssignments);
        alert('File uploaded and assignment submitted!');
    };

    return (
        <div className="p-6 bg-black text-white border border-gray-400 rounded-lg max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Assignment</h2>

            {/* Tab buttons */}
            <div className="flex justify-center mb-4">
                <button
                    onClick={() => setActiveTab('Pending')}
                    className={`px-4 py-2 ${activeTab === 'Pending' ? 'bg-red-800' : 'bg-gray-800'} border border-gray-400 rounded-l-lg`}
                >
                    Pending
                </button>
                <button
                    onClick={() => setActiveTab('Submitted')}
                    className={`px-4 py-2 ${activeTab === 'Submitted' ? 'bg-green-800' : 'bg-gray-800'} border border-gray-400 rounded-r-lg`}
                >
                    Submitted
                </button>
            </div>

            {/* Assignment list */}
            <div>
                {assignments
                    .filter((assignment) => assignment.status === activeTab)
                    .map((assignment) => (
                        <div
                            key={assignment.id}
                            className="flex items-center justify-between p-4 mb-2 border border-gray-400 rounded-lg"
                        >
                            <div>
                                <h3 className="font-semibold">{assignment.name}</h3>
                                <p className="text-sm">due: {assignment.dueDate}</p>
                            </div>
                            {activeTab === 'Pending' && (
                                <>
                                    <label className="flex items-center">
                                        <span className="mr-2 text-blue-500 cursor-pointer">Upload</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={() => handleFileUpload(assignment.id)}
                                        />
                                        <button
                                            onClick={() => handleFileUpload(assignment.id)}
                                            className="ml-2 px-4 py-1 border border-gray-500 rounded"
                                        >
                                            Submit
                                        </button>
                                    </label>
                                </>
                            )}
                        </div>
                    ))}
                {assignments.filter((assignment) => assignment.status === activeTab).length === 0 && (
                    <p className="text-center text-gray-500 mt-4">No {activeTab.toLowerCase()} assignments</p>
                )}
            </div>
        </div>
    );
};

export default Assignment;
