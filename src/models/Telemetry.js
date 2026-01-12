import mongoose from "mongoose";
export default mongoose.model("Telemetry", new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  soilMoisture: Number,
  waterLevel: Number,
  createdAt: { type: Date, default: Date.now }
}));
