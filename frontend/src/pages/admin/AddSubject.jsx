import React, { useState } from "react";

const AddSubject = ({ teachers, courses, onSubmit }) => {
    const [subjectName, setSubjectName] = useState("");
    const [subjectID, setSubjectID] = useState(""); // New state for subject ID
    const [schedules, setSchedules] = useState([{ dayOfWeek: "", startTime: "", endTime: "" }]);
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(""); // New state for selected course

    const handleAddSchedule = () => {
        setSchedules([...schedules, { dayOfWeek: "", startTime: "", endTime: "" }]);
    };

    const handleScheduleChange = (index, field, value) => {
        const newSchedules = [...schedules];
        newSchedules[index][field] = value;
        setSchedules(newSchedules);
    };

    const handleRemoveSchedule = (index) => {
        setSchedules(schedules.filter((_, i) => i !== index));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const subjectData = {
            name: subjectName,
            subjectID, // Include subject ID
            schedules,
            teacher: selectedTeacher,
            course: selectedCourse, // Include selected course
        };
        onSubmit(subjectData);
    };

    return (
        <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Add or Edit Subject</h2>

            {/* Subject Name */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Subject Name</label>
                <input
                    type="text"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>

            {/* Subject ID */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Subject ID</label>
                <input
                    type="text"
                    value={subjectID}
                    onChange={(e) => setSubjectID(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>

            {/* Teacher Selection */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Taught By</label>
                <select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                >
                    <option value="">Select a teacher</option>
                    {/* {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.name}
                        </option>
                    ))} */}
                </select>
            </div>

            {/* Course Selection */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Course</label>
                <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                >
                    <option value="">Select a course</option>
                    {/* {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.courseName}
                        </option>
                    ))} */}
                </select>
            </div>

            {/* Schedules */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Schedules</label>
                {schedules.map((schedule, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                        <input
                            type="text"
                            value={schedule.dayOfWeek}
                            onChange={(e) => handleScheduleChange(index, "dayOfWeek", e.target.value)}
                            placeholder="Day of the Week"
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="time"
                            value={schedule.startTime}
                            onChange={(e) => handleScheduleChange(index, "startTime", e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="time"
                            value={schedule.endTime}
                            onChange={(e) => handleScheduleChange(index, "endTime", e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveSchedule(index)}
                            className="text-red-500 hover:text-red-700 col-span-3"
                        >
                            Remove Schedule
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddSchedule}
                    className="text-blue-500 hover:text-blue-700 text-sm mt-2"
                >
                    + Add Another Schedule
                </button>
            </div>

            <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
                Add Subject
            </button>
        </form>
    );
};

export default AddSubject;
