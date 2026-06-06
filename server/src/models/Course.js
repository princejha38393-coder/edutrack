import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    subtitle: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner"
    },

    duration: {
      type: String,
      default: "10h"
    },

    image: {
      type: String
    },

    price: {
      type: Number,
      default: 0
    },

    rating: {
      type: Number,
      default: 4.8
    },

    students: {
      type: Number,
      default: 0
    },

    outcomes: [String],

    isPublished: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Course", courseSchema);