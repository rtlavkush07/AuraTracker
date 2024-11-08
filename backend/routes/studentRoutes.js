import express from "express";
import {
  
  getAllStudents,
  getLeaderboard,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/getAllStudents", getAllStudents);
router.get("/getLeaderboard", getLeaderboard);

export default router;
