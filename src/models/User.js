import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});


UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model("User", UserSchema);
