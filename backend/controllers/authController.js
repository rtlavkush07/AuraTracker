// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModels.js"; // Adjust the path if necessary

// Signup Controller
export const signup = async (req, res) => {
  const { email, name, password, year, regNo, course, profilePicture } =
    req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      email,
      name,
      profilePicture,
      password: hashedPassword,
      year,
      regNo,
      course,
    });

    // Save to database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// login controller
export const login = async (req, res) => {
  console.log("Coming to login controller");
  const { email, password } = req.body; // Extract email and password from request body

  try {
    // Check if user exists
    const user = await User.findOne({ email }); // Search for user in the database
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User found:", user);

    // Log the hashed password
    console.log("Stored hashed password:", user.password);
    console.log("Input password:", password); // Log input password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Trim input password
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    console.log("Password matches:", isMatch); // Should return true if they match

    // Log if the password matches
    console.log("Password matches");

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Set token expiration
    });

    // Send back success response with token
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Something went wrong" }); // Handle any unexpected errors
  }
};
