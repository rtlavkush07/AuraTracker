import mongoose from "mongoose"; // Use import if using ES modules

const userAcademicsSchema = new mongoose.Schema(
  {
    courses: [
      {
        name: { type: String, required: true }, // Course name
        schedules: [
          {
            day: { type: String, required: true }, // Day of the week (e.g., "Monday")
            time: { type: String, required: true }, // Time (e.g., "10:00 AM")
          },
        ],
      },
    ],
    academicGoals: [
      {
        title: { type: String, required: true },
        chapters: [
          {
            name: { type: String, required: true }, // Chapter name
            completed: { type: Boolean, default: false }, // Chapter completion status
          },
        ],
      },
    ],
    personalGoals: [
      {
        title: { type: String, required: true },
        chapters: [
          {
            name: { type: String, required: true }, // Chapter name
            completed: { type: Boolean, default: false }, // Chapter completion status
          },
        ],
      },
    ],
  },
  { _id: false, timestamps: true } // Add timestamps
);

export default userAcademicsSchema; // Change to ES module export
