import React, { useState } from "react";

const CourseForm = ({ onSubmit }) => {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [subjects, setSubjects] = useState([{ name: "", schedules: [{ dayOfWeek: "", startTime: "", endTime: "" }] }]);
  const [studentsEnrolled, setStudentsEnrolled] = useState([]);

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: "", schedules: [{ dayOfWeek: "", startTime: "", endTime: "" }] }]);
  };

  const handleSubjectChange = (index, value) => {
    const newSubjects = [...subjects];
    newSubjects[index].name = value;
    setSubjects(newSubjects);
  };

  const handleAddSchedule = (subjectIndex) => {
    const newSubjects = [...subjects];
    newSubjects[subjectIndex].schedules.push({ dayOfWeek: "", startTime: "", endTime: "" });
    setSubjects(newSubjects);
  };

  const handleScheduleChange = (subjectIndex, scheduleIndex, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[subjectIndex].schedules[scheduleIndex][field] = value;
    setSubjects(newSubjects);
  };

  const handleRemoveSchedule = (subjectIndex, scheduleIndex) => {
    const newSubjects = [...subjects];
    newSubjects[subjectIndex].schedules = newSubjects[subjectIndex].schedules.filter((_, i) => i !== scheduleIndex);
    setSubjects(newSubjects);
  };

  const handleRemoveSubject = (index) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      courseName,
      courseCode,
      courseDescription,
      subjects: subjects.map((subject) => ({
        name: subject.name,
        schedules: subject.schedules,
      })),
      studentsEnrolled,
    };
    onSubmit(courseData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Add or Edit Course</h2>
      
      {/* Course Name */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Course Name</label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      
      {/* Course Code */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Course Code</label>
        <input
          type="text"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      
      
      
      {/* Subjects with Multiple Schedules Inline */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Subjects</label>
        {subjects.map((subject, subjectIndex) => (
          <div key={subjectIndex} className="mb-4 border-b pb-4">
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={subject.name}
                onChange={(e) => handleSubjectChange(subjectIndex, e.target.value)}
                placeholder={`Subject ${subjectIndex + 1}`}
                className="w-full p-2 border border-gray-300 rounded mr-2"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveSubject(subjectIndex)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
            
            {/* Schedules for Each Subject */}
            {subject.schedules.map((schedule, scheduleIndex) => (
              <div key={scheduleIndex} className="grid grid-cols-3 gap-2 mb-2">
                <input
                  type="text"
                  value={schedule.dayOfWeek}
                  onChange={(e) => handleScheduleChange(subjectIndex, scheduleIndex, "dayOfWeek", e.target.value)}
                  placeholder="Day of the Week"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="time"
                  value={schedule.startTime}
                  onChange={(e) => handleScheduleChange(subjectIndex, scheduleIndex, "startTime", e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="time"
                  value={schedule.endTime}
                  onChange={(e) => handleScheduleChange(subjectIndex, scheduleIndex, "endTime", e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSchedule(subjectIndex, scheduleIndex)}
                  className="text-red-500 hover:text-red-700 col-span-3 "
                >
                  Remove Schedule
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddSchedule(subjectIndex)}
              className="text-blue-500 hover:text-blue-700 text-sm mt-2"
            >
              + Add Another Schedule
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSubject}
          className="text-blue-500 hover:text-blue-700 text-sm mt-2"
        >
          + Add Another Subject
        </button>
      </div>
      
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Add Course
      </button>
    </form>
  );
};

export default CourseForm;
