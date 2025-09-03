import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSubject = () => {
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [subjectID, setSubjectID] = useState("");
  const [schedules, setSchedules] = useState([{ dayOfWeek: "", startTime: "", endTime: "" }]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const navigate = useNavigate();

  // Fetch teachers
  const fetchTeachers = async () => {
    try {
      const response = await axios.get("/api/admin/getAllTeacher");
      setTeachers(response.data);
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    }
  };

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get("/api/admin/getAllCourse");
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchTeachers(), fetchCourses()]);
    };
    fetchData();
  }, []);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const subjectData = {
      subjectName,
      subjectID,
      schedules,
      selectedTeacher,
      selectedCourse,
    };
    try {
      await axios.post("/api/admin/addSubject", subjectData);
      navigate("/admin");
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 px-4">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl transform transition-transform duration-300 hover:scale-105 border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
          Add New Subject
        </h2>

        <div className="space-y-5 max-h-[500px] overflow-y-auto pr-2">
          {/* Subject Name */}
          <div>
            <label className="block text-gray-700 mb-1">Subject Name*</label>
            <input
              type="text"
              placeholder="Enter subject name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              required
            />
          </div>

          {/* Subject ID */}
          <div>
            <label className="block text-gray-700 mb-1">Subject ID*</label>
            <input
              type="text"
              placeholder="Enter subject ID"
              value={subjectID}
              onChange={(e) => setSubjectID(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              required
            />
          </div>

          {/* Teacher Select */}
          <div>
            <label className="block text-gray-700 mb-1">Assign Teacher*</label>
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-black"
              required
            >
              <option value="">Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          {/* Course Select */}
          <div>
            <label className="block text-gray-700 mb-1">Assign Course*</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-black"
              required
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          {/* Schedules */}
          <div> 
            <label className="block text-gray-700 mb-2">Schedules* (Day, start time, end time)</label>
            {schedules.map((schedule, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-3 items-center mb-3"
              >
                <input
                  type="text"
                  placeholder="Day"
                  value={schedule.dayOfWeek}
                  onChange={(e) =>
                    handleScheduleChange(index, "dayOfWeek", e.target.value)
                  }
                  className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                  required
                />
                <input
                  type="time"
                  placeholder="Start Time"
                  value={schedule.startTime}
                  onChange={(e) =>
                    handleScheduleChange(index, "startTime", e.target.value)
                  }
                  className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                  required
                />
                <input
                  type="time"
                  placeholder="End Time"
                  value={schedule.endTime}
                  onChange={(e) =>
                    handleScheduleChange(index, "endTime", e.target.value)
                  }
                  className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSchedule(index)}
                  className="col-span-3 text-red-600 hover:underline text-sm mt-1"
                >
                  Remove Schedule
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSchedule}
              className="text-blue-600 hover:underline text-sm mt-2"
            >
              + Add Another Schedule
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >
            Add Subject
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSubject;
