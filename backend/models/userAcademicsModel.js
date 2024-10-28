import mongoose from "mongoose"; // Use import if using ES modules

const userAcademicsSchema = new mongoose.Schema(
  {
    courses: [{ type: String }], // Array of course names or course IDs
    academicGoals: [
      {
        // Academic goals with chapters
        title: { type: String, required: true },
        chapters: [
          {
            name: { type: String }, // Chapter name
            completed: { type: Boolean, default: false }, // Chapter completion status
          },
        ],
      },
    ],
    personalGoals: [
      {
        // Personal goals
        title: { type: String, required: true },
        chapters: [
          {
            name: { type: String }, // Chapter name
            completed: { type: Boolean, default: false }, // Chapter completion status
          },
        ],
      },
    ],
  },
  { _id: false }
);

export default userAcademicsSchema; // Change to ES module export
