import mongoose, { Schema } from "mongoose";

const CriteriaSchema = new mongoose.Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    maxMark: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Criteria", CriteriaSchema);
