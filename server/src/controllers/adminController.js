import User from "../models/User.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

export const getOverview = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const courses = await Course.countDocuments();

    const enrollments = await Enrollment.find();

    const revenue = enrollments.length * 99;

    const courseList = await Course.find();

    res.json({
      metrics: {
        users,
        courses,
        revenue
      },
      courses: courseList
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};