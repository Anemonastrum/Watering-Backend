import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema({
  type: String,
  message: String,
  level: { type: String, enum: ["info", "warning", "critical"] },

  status: {
    type: String,
    enum: ["active", "resolved"],
    default: "active"
  },

  createdAt: { type: Date, default: Date.now },
  resolvedAt: Date
});

export default mongoose.model("Alert", AlertSchema);
