import mongoose from "mongoose";
export default mongoose.model("Alert", new mongoose.Schema({
  type: String,
  message: String,
  level: String,
  createdAt: { type: Date, default: Date.now }
}));
