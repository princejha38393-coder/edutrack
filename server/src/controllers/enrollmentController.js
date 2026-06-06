import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

export const enrollCourse = async (req, res) => {
  try {
    console.log("USER:", req.user);
    console.log("COURSE ID:", req.params.courseId);

    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    const exists = await Enrollment.findOne({
      user: req.user._id,
      course: course._id
    });

    if (exists) {
      return res.status(400).json({
        message: "Already enrolled"
      });
    }

    const enrollment = await Enrollment.create({
      user: req.user._id,
      course: course._id
    });

    res.status(201).json(enrollment);

  } catch (error) {
    console.error("ENROLL ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
};

export const myEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      user: req.user._id
    }).populate("course");

    res.json({
      enrollments
    });

  } catch (error) {
    console.error("MY ENROLLMENTS ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
};