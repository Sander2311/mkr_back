import mongoose, { Schema } from "mongoose";

const MaterialSchema = new mongoose.Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    clicksNumber: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Material", MaterialSchema);
