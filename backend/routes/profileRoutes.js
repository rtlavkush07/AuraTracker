// routes/profileRoutes.js
import express from "express";
import authMiddleware from "../src/middleware/authMiddleware.js";
import userAuth from "../models/userModels.js";

const router = express.Router();

// @route   GET /api/user/profile
// @desc    Get logged-in user profile
// @access  Private
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // Fetch the user details from the database
    const user = await userAuth.findById(req.user.id).select("-password"); // Exclude the password field
    console.log("User details fetched successfully");
      console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Return the user data
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
