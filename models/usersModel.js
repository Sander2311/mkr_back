import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
    avatarUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRZhrZm_bEQIfEztj_4w2fv4JPIaAGeD6a0gOk2m1bIsIYNA0EWrXEeDbVngVRYwV_Jn4&usqp=CAU",
    },
  },
  {
    timestamps: true, //date of cteate or update
  }
);

export default mongoose.model("User", UserSchema);
