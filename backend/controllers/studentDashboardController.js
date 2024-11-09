import Course from "../models/courseModel.js";
import User from "../models/userModels.js"; // Path to your user model
import Subject from "../models/subjectModel.js"
import mongoose from "mongoose";

export const getCourse = async (req, res) => {
  // console.log("comign toi stduebt dahsaboah xxontowr");
  const courseid = req.params.courseid;
  console.log("coourseID =" + courseid); // Extract courseId from request body

  try {
    const course = await Course.findById(courseid);

    if (!course) {
      // console.log("course not founs iun controler");
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch course" });
  }
};

//get single subject by id 
export const getOneSubject = async (req, res) => {
  console.log("comign toi stduent dahsaboah xxontowr");
  const subjectId = req.params.subjectId;
  console.log("subjectID =" + subjectId); // Extract courseId from request body

  try {
    const subject = await Subject.findById(subjectId);

    if (!subject) {
      console.log("subject not found controler");
      return res.status(404).json({ error: "Course not found" });
    }
    console.log(subject)
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch course" });
  }
};



export const getCourseSubjects = async (req, res) => {
  console.log("Coming to course subjects controller");

  const { userId, courseId } = req.params; // Extract userId and courseId from the URL params
  console.log("User ID in controller =", userId);
  console.log("Course ID in controller =", courseId);

  try {
    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(courseId)
    ) {
      console.log("Invalid user ID or course ID");
      return res.status(400).json({ error: "Invalid user or course ID" });
    }

    // Fetch the user by ID
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found in course subjects controller");
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the course details along with subjects
    const course = await Course.findById(courseId).populate("subjects");
    if (!course) {
      console.log("Course not found in course subjects controller");
      return res.status(404).json({ error: "Course not found" });
    }

    console.log("Course subjects:", course.subjects);

    // Calculate progress for each subject
    const subjectsWithProgress = await Promise.all(
      course.subjects.map(async (subject) => {
        // Ensure modules is an array before calling .reduce()
        const modules = Array.isArray(subject.modules) ? subject.modules : [];

        // Count the total chapters in the subject
        const totalChapters = modules.reduce(
          (acc, module) => acc + (module.chapters ? module.chapters.length : 0),
          0
        );

        // Count the chapters completed by the user in this subject
        const completedChapters = user.completedChapters.filter(
          (completed) => String(completed.subjectId) === String(subject._id)
        ).length;

        const progress = totalChapters
          ? Math.round((completedChapters / totalChapters) * 100)
          : 0;

        return {
          _id: subject._id,
          name: subject.subjectName, // Adjust field name based on schema
          progress,
          topics: modules.flatMap((module) =>
            module.chapters ? module.chapters.map((ch) => ch.name) : []
          ), // List of chapter names
        };
      })
    );

    res.status(200).json(subjectsWithProgress);
  } catch (error) {
    console.error("Error fetching course subjects:", error);
    res.status(500).json({ error: "Failed to fetch course subjects" });
  }
};
