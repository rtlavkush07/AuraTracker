import express from "express";
import {
  getAllStudents,
  getLeaderboard,
} from "../controllers/studentController.js";
import {
  getCourse,
  getCourseSubjects,
  getOneSubject,
  getSubjectPendingAssessment,
} from "../controllers/studentDashboardController.js";

const router = express.Router();

router.get("/getAllStudents", getAllStudents);
// router.get("/getLeaderboard", getLeaderboard);
router.get("/course/:courseid", getCourse);
router.get("/getCourseSubjects/:userId/:courseId", getCourseSubjects);
router.get("/getsubject/:subjectId", getOneSubject);
router.get(
  "/getSubjectPendingAssessment/:userId/:courseId",
  getSubjectPendingAssessment
);

export default router;
