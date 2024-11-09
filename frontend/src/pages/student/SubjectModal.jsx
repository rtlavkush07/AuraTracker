import React from "react";
import { useParams } from "react-router-dom";

const SubjectModal = () => {
  const { subjectId } = useParams(); // Get the subjectId from the route

  return (
    <div>
      <h1>Subject Modal</h1>
      <p>Subject ID: {subjectId}</p>
      {/* Additional content based on subjectId */}
    </div>
  );
};

export default SubjectModal;
