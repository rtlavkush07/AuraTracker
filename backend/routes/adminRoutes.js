import express from "express";
const router = express.Router();
import {
  addTeacher,
  addCourse,
} from "../controllers/adminDashboardController.js";

router.post("/addTeacher", addTeacher);
router.post("/addCourse", addCourse);
// router.get("/admin/getAllTeacher");
// router.post("/addsubject", login);

export default router;
