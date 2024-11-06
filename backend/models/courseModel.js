import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseCode: { type: String, required: true },
  courseDescription: { type: String, required: true },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  courseSchedule: [
    {
      dayOfWeek: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
