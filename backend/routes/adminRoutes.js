import express from "express";
const router = express.Router();
import {
  addTeacher,
  addCourse,
  getAllTeacher,
  getAllCourse,
  addSubject,
  deleteTeacher,
  editTeacher,
  editCourse,
  deleteCourse,
  deleteStudent,
  editStudent,
} from "../controllers/adminDashboardController.js";

router.post("/addTeacher", addTeacher);
router.post("/addCourse", addCourse);
router.get("/getAllTeacher", getAllTeacher);
router.get("/getAllCourse", getAllCourse);
router.post("/addSubject", addSubject);
router.delete("/deleteTeacher/:id", deleteTeacher);
router.put("/editTeacher/:id", editTeacher);
router.put("/editCourse/:id", editCourse);
router.delete("/deleteCourse/:id", deleteCourse);
router.delete("/deleteStudent/:id", deleteStudent);
router.put("/editStudent/:id", editStudent);
export default router;
