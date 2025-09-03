import Teacher from "../models/teacherModel.js";
import bcrypt from "bcrypt";
import Course from "../models/courseModel.js";
import Subject from "../models/subjectModel.js";
import Student from "../models/userModels.js"; 

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

export const addSubject = async (req, res) => {
  try {
    console.log("coming to addSubject controller");
    const {
      subjectName,
      subjectID,
      schedules,
      selectedTeacher,
      selectedCourse,
    } = req.body;

    console.log("subjectName=" + subjectName);
    // Step 1: Find the selected course by ID
    const course = await Course.findById(selectedCourse);
    console.log("selected course = " + selectedCourse);
    console.log("selected teacher = " + selectedTeacher);
    if (!course) {
      console.log("course not found");
      return res.status(404).json({ error: "Course not found" });
    }
    console.log("course found");

    // Step 2: Find the selected teacher by ID
    const teacher = await Teacher.findById(selectedTeacher);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    console.log("teacher found");

    // Step 3: Create a new Subject
    const newSubject = new Subject({
      subjectName,
      subjectCode: subjectID,
      teacher: teacher._id,
    });
    await newSubject.save();

    // Step 4: Add the new subject to the course's subjects array
    course.subjects.push(newSubject._id);
    console.log("subject added");

    // Step 5: Add schedules for the subject in the course's courseSchedule
    // Make sure the subjectName is passed correctly here
    if (!subjectName) {
      console.log("subjectName is missing in the schedules");
      return res.status(400).json({ error: "subjectName is required" });
    }

    course.courseSchedule.push({
      subjectName, // Ensuring subjectName is passed here correctly
      schedules,
    });

    // Step 6: Link the subject to the selected teacher's subjects array
    teacher.subjects.push(newSubject._id);

    // Save the updated course and teacher
    await course.save();
    await teacher.save();

    // Step 7: Respond with success
    res.status(201).json({ message: "Subject added successfully", newSubject });
  } catch (error) {
    console.error("Error adding subject:", error);
    res.status(500).json({ error: "Failed to add subject" });
  }
};

// Controller to delete a teacher by ID
export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;  // Get teacher ID from request parameters
    const deletedTeacher = await Teacher.findByIdAndDelete(id); // Find and delete the teacher by ID

    if (!deletedTeacher) {
      return res.status(404).json({ error: "Teacher not found" }); 
    }

    return res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete teacher" });
  }
};

// Controller to edit a teacher by ID
export const editTeacher = async (req, res) => {
  try {
    const { id } = req.params; // Get teacher ID from request parameters
    const { name, email, password } = req.body; // Get updated data from request body   
    const updatedData = { name, email };

    // If password is provided, hash it before updating
    if (password) {
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updatedData.password = hashedPassword;
    }   
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, updatedData, { new: true }); // Find and update the teacher by ID
    if (!updatedTeacher) {  // if false ho then
      return res.status(404).json({ error: "Teacher not found" });
    }   
    return res.status(200).json({ message: "Teacher updated successfully", teacher: updatedTeacher });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update teacher" });
  }   
};


// delete course by ID
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params; // Get course ID from request parameters
    const deletedCourse = await Course.findByIdAndDelete(id); // Find and delete the course by ID   
    
    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete course" });
  }   
};

// edit course by ID

export const editCourse = async (req, res) => {
  try { 
    const { id } = req.params; // Get course ID from request parameters
    const { courseName, courseCode } = req.body;
    const updatedData = { courseName, courseCode };
    const updatedCourse = await Course.findByIdAndUpdate(id, updatedData, { new: true }); // Find and update the course by ID 
    if (!updatedCourse) {  // if false ho then
      return res.status(404).json({ error: "Course not found" });
    } 
    return res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update course" });
  }
};


// delete student by ID
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params; // Get student ID from request parameters
    const deletedStudent = await Student.findByIdAndDelete(id); // Find and delete the student by ID   
    return res.status(200).json({ message: "Student deleted successfully" });

  }
  catch (error) {   
    return res.status(500).json({ error: "Failed to delete student" }); 
  } 

};

// edit student name and email by ID

export const editStudent = async (req, res) => {    
  try { 
    const { id } = req.params;  
    const { name, email } = req.body;
    const updatedData = { name, email };
    const updatedStudent = await Student.findByIdAndUpdate(id , updatedData, { new: true }); // Find and update the student by ID 
    if (!updatedStudent) {   // if edit hua 
      return res.status(404).json({ error: "Student not found" });
    }         
    return res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update student" });
  }   
};