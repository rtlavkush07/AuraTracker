import Teacher from "../models/teacherModel.js";
import bcrypt from "bcrypt";

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

// Controller to get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    // Fetch all teachers and populate subjects if necessary
    const teachers = await Teacher.find().populate("subjects");

    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teachers" });
  }
};
