import React, { useState } from "react";
import axios from "axios";

const AddCourse = () => {
    const [courseData, setCourseData] = useState({
        courseName: "",
        courseCode: "",
        courseDescription: "",
        subjects: [""], // array of ObjectIds
        courseSchedule: [{ dayOfWeek: "", startTime: "", endTime: "" }],
        studentsEnrolled: [""], // array of ObjectIds
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleArrayChange = (e, index, field, arrayName) => {
        const updatedArray = [...courseData[arrayName]];
        updatedArray[index][field] = e.target.value;
        setCourseData((prevData) => ({ ...prevData, [arrayName]: updatedArray }));
    };

    const addArrayItem = (arrayName, newItem) => {
        setCourseData((prevData) => ({
            ...prevData,
            [arrayName]: [...prevData[arrayName], newItem],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/courses", courseData);
            console.log("Course created:", response.data);
        } catch (error) {
            console.error("Error creating course:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Course Name:</label>
                <input
                    type="text"
                    name="courseName"
                    value={courseData.courseName}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Course Code:</label>
                <input
                    type="text"
                    name="courseCode"
                    value={courseData.courseCode}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Course Description:</label>
                <textarea
                    name="courseDescription"
                    value={courseData.courseDescription}
                    onChange={handleInputChange}
                    required
                ></textarea>
            </div>

            <div>
                <label>Subjects (IDs):</label>
                {courseData.subjects.map((subject, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => handleArrayChange(e, index, "", "subjects")}
                            required
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addArrayItem("subjects", "")}
                >
                    Add Subject
                </button>
            </div>

            <div>
                <label>Course Schedule:</label>
                {courseData.courseSchedule.map((schedule, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Day of Week"
                            value={schedule.dayOfWeek}
                            onChange={(e) => handleArrayChange(e, index, "dayOfWeek", "courseSchedule")}
                            required
                        />
                        <input
                            type="time"
                            placeholder="Start Time"
                            value={schedule.startTime}
                            onChange={(e) => handleArrayChange(e, index, "startTime", "courseSchedule")}
                            required
                        />
                        <input
                            type="time"
                            placeholder="End Time"
                            value={schedule.endTime}
                            onChange={(e) => handleArrayChange(e, index, "endTime", "courseSchedule")}
                            required
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addArrayItem("courseSchedule", { dayOfWeek: "", startTime: "", endTime: "" })}
                >
                    Add Schedule
                </button>
            </div>

            <div>
                <label>Students Enrolled (IDs):</label>
                {courseData.studentsEnrolled.map((student, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={student}
                            onChange={(e) => handleArrayChange(e, index, "", "studentsEnrolled")}
                            required
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addArrayItem("studentsEnrolled", "")}
                >
                    Add Student
                </button>
            </div>

            <button type="submit">Create Course</button>
        </form>
    );
};

export default AddCourse;
