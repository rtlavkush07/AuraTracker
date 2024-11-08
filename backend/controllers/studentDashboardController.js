import Course from "../models/courseModel.js";

export const getCourse = async (req, res) => {
  console.log("comign toi stduebt dahsaboah xxontowr");
  const courseid = req.params.courseid;
  console.log("coourseID =" + courseid); // Extract courseId from request body

  try {
    const course = await Course.findById(courseid);

    if (!course) {
      console.log("course not founs iun controler");
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch course" });
  }
};
