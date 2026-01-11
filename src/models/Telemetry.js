import mongoose from "mongoose";

const TelemetrySchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  temperature: Number,
  humidity: Number,
  soil_moisture: Number,
  water_level: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Telemetry", TelemetrySchema);
