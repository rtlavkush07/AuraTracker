import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);
  const [error, setError] = useState("");
  

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      try {
        const response = await axios.get("/api/user/teacher/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token for auth if required
          },
        });
        setTeacher(response.data);
      } catch (err) {
        setError("Error fetching teacher profile. Please try again later.");
        console.error(err);
      }
    };

    fetchTeacherProfile();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!teacher) {
    return <p>Loading teacher profile...</p>;
  }

  return (
    <div className="teacher-profile p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Teacher Profile
      </h2>
      <div className="mb-4">
        <strong>Name:</strong> <span>{teacher.name}</span>
      </div>
      <div className="mb-4">
        <strong>Name:</strong> <span>{teacher._id}</span>
      </div>
      <div className="mb-4">
        <strong>Email:</strong> <span>{teacher.email}</span>
      </div>
      <div>
        <strong>Subjects:</strong>
        {teacher.subjects.length > 0 ? (
          <ul className="list-disc ml-6 mt-2">
            {teacher.subjects.map((subject) => (
              <li key={subject._id}>{subject.name}</li>
            ))}
          </ul>
        ) : (
          <p>No subjects assigned.</p>
        )}
      </div>
    </div>
  );
};

export default TeacherProfile;
