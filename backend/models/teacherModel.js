import mongoose from "mongoose";
const teacheSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  subjects: [
    { type: mongoose.Schema.Types.ObjectId, ref: "subject", required: true },
  ],
});
const Teacher = mongoose.model("Teacher", teacheSchema);
export default Teacher;
