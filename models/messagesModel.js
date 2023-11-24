import mongoose, { Schema } from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userWhoSent: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    anotherUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    groupMessage: {
      type: Boolean,
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", MessageSchema);
