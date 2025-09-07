import React, { useState, useEffect } from "react";
import axios from "axios";

const AddSubjectData = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [chapters, setChapters] = useState([]);
  const [chapterNameInput, setChapterNameInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [teacherId, setTeacherId] = useState("");

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
        console.error("Error fetching teacher profile:", err);
      }
    };
    fetchTeacherProfile();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        if (teacherId) {
          const response = await axios.get(
            `/api/teacher/getSubjects/${teacherId}`
          );
          setSubjects(response.data);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, [teacherId]);

  const handleAddChapter = () => {
    if (chapterNameInput.trim()) {
      setChapters([
        ...chapters,
        { chapterName: chapterNameInput, completed: false },
      ]);
      setChapterNameInput("");
    }
  };

  const handleDeleteChapter = (index) => {
    const newChapters = chapters.filter((_, i) => i !== index);
    setChapters(newChapters);
  };

  const handleAddModule = async () => {
    if (!selectedSubject || !moduleName) {
      alert("Please select a subject and enter a module name.");
      return;
    }

    const moduleData = {
      moduleName,
      chapters,
    };

    try {
      setLoading(true);
      await axios.put(`/api/teacher/${selectedSubject}/modules`, {
        modules: [moduleData],
      });
      alert("Module and chapters added successfully");
      setModuleName("");
      setChapters([]);
    } catch (error) {
      console.error("Error adding module:", error);
      alert("Failed to add module");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 p-4 sm:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Add Modules and Chapters
        </h2>

        {/* Subject Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Select Subject
          </label>
          <select
            className="w-full text-gray-800 bg-white border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.subjectName}
              </option>
            ))}
          </select>
        </div>

        {/* Module Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Module Name
          </label>
          <input
            type="text"
            className="w-full text-gray-800 bg-white border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            placeholder="Enter module name"
          />
        </div>

        {/* Chapter Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Add Chapter Name
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 text-gray-800 bg-white border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={chapterNameInput}
              onChange={(e) => setChapterNameInput(e.target.value)}
              placeholder="Enter chapter name"
            />
            <button
              className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300"
              onClick={handleAddChapter}
              disabled={loading}
            >
              Add
            </button>
          </div>
        </div>

        {/* Chapters List */}
        {chapters.length > 0 && (
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-blue-900 border-b pb-2 mb-4">
              Chapters
            </h3>
            {/* Scrollable container */}
            <div className="max-h-48 overflow-y-auto pr-2">
              <ul className="space-y-3">
                {chapters.map((chapter, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg"
                  >
                    <span className="text-gray-700">
                      {chapter.chapterName}
                    </span>
                    <button
                      className="px-3 py-1 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300 text-sm"
                      onClick={() => handleDeleteChapter(index)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          className="w-full mt-4 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={handleAddModule}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Module with Chapters"}
        </button>
      </div>
    </div>
  );
};

export default AddSubjectData;
