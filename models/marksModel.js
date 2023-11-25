import mongoose, { Schema } from "mongoose";

const MarkSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    criteria: {
      type: Schema.Types.ObjectId,
      ref: "Criteria",
      required: true,
    },
    mark: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, //date of cteate or update
  }
);

export default mongoose.model("Mark", MarkSchema);
