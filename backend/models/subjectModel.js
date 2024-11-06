import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectName: String,
  subjectCode: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  data: [
    {
      data: mongoose.Schema.Types.Mixed, // Can be any type of data (e.g., text, numerical, etc.)
    },
  ],
  Assessments: [
    {
      assessmentID: String,
      assessmentName: String,
      assessmentDate: Date,
      assessmentLastDate: Date,
      assessmentContent: String,
      auraCoins: Number,
      ratingPoint: Number,

      submittedBy: [
        {
          student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
          },
          submittedContent: { type: String },
        },
      ],
    },
  ],
});

export default mongoose.model("Subject", subjectSchema);
