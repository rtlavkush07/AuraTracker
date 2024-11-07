import express from "express";
const router = express.Router();
import {
  addTeacher,
  addCourse,
  getAllTeacher,
  getAllCourse,
} from "../controllers/adminDashboardController.js";

router.post("/addTeacher", addTeacher);
router.post("/addCourse", addCourse);
router.get("/getAllTeacher", getAllTeacher);
router.get("/getAllCourse", getAllCourse);

// router.post("/addsubject", login);

export default router;
