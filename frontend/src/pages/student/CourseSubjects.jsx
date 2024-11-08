import React, { useState } from 'react';

const CourseSubjects = () => {
    const student = {
        courses: [
            { name: 'Operating System', progress: 80 },
            { name: 'Analysis Of Algorithm', progress: 70 },
            { name: 'Data Management System', progress: 85 },
            { name: 'Object Based Modeling', progress: 65 },
            { name: 'Soft Computing', progress: 60 },
        ],
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleCardClick = (course) => {
        setSelectedCourse(course);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCourse(null);
    };

    return (
        <>
            {/* Student's course progress section */}
            <div className="flex flex-col gap-5 w-3/4">
                <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2 text-white">Progress</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {student.courses.map((course, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md p-5 cursor-pointer"
                            onClick={() => handleCardClick(course)}
                        >
                            <h3 className="text-lg font-semibold text-gray-600">{course.name}</h3>
                            <p className="text-gray-500 text-sm">Completed: {course.progress}%</p>
                            <div className="w-full h-2 bg-gray-200 rounded mt-2">
                                <div className="h-full bg-blue-500 rounded" style={{ width: `${course.progress}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal for selected course details */}
                {modalOpen && selectedCourse && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-5 rounded-lg w-96">
                            <h2 className="m-0 text-xl">{selectedCourse.name}</h2>
                            <p className="my-2">Completed: {selectedCourse.progress}%</p>
                            <div className="flex justify-end">
                                <button onClick={handleCloseModal} className="p-2 bg-red-500 text-white rounded">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CourseSubjects;
