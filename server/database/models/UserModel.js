
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    otp: {
      type: Number,
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.models.UserModel || mongoose.model("UserModel", UserSchema);

export default UserModel;
