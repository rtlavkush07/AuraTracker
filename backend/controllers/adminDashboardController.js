import Teacher from "../models/teacherModel.js";
import bcrypt from "bcrypt";
import Course from "../models/courseModel.js";
import Subject from "../models/subjectModel.js";

// Controller to add a new teacher
export const addTeacher = async (req, res) => {
  try {
    console.log("coming to adminDashbosr conteolerance`");
    const { name, email, password } = req.body;

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new teacher document
    const newTeacher = new Teacher({
      name,
      email,
      password: hashedPassword,
    });

    // Save the teacher to the database
    await newTeacher.save();

    res
      .status(201)
      .json({ message: "Teacher added successfully", teacher: newTeacher });
  } catch (error) {
    res.status(500).json({ error: "Failed to add teacher" });
  }
};
export const addCourse = async (req, res) => {
  try {
    console.log("coming to addCourse controller");
    const { courseName, courseCode } = req.body;
    const newCourse = new Course({ courseName, courseCode });
    await newCourse.save();

    res
      .status(201)
      .json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ error: "Failed to add Course" });
  }
};

// Controller to get all teachers
export const getAllTeacher = async (req, res) => {
  try {
    // Fetch all teachers and populate subjects if necessary
    const teachers = await Teacher.find();

    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teachers" });
  }
};
export const getAllCourse = async (req, res) => {
  try {
    // Fetch all Courses and populate subjects if necessary
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Courses" });
  }
};
