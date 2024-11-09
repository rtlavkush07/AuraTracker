import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Modal component to display the assignment content
const Modal = ({ isOpen, onClose, content }) => {
    if (!isOpen) return null;
    console.log("content = " + content);
    return (
        <>

            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-lg w-full text-black">
                    <h3 className="text-xl font-semibold mb-4">Assignment Content</h3>
                    <p className="text-sm mb-4">{content}</p>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-600 text-white rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    );
};

const Assignment = () => {
    const navigate = useNavigate();
    const { token, isAuthenticated } = useSelector((state) => state.auth);
    const [subjects, setSubjects] = useState([]); // Initialize as empty array
    const [activeTab, setActiveTab] = useState('Pending');
    const [openAssignmentId, setOpenAssignmentId] = useState(null); // Track which assignment content is open
    const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
    const [modalContent, setModalContent] = useState(''); // Store the content to be shown in the modal
    const [userId, setUserId] = useState(null);
    const [courseId, setCourseId] = useState(null);
    const [userData, setUserData] = useState(null);

    // Fetch user profile data
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/auth/login");
            return;
        }

        const fetchProfileData = async () => {
            try {
                const response = await axios.get("/api/user/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(response.data);
                setUserId(response.data._id);  // Set userId from fetched user data
                setCourseId(response.data.course);  // Set courseId from user data
            } catch (err) {
                console.error("Error fetching profile data:", err);
            }
        };

        fetchProfileData();
    }, [isAuthenticated, navigate, token]);

    // Fetch assignments based on userId and courseId
    useEffect(() => {
        if (userId && courseId) {
            const fetchSubjects = async () => {
                try {
                    const response = await axios.get(`/api/student/getSubjectPendingAssessment/${userId}/${courseId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setSubjects(response.data || []); // Ensure subjects is always an array
                    console.log("Fetched subjects: ", response.data);
                } catch (err) {
                    console.error("Error fetching subjects:", err);
                }
            };

            fetchSubjects();
        }
    }, [userId, courseId, token, isAuthenticated]);

    // Handle file upload and update assignment status
    const handleFileUpload = (subjectIndex, assignmentId) => {
        const updatedSubjects = subjects.map((subject, index) =>
            index === subjectIndex
                ? {
                    ...subject,
                    assignments: subject.assignments ? subject.assignments.map((assignment) =>
                        assignment.assessmentID === assignmentId ? {
                            ...assignment,
                            status: 'Submitted',
                            submittedBy: [...assignment.submittedBy, userId],
                        } : assignment
                    ) : [],
                }
                : subject
        );
        setSubjects(updatedSubjects);
        alert('File uploaded and assignment submitted!');
    };

    // Check if there are any assignments for the selected tab across all subjects
    const hasAssignments = subjects.some(subject => {
        return subject.assessments && subject.assessments.some(assignment => {
            // Check if the assignment is in the active tab's status
            const isPending = activeTab === 'Pending' && !assignment.submittedBy.includes(userId);
            const isSubmitted = activeTab === 'Submitted' && assignment.submittedBy.includes(userId);

            console.log("isPending: " + isPending);
            console.log("isSubmitted: " + isSubmitted);

            return isPending || isSubmitted;
        });
    });

    console.log("hasAssignments: " + hasAssignments);

    // Open modal with assignment content
    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent('');
    };

    return (
        <div className="p-6 bg-black text-white border border-gray-400 rounded-lg max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Assignments by Subject</h2>

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

            {/* Render assignments for each subject */}
            {hasAssignments ? (
                subjects.map((subject, subjectIndex) => (
                    <div key={subject.subjectName} className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">{subject.subjectName}</h3>

                        {subject.assessments && subject.assessments
                            .filter((assignment) => {
                                const isPending = activeTab === 'Pending' && !assignment.submittedBy.includes(userId);
                                const isSubmitted = activeTab === 'Submitted' && assignment.submittedBy.includes(userId);
                                return isPending || isSubmitted;
                            })
                            .map((assignment) => (
                                <div
                                    key={assignment.assessmentID}
                                    className="flex items-center justify-between p-4 mb-2 border border-gray-400 rounded-lg"
                                >
                                    <div>
                                        <h4 className="font-semibold">{assignment.assessmentName}</h4>
                                        <p className="text-sm">Due: {assignment.assessmentDate}</p>
                                    </div>
                                    {activeTab === 'Pending' && (
                                        <div className="flex items-center">
                                            <label className="flex items-center">
                                                <span className="mr-2 text-blue-500 cursor-pointer">Upload</span>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    onChange={() => handleFileUpload(subjectIndex, assignment.assessmentID)}
                                                />
                                            </label>
                                            <button
                                                onClick={() => handleFileUpload(subjectIndex, assignment.assessmentID)}
                                                className="ml-2 px-4 py-1 border border-gray-500 rounded"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => openModal(assignment.assessmentContent)}
                                        className="ml-4 text-blue-500 hover:underline"
                                    >
                                        View Assignment Content
                                    </button>
                                </div>
                            ))}
                        {(!subject.assignments || subject.assignments.filter(assignment => {
                            const isPending = activeTab === 'Pending' && !assignment.submittedBy.includes(userId);
                            const isSubmitted = activeTab === 'Submitted' && assignment.submittedBy.includes(userId);
                            return isPending || isSubmitted;
                        }).length === 0) && (
                                <p className="text-center text-gray-500 mt-2">
                                    No {activeTab.toLowerCase()} assignments for {subject.subjectName}
                                </p>
                            )}
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500 mt-4">No assignments</p>
            )}

            {/* Modal for displaying assignment content */}
            <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
        </div>
    );
};

export default Assignment;
