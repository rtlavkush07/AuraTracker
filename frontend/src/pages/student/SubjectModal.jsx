import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SubjectModal = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get(
          `/api/student/getsubject/${subjectId}`
        );
        setSubject(response.data);
      } catch (err) {
        console.error("Failed to fetch subject data:", err);
        setError("Failed to fetch subject data");
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [subjectId]);

  const handleCompleteChapter = (chapterId) => {
    // Placeholder function to handle chapter completion
    console.log(`Completing chapter with ID: ${chapterId}`);
    // Here you can call an API to mark the chapter as completed
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4 text-blue-700">
        Subject Details
      </h1>
      {subject ? (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {subject.subjectName}
          </h2>
          <p className="text-gray-600 mb-4">Code: {subject.subjectCode}</p>

          {subject.data.map((module, moduleIndex) => (
            <div key={moduleIndex} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700">
                {module.moduleName}
              </h3>
              <ul className="mt-2 space-y-4">
                {module.chapters.map((chapter, chapterIndex) => (
                  <li
                    key={chapterIndex}
                    className="p-4 bg-gray-100 rounded-md flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {chapter.chapterName}
                      </h4>
                      <p className="text-gray-600">
                        Aura Coins: {chapter.rewards.auraCoins}
                      </p>
                      <p className="text-gray-600">
                        Rating Points: {chapter.rewards.ratingPoints}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCompleteChapter(chapter._id)}
                      className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                    >
                      Complete Chapter
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>Subject not found</p>
      )}
    </div>
  );
};

export default SubjectModal;
