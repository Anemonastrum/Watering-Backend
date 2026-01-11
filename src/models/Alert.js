import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema({
  deviceId: String,
  type: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Alert", AlertSchema);
