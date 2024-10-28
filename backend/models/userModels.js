import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userProfileSchema from "./userProfileModel.js";
import userAcademicsSchema from "./userAcademicsModel.js";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  profilePicture: { type: String },
  accessToken: { type: String },
  refreshToken: { type: String },
  createdAt: { type: Date, default: Date.now },
  password: { type: String, required: true },
  year: { type: Number, required: true },
  regNo: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  userProfile: userProfileSchema, // Embed user profile schema
  userAcademics: userAcademicsSchema, // Embed user academics schema
});

// Hash password before saving user document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  console.log("Password to compare:", candidatePassword); // Log the password to be compared

  const isMatch = await bcrypt.compare(candidatePassword, this.password); // Compare passwords
  console.log("Password Match Result:", isMatch); // Log the result of the comparison

  return isMatch; // Return the result
};

const userAuth = mongoose.model("User", userSchema);
export default userAuth;
