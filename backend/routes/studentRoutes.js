import express from "express";
import {
  getAllStudents,
  getLeaderboard,
} from "../controllers/studentController.js";
import {
  getCourse,
  getCourseSubjects,
  getOneSubject,
} from "../controllers/studentDashboardController.js";

const router = express.Router();

router.get("/getAllStudents", getAllStudents);
router.get("/getLeaderboard", getLeaderboard);
router.get("/course/:courseid", getCourse);
router.get("/getCourseSubjects/:userId/:courseId", getCourseSubjects);
router.get("/getsubject/:subjectId", getOneSubject);
export default router;
