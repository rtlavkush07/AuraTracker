import express from "express";
import {
  getAllStudents,
  getLeaderboard,
} from "../controllers/studentController.js";
import {
  getCourse,
  getCourseSubjects,
} from "../controllers/studentDashboardController.js";

const router = express.Router();

router.get("/getAllStudents", getAllStudents);
router.get("/getLeaderboard", getLeaderboard);
router.get("/course/:courseid", getCourse);
router.get("/getCourseSubjects/:userId/:courseId", getCourseSubjects);

export default router;
