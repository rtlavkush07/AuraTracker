import express from "express";
const router = express.Router();
import { addTeacher } from "../controllers/adminDashboardController.js";

router.post("/addteacher", addTeacher);
// router.post("/addcourse", login);
// router.post("/addsubject", login);

export default router;
