import express from "express";
import { getAllStudents } from "../controllers/studentController.js";
import {
  getCourse,
  getCourseSubjects,
  getOneSubject,
  getSubjectPendingAssessment,
  completeChapter,
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
router.post(
  "/completechapter/:userId/:chapterId/:moduleId/:subjectId/:auracoin/:ratingpoint",
  completeChapter
);
export default router;
