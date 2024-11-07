import express from "express";
const router = express.Router();
import {
  getSubjects,
  addModule,
} from "../controllers/teacherDashboardController.js";
router.get("/getSubjects/:teacherId", getSubjects);
// Route to add modules and chapters to a subject
router.put("/:subjectId/modules", addModule); // Assuming you want to protect this route

export default router;
